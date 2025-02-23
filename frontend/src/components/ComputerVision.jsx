import { useState } from 'react';
import Button from './form/Button';

export const ComputerVision = () => {
    const [file, setFile] = useState(null);  // To store the selected file
    // const [imageUrl, setImageUrl] = useState("");  // To store the URL of the processed image
    // const [loading, setLoading] = useState(false);  // To show a loading indicator
    const [show, setShow] = useState(false);  // To show a loading indicator

    // Handle file selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setTimeout(() => {
            setShow(true);
        }, 4000)
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert("Please select a file first.");
            return;
        }

        // Set loading state to true
        // setLoading(true);

        // Create a new FormData object to send the file in the request body
        const formData = new FormData();
        formData.append("file", file);

        try {
            // Send the file to the API using a POST request
            const response = await fetch('http://127.0.0.1:8000/detect-np/', {
                method: 'POST',
                body: formData,
            });

            // Handle API response
            if (response.ok) {
                // const data = await response.json();
                // setImageUrl(data.url);  // Assuming the API returns { url: "<image_url>" }
            } else {
                // alert("Error uploading file.");
            }
        } catch (error) {
            console.error("Error:", error);
            // alert("There was an error uploading the file.");
        } finally {
            setTimeout(() => {
                setShow(true);
            }, 4000)
            // setLoading(false);  // Set loading state to false
        }
    };

    return (
        <div>
            <form className='p-4'>
                <div className='w-full items-center justify-center'>
                    <input type="file" accept='.jpg,.jpeg,.png' onChange={handleFileChange} />
                </div>
                {file && (
                    <div className='w-full items-center justify-center mt-4'>
                        <img src={URL.createObjectURL(file)} alt="Selected File" className='max-w-full h-auto' />
                    </div>
                )}
                <Button
                    title="Analyze Image"
                    onClick={handleSubmit}
                    type="button"
                    styles="bg-primary text-white hover:bg-blue-700 transition-all duration-0 hover:duration-150 ease-in-out"
                />
            </form>

            {/* {loading && <p>Loading...</p>}  Show loading text when uploading */}

            {show && (
                <div>
                    <h3>Processed Image</h3>
                    <img src={`http://localhost:8000/public/${file.name}`} alt="Processed Result" />
                </div>
            )}
        </div>
    );
};
