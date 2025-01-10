import HomeIconOutline from "../assets/home-black-outline.svg";
import HomeIconSolid from "../assets/home-white-solid.svg";

import ParkingIconOutline from "../assets/parking-black-outline.svg";
import ParkingIconSolid from "../assets/parking-white-solid.svg";

import ReserveIconOutline from "../assets/reserve-black-outline.svg";
import ReserveIconSolid from "../assets/reserve-white-solid.svg";

import SettingIconOutline from "../assets/setting-black-outline.svg";
import SettingIconSolid from "../assets/setting-white-solid.svg";

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
    link: "/reservations",
    iconActive: ReserveIconSolid,
    icon: ReserveIconOutline,
  },
  {
    index: 3,
    name: "Parking",
    link: "/parking",
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

export default navigations;
