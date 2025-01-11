import React from "react";

const ConfirmationModal = ({ id, setModal }) => {
  return (
    <div className="flex flex-col bg-white px-6 py-6 rounded-xl">
      <p className="text-lg">Are you sure the user has exited?</p>
      <div className="flex gap-8 items-center justify-center mt-4">
        <button className="bg-red-500 transition-all duration-100 hover:bg-red-600 text-white px-8 py-3 rounded-lg border border-red-500">
          Yes
        </button>
        <button
          className="bg-gray-100 transition-all duration-100 hover:bg-gray-200 text-black border border-black px-8 py-3 rounded-lg"
          onClick={() => setModal(false)}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
