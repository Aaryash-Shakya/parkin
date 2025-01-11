import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="fixed w-screen h-screen flex justify-center items-center z-[100] bg-white">
      <img src="/animated-car-image.gif" alt="" />
    </div>
  );
};

export default LoadingIndicator;
