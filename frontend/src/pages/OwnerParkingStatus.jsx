import PageHeader from "../components/PageHeader";
import ParkingInfo from "../components/Parking/ParkingInfo";
import { IoIosAdd } from "react-icons/io";
import Bike from "../../public/bike-icon-purple.svg";
import { ParkingListing } from "../components/Parking/ParkingListing";
import { useState } from "react";
import ParkingEntryRegistrationModal from "../components/Parking/ParkingEntryRegistrationModal";
import LoadingIndicator from "../components/LoadingIndicator";

const OwnerParkingStatus = () => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleAddNewEntry = () => {
    console.log("modal", modal);
    setModal(!modal);
  };

  const parkingInfo = [
    {
      id: "1",
      name: "Pulser 220",
      vehicleNumber: "Ba-2-Cha 4956",
      arrivalTime: "9:00 a.m",
      arrivalDate: "12th Jan, 2024",
      vehicleType: "2-wheeler",
    },
    {
      id: "091",
      name: "N-150",
      vehicleNumber: "Ba-2-Cha 8291",
      arrivalTime: "9:08 a.m",
      arrivalDate: "12th Jan, 2024",
      vehicleType: "4-wheeler",
    },
    {
      id: "23",
      name: "Fz - V3",
      vehicleNumber: "Ba-2-Cha 9872",
      arrivalTime: "9:18 a.m",
      arrivalDate: "12th Jan, 2024",
      vehicleType: "2-wheeler",
    },
    {
      id: "34",
      name: "Pulser 220",
      vehicleNumber: "Ba-2-Cha 6261",
      arrivalTime: "11:00 a.m",
      arrivalDate: "12th Jan, 2024",
      vehicleType: "4-wheeler",
    },
    {
      id: "34",
      name: "Hero Honda 150",
      vehicleNumber: "Ba-2-Cha 4356",
      arrivalTime: "11:00 a.m",
      arrivalDate: "12th Jan, 2024",
      vehicleType: "4-wheeler",
    },
  ];

  return (
    <div
      className={`bg-background relative ${
        modal ? "max-h-screen overflow-hidden" : "max-h-none overflow-auto"
      }`}
    >
      <PageHeader title="Parking Status" />
      <ParkingInfo />
      <div className="flex flex-col bg-white p-4 m-4 mt-0 mb-28 rounded-lg ">
        <div className="flex items-center justify-between bg-white border-b border-gray-200 m-4 pb-6 ">
          <p className="font-bold">Parked Vehicles</p>
          <button
            type="button"
            className="border-2 border-gray-200 rounded-full w-12 h-12 flex items-center justify-center shadow-sm"
            onClick={handleAddNewEntry}
          >
            <IoIosAdd size={30} className="font-bold" />
          </button>
        </div>

        {parkingInfo.map((info, i) => (
          <ParkingListing
            id={12}
            arrivalDate={info.arrivalDate}
            arrivalTime={info.arrivalTime}
            vehicleNumber={info.vehicleNumber}
            vehicleType={info.vehicleType}
            key={i}
          />
        ))}
      </div>
      <div
        className={`flex items-center justify-center bg-black/40 w-screen h-screen absolute top-0 left-0 right-0 transition-opacity duration-150 ease-in-out px-3 ${
          modal ? "z-50 opacity-100" : "-z-10 opacity-0"
        }`}
      >
        <ParkingEntryRegistrationModal closeModal={handleAddNewEntry} />
      </div>
      {loading && <LoadingIndicator />}
    </div>
  );
};

export default OwnerParkingStatus;
