import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import FormInput from "../form/FormInput";
import FormSelect from "../form/FormSelect";
import CustomDateTimePicker from "../form/CustomDateTimePicker";
import Button from "../form/Button";
import { toast } from "react-toastify";
import LoadingIndicator from "../LoadingIndicator";

const ParkingEntryRegistrationModal = ({ closeModal, showLoading }) => {
  const vehicleTypeOptions = [
    {
      id: "2Wheeler",
      displayName: "2 Wheeler",
      space: 1,
    },
    {
      id: "4Wheeler",
      displayName: "4 Wheeler",
      space: 3,
    },
  ];
  const [arrivalDateTime, setArrivalDateTime] = useState(new Date());
  const [vehicleType, setVehicleType] = useState(vehicleTypeOptions[0].id);
  const [numberPlate, setNumberPlate] = useState("");
  const [error, setError] = useState("");
  //   const [vehicleType, setVehicleType] = useState(vehicleTypeOptions[0].id);

  const validateDates = () => {
    if (!arrivalDateTime) {
      toast.error("Please select a date");
    }
    const validDateTime = (Date.now() - arrivalDateTime.getTime()) / 60000;
    console.log(validDateTime);
    if (Date.now() < validDateTime) {
      setError(
        "Reservation must be made in future with at least 30 minutes duration!"
      );
      toast.error(
        "Reservation must be made in future with at least 30 minutes duration!"
      );
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("vehicleNumber", numberPlate);
    formData.append("vehicleType", vehicleType);

    try {
      const response = await recordEntry(formData);
      if (response.error) {
        setError(response.error);
        toast.show("error");
      } else {
        setSuccess("Exit recorded successfully!");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setArrivalDateTime("");
      setNumberPlate("");
      setVehicleType(vehicleTypeOptions[0].id);
      closeModal();
    }
  };
  return (
    <div className="bg-gray-200 h-[90%] w-full mx-4 my-0 rounded-xl relative">
      <button
        type="button"
        className="absolute top-5 right-5"
        onClick={closeModal}
      >
        <IoClose size={25} />
      </button>
      <div className="flex items-center px-6 py-8">
        <h2 className="text-xl font-semibold">Add New Entry</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col p-4">
        <FormInput
          placeholder="enter vehicle number"
          type="text"
          name="display_name"
          label="Vehicle Number Plate Number"
          value={numberPlate}
          onChange={(e) => {
            setNumberPlate(e.target.value);
          }}
          style=""
        />

        <FormSelect
          name="vehicleType"
          label="Vehicle Type"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          options={vehicleTypeOptions}
        />

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <Button
          title="Record"
          styles="bg-primary text-white hover:bg-blue-700 transition-all duration-0 hover:duration-150 ease-in-out"
          disabled={!!error} // Disable button if there's an error
        />
      </form>
    </div>
  );
};

export default ParkingEntryRegistrationModal;
