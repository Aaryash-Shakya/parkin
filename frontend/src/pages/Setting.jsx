import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import { FaUser } from "react-icons/fa";
import settingTabs from "../constants/settingTabs";
import Button from "../components/form/Button";

const Setting = () => {
  const [user, setUser] = useState(true);
  return (
    <>
      <PageHeader title="ParkIn Settings" />
      <>
        {user ? (
          <div className="flex gap-4 bg-gray-200 items-center px-5 py-4">
            <div className="flex items-center justify-center bg-white w-14 h-14 aspect-square rounded-full">
              <FaUser className="text-gray-500 text-xl" />
            </div>
            <div className="flex flex-col">
              <p className="text-md text-gray-700 font-semibold">Leon Lama</p>
              <p className="text-sm text-gray-500">leon.lama2002@gmail.com</p>
            </div>
          </div>
        ) : (
          <div className=" flex flex-col px-4 mb-8">
            <Button
              title="Sign in"
              styles="bg-primary text-white rounded-md mt-0"
            />
          </div>
        )}
      </>
      <div className="flex flex-col">
        {settingTabs.map((tab, index) => {
          if (
            user ||
            index === 3 ||
            index === 4 ||
            index === settingTabs.length - 2
          ) {
            return (
              <div
                className="bg-white px-4 py-4 flex items-center gap-4 border border-b-background"
                key={tab.index}
              >
                <img src={tab.icon} alt="" className="w-6 h-6" />
                {tab.name}
              </div>
            );
          }
          return null;
        })}
      </div>
    </>
  );
};

export default Setting;
