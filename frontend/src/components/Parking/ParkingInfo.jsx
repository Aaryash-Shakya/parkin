import React from "react";
import Bike from "../../../public/bike-icon-purple.svg";
import Car from "../../../public/car-icon-purple.svg";
import User from "../../assets/user.svg";
import StatusBadge from "../StatusBadge";

const ParkingInfo = () => {
  const status = [
    {
      index: 1,
      name: "Total Capacity",
      icon: User,
      value: "50",
    },
    {
      index: 2,
      name: "Total Parked Cars", // icons
      icon: Car,
      value: "5",
    },
    {
      index: 3,
      name: "Total Parked Bikes", // icons
      icon: Bike,
      value: "20",
    },
    {
      index: 4,
      name: "Available Capacity",
      icon: <StatusBadge status="success" />,
      value: "10",
    },
    {
      index: 5,
      name: "Reserved Capacity",
      icon: <StatusBadge status="warning" />,
      value: "15",
    },
    {
      index: 6,
      name: "Occupied Capacity",
      icon: <StatusBadge status="error" />,
      value: "20",
    },
  ];
  return (
    <div className="container bg-gray-200 flex flex-col items-center pb-4 pt-4">
      <div className="grid grid-cols-3 w-full p-4 gap-8 bg-white rounded-lg ">
        {status.map((stat, index) => (
          <div className="flex gap-2" key={index}>
            {stat.index >= 4 ? (
              <div className="flex items-center gap-2">
                {stat.icon} <span className="font-medium">{stat.value}</span>
              </div>
            ) : (
              <div className="flex gap-2 items-center" key={index}>
                <img src={stat.icon} alt="" className="w-6 h-6" />
                <span className="font-medium">{stat.value}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParkingInfo;
