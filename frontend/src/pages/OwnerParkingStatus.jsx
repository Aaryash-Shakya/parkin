import PageHeader from "../components/PageHeader";
import ParkingInfo from "../components/Parking/ParkingInfo";
import { IoIosAdd } from "react-icons/io";
import Bike from "../../public/bike-icon-purple.svg";
import { FaClockRotateLeft } from "react-icons/fa6";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { TbLogout } from "react-icons/tb";

const OwnerParkingStatus = () => {
  return (
    <div className="bg-background">
      <PageHeader title="Parking Status" />
      <ParkingInfo />
      <div className="flex flex-col bg-white p-4 m-4 mt-0 mb-28 rounded-lg ">
        <div className="flex items-center justify-between bg-white border-b border-gray-200 m-4 pb-4 ">
          <p className="font-bold">Parked Vehicles</p>
          <button
            type="button"
            className="border-2 border-gray-200 rounded-full w-12 h-12 flex items-center justify-center shadow-sm"
          >
            <IoIosAdd size={30} className="font-bold" />
          </button>
        </div>
        <div className="!p-4 border-b border-gray-300 g-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-lg font-semibold">Ba-2-CHA 7994</p>
            <div className="bg-red-500 rounded-full p-2 flex items-center justify-center">
              <TbLogout className="text-white w-6 h-6 ml-1" />
            </div>
          </div>
          <div className="grid grid-cols-1  gap-2 justify-between">
            <div className="flex gap-2 items-center">
              <FaClockRotateLeft />
              <p className="text-sm">9:00 a.m</p>
            </div>
            <div className="flex gap-2 items-center">
              <MdOutlineCalendarMonth />
              <p className="text-sm"> 10th Jan, 2024</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-sm">Type:</p>
              <p className="text-sm">Bike / Scooter</p>
            </div>
          </div>
        </div>

        <div className="!p-4 border-b border-gray-200 g-2">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-lg font-semibold">Ba-2-CHA 4647</p>
            <div className="bg-red-500 rounded-full p-2 flex items-center justify-center">
              <TbLogout className="text-white w-6 h-6 ml-1" />
            </div>
          </div>
          <div className="grid grid-cols-1  gap-2 justify-between">
            <div className="flex gap-2 items-center">
              <FaClockRotateLeft />
              <p className="text-sm">10:24 a.m</p>
            </div>
            <div className="flex gap-2 items-center">
              <MdOutlineCalendarMonth />
              <p className="text-sm"> 9th Jan, 2024</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-sm">Type:</p>
              <p className="text-sm">Bike / Scooter</p>
            </div>
          </div>
        </div>

        <div className="!p-4 border-b border-gray-200 g-2">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-lg font-semibold">Ba-2-CHA 4647</p>
            <div className="bg-red-500 rounded-full p-2 flex items-center justify-center">
              <TbLogout className="text-white w-6 h-6 ml-1" />
            </div>
          </div>
          <div className="grid grid-cols-1  gap-2 justify-between">
            <div className="flex gap-2 items-center">
              <FaClockRotateLeft />
              <p className="text-sm">10:24 a.m</p>
            </div>
            <div className="flex gap-2 items-center">
              <MdOutlineCalendarMonth />
              <p className="text-sm"> 9th Jan, 2024</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-sm">Type:</p>
              <p className="text-sm">Bike / Scooter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerParkingStatus;
