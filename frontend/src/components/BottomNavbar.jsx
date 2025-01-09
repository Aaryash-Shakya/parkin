import React from "react";
import { IoHomeOutline } from "react-icons/io5";

const BottomNavbar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white h-[80px]">
      <div className="grid grid-cols-5 place-items-center h-full w-full">
        <div className="flex flex-col items-center justify-center gap-1">
          <IoHomeOutline size={25} />
          <p>Home</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <IoHomeOutline size={25} />
          <p>Home</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <IoHomeOutline size={25} />
          <p>Home</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <IoHomeOutline size={25} />
          <p>Home</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <IoHomeOutline size={25} />
          <p>Home</p>
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;
