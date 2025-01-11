import React, { useState } from "react";

import { FaClockRotateLeft } from "react-icons/fa6";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import ConfirmationModal from "./ConfirmationModal";

export const ParkingListing = ({
  id,
  arrivalDate,
  arrivalTime,
  vehicleNumber,
  vehicleType,
}) => {
  const [modal, setModal] = useState(false);
  const handleExit = () => {
    console.log(id);
    setModal(!modal);
  };

  return (
    <div>
      <div className="!p-4 border-b border-gray-300 g-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-lg font-semibold">{vehicleNumber}</p>
          <button
            className="bg-red-500 rounded-full p-2 flex items-center justify-center"
            type="button"
            onClick={() => handleExit()}
          >
            <TbLogout className="text-white w-6 h-6 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1  gap-2 justify-between">
          <div className="flex gap-2 items-center">
            <FaClockRotateLeft />
            <p className="text-sm">{arrivalTime}</p>
          </div>
          <div className="flex gap-2 items-center">
            <MdOutlineCalendarMonth />
            <p className="text-sm"> {arrivalDate}</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-sm">Type:</p>
            <p className="text-sm">{vehicleType}</p>
          </div>
        </div>
      </div>
      <div
        className={`flex items-center justify-center bg-black/40 w-screen h-screen absolute top-0 left-0 right-0 transition-opacity duration-150 ease-in-out px-3 ${
          modal ? "z-50 opacity-100" : "-z-10 opacity-0"
        }`}
      >
        <ConfirmationModal id={id} setModal={setModal} />
      </div>
    </div>
  );
};
