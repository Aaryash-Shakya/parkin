import React, { useState } from "react";
import HomeIconOutline from "../assets/home-black-outline.svg";
import HomeIconSolid from "../assets/home-white-solid.svg";

import ParkingIconOutline from "../assets/parking-black-outline.svg";
import ParkingIconSolid from "../assets/parking-white-solid.svg";

import ReserveIconOutline from "../assets/reserve-black-outline.svg";
import ReserveIconSolid from "../assets/reserve-white-solid.svg";

import SettingIconOutline from "../assets/setting-black-outline.svg";
import SettingIconSolid from "../assets/setting-white-solid.svg";

const BottomNavbar = () => {
  const [activeButton, setActiveButton] = useState("home");

  const handleActive = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (

    <div className="px-4 absolute bottom-5 left-0 right-0 min-h-20 flex items-center justify-center">
      <div className="flex items-center justify-center h-fit w-fit rounded-full p-1">
        <div className="flex flex-col items-center justify-center rounded-full overflow-hidden w-[100px] h-20 border-r-0 p-1 -m-4">
          <button
            className={`flex items-center justify-center w-full h-full rounded-full ${
              activeButton === "home" ? "bg-primary z-40" : "bg-white z-30"
            }`}
            type="button"
            onClick={() => handleActive("home")}
          >
            <img
              src={activeButton === "home" ? HomeIconSolid : HomeIconOutline}
              alt="activity"
              className="w-6 h-6"
            />
          </button>

        </div>
        <div className="flex flex-col items-center justify-center rounded-full overflow-hidden w-[100px] h-20  p-1 -m-3">
          <button
            className={`flex items-center justify-center px-8 py-6 w-full  rounded-full  ${
              activeButton === "parking" ? "bg-primary z-40" : "bg-white z-30"
            }`}
            type="button"
            onClick={() => handleActive("parking")}
          >
            <img
              src={
                activeButton === "parking"
                  ? ParkingIconSolid
                  : ParkingIconOutline
              }
              alt="activity"
              className="w-10 h-10"
            />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center rounded-full overflow-hidden w-[100px] h-20 p-1 -m-3">
          <button
            className={`flex items-center justify-center px-8 py-6 w-full  rounded-full  ${
              activeButton === "reservation"
                ? "bg-primary z-40"
                : "bg-white z-30"
            }`}
            type="button"
            onClick={() => handleActive("reservation")}
          >
            <img
              src={
                activeButton === "reservation"
                  ? ReserveIconSolid
                  : ReserveIconOutline
              }
              alt="reservation"
              className="w-6 h-6    "
            />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center rounded-full overflow-hidden w-[100px] h-20 p-1 -m-3">
          <button
            className={`flex items-center justify-center px-8 py-6 w-full  rounded-full  ${
              activeButton === "setting" ? "bg-primary z-40" : "bg-white z-30"
            }`}
            type="button"
            onClick={() => handleActive("setting")}
          >
            <img
              src={
                activeButton === "setting"
                  ? SettingIconSolid
                  : SettingIconOutline
              }
              alt="setting"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;
