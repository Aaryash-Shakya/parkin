import { useState } from "react";
import { useReservationStore } from "../../store/reservation.store";
import Button from "../form/Button";
import FormInput from "../form/FormInput";
import CustomDateTimePicker from "../form/CustomDateTimePicker";
import { toast } from "react-toastify";

const ReserveParking = () => {
  const { reservation } = useReservationStore();
  const [fromDateTime, setFromDateTime] = useState(new Date());
  const [toDateTime, setToDateTime] = useState(
    new Date(new Date().getTime() + 7200000) // adding 2 hours as milliseconds
  );
  const [error, setError] = useState("");

  const validateDates = () => {
    const differenceInMinutes =
      (toDateTime.getTime() - fromDateTime.getTime()) / 60000;
    if (differenceInMinutes < 30) {
      toast.error(
        "Reservation must me made in future with at-least 30min duration!"
      );
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateDates()) {
      // Proceed with form submission
      console.log("Reservation confirmed!");
    }
  };

  return (
    <>
      <div className="bg-secondary">
        <div className="container py-4 pt-6 flex items-center gap-2 ">
          <img src="/back-icon.svg" className="w-6" alt="" />
          <h1 className="font-bold text-xl text-gray-800">Reserve Spot</h1>
        </div>
      </div>
      <div className="container bg-gray-200 min-h-screen flex flex-col items-center pb-28">
        <img src="/reservation-preview.png" alt="" />
        <form onSubmit={handleSubmit}>
          <FormInput
            placeholder="abc@example.com"
            type="text"
            name="display_name"
            label="Location"
            value={reservation.display_name}
            onChange={() => {}}
          />

          <CustomDateTimePicker
            onChange={(value) => {
              setFromDateTime(value);
              validateDates(); // Re-validate on change
            }}
            value={fromDateTime}
            label="From"
          />

          <CustomDateTimePicker
            onChange={(value) => {
              setToDateTime(value);
              validateDates(); // Re-validate on change
            }}
            value={toDateTime}
            label="To"
          />

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <Button
            title="Reserve"
            styles="bg-primary text-white hover:bg-blue-700 transition-all duration-0 hover:duration-150 ease-in-out"
            disabled={!!error} // Disable button if there's an error
          />
        </form>
      </div>
    </>
  );
};

export default ReserveParking;
