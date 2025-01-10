import React, { useState } from "react";

import navigations from "../constants/navigations";
import { useLocation, useNavigate } from "react-router-dom";

const BottomNavbar = () => {
  const [activeButton, setActiveButton] = useState("Home");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleActive = (link) => {
    navigate(link);
  };

  return (
    <div className="px-4 fixed bottom-5 left-0 right-0 min-h-20 flex items-center justify-center z-40">
      <div className="flex items-center justify-center h-fit w-fit rounded-full p-1">
        {navigations.map((nav) => (
          <div
            key={nav.name}
            className={`flex flex-col items-center justify-center rounded-full overflow-hidden w-[100px] h-20 border-r-0 p-1 shadow-sm ${
              nav.index !== 1 ? "-m-3" : "m-0"
            }`}
          >
            <button
              className={`flex items-center justify-center w-full h-full rounded-[32px] ${
                pathname === nav.link ? "bg-primary z-40" : "bg-white z-30"
              }`}
              type="button"
              onClick={() => handleActive(nav.link)}
            >
              <img
                src={pathname === nav.link ? nav.iconActive : nav.icon}
                alt={nav.name}
                className="w-6 h-6"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomNavbar;
