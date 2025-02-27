from fastapi import FastAPI, File, UploadFile 
from pydantic import BaseModel
from fastapi.responses import JSONResponse
import os
from pathlib import Path
import time
from fastapi.staticfiles import StaticFiles

from matplotlib import pyplot as plt
import numpy as np
import imutils
import easyocr
import cv2

# Initialize the FastAPI application
app = FastAPI()

# start cmd: uvicorn main:app --reload

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

UPLOAD_DIR = Path("./public")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

PUBLIC_DIR = "public"
app.mount("/public", StaticFiles(directory=PUBLIC_DIR), name="public")

@app.post("/detect-np/")
async def upload_file(file: UploadFile = File(...)):
    try:
        timestamp = int(time.time())
        file_path = UPLOAD_DIR / f"{timestamp}_{file.filename}"
        with open(file_path, "wb") as f:
            f.write(await file.read())
            
        # return JSONResponse(content={"url": f"http://localhost:8000/{file_path}"}, status_code=200)
            
        # do processing
        img = cv2.imread(file_path)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        bfilter = cv2.bilateralFilter(gray, 11, 17, 17) #Noise reduction
        edged = cv2.Canny(bfilter, 30, 200) #Edge detection
        keypoints = cv2.findContours(edged.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        contours = imutils.grab_contours(keypoints)
        contours = sorted(contours, key=cv2.contourArea, reverse=True)[:10]

        location = None
        for contour in contours:
            approx = cv2.approxPolyDP(contour, 10, True)
            if len(approx) == 4:
                location = approx
                break

        mask = np.zeros(gray.shape, np.uint8)
        new_image = cv2.drawContours(mask, [location], 0,255, -1)
        new_image = cv2.bitwise_and(img, img, mask=mask)
        (x,y) = np.where(mask==255)
        (x1, y1) = (np.min(x), np.min(y))
        (x2, y2) = (np.max(x), np.max(y))
        cropped_image = gray[x1:x2+1, y1:y2+1]
        reader = easyocr.Reader(['en'])
        result = reader.readtext(cropped_image)
        text = ''
        for i in result:
            text += i[-2] + " "
        font = cv2.FONT_HERSHEY_SIMPLEX
        res = cv2.putText(img, text=text, org=(approx[0][0][0], approx[1][0][1]+60), fontFace=font, fontScale=1, color=(0,255,0), thickness=2, lineType=cv2.LINE_AA)
        res = cv2.rectangle(img, tuple(approx[0][0]), tuple(approx[2][0]), (0,255,0),3)  
        
        # processed_file_path = UPLOAD_DIR / f"{timestamp}_{file.filename.split('.')[0]}_processed.jpg"
        processed_file_path = UPLOAD_DIR / file.filename
        cv2.imwrite(str(processed_file_path), res)
            
        return JSONResponse(content={"message": f"File '{file.filename}' uploaded successfully", "url": f"http://localhost:8000/{processed_file_path}"}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"message": f"Error uploading file: {e}"}, status_code=400)
