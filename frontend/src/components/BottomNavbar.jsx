import { useLocation, useNavigate } from "react-router-dom";

import HomeIconOutline from "../assets/home-black-outline.svg";
import HomeIconSolid from "../assets/home-white-solid.svg";

import ParkingIconOutline from "../assets/parking-black-outline.svg";
import ParkingIconSolid from "../assets/parking-white-solid.svg";

import ReserveIconOutline from "../assets/reserve-black-outline.svg";
import ReserveIconSolid from "../assets/reserve-white-solid.svg";

import SettingIconOutline from "../assets/setting-black-outline.svg";
import SettingIconSolid from "../assets/setting-white-solid.svg";
import { useUserStore } from "../store/user.store";

const BottomNavbar = () => {
  const { userData } = useUserStore();

  const role = userData.type;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navigations = [
    {
      index: 1,
      name: "Home",
      link: "/",
      iconActive: HomeIconSolid,
      icon: HomeIconOutline,
    },
    {
      index: 2,
      name: "Reservation",
      link: role !== "OPERATOR" ? "/reservations" : "/owner/parking-spaces",
      iconActive: ReserveIconSolid,
      icon: ReserveIconOutline,
    },
    {
      index: 3,
      name: "Parking",
      link: role !== "OPERATOR" ? "/parking" : "/owner/parking-status-listing",
      iconActive: ParkingIconSolid,
      icon: ParkingIconOutline,
    },
    {
      index: 4,
      name: "Setting",
      link: "/setting",
      iconActive: SettingIconSolid,
      icon: SettingIconOutline,
    },
  ];

  const handleActive = (link) => {
    navigate(link);
  };

  return (
    <div
      className={`px-4 fixed min-h-20 flex items-center justify-center z-40 transition-all ease-in-out duration-100 ${
        pathname == "/"
          ? "bottom-8 left-0 right-0 bg-none"
          : "bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-[0_4px_20px_4px_rgba(0,0,0,0.2)] "
      }`}
    >
      <div
        className={`flex items-center justify-center h-fit w-fit rounded-full p-1 transition-all ease-in-out duration-100 ${
          pathname == "/" ? "w-fit bg-none" : "w-full"
        }`}
      >
        {navigations.map((nav) => (
          <div
            key={nav.name}
            className={`flex flex-col items-center justify-center overflow-hidden w-[100px] h-20 border-r-0 p-1  ${
              pathname == "/" ? "-m-3" : "m-0"
            }`}
          >
            <button
              className={`flex items-center justify-center w-full h-full ${
                pathname === nav.link
                  ? "bg-primary z-40 rounded-[32px]"
                  : `bg-white z-30 ${
                      nav.index === 1
                        ? "rounded-l-[32px]"
                        : nav.index === 4
                        ? "rounded-r-[32px]"
                        : "rounded-none"
                    }`
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
