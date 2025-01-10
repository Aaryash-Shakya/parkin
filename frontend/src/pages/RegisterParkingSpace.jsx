import { useState } from "react";
import AdditionalFeatures from "../components/form/AdditionalFeatures";
import Button from "../components/form/Button";
import FormInput from "../components/form/FormInput";
import PageHeader from "../components/PageHeader";

const RegisterParkingSpace = () => {
  const additionalFeatures = ["CCTV", "EV Charging", "Sheltered", "Free"];

  const [formData, setFormData] = useState({
    displayName: "",
    twoWheelerHourlyRate: "",
    fourWheelerHourlyRate: "",
    capacity: "",
    reservedCount: "",
    selectedFeatures: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeatureClick = (feature) => {
    setFormData((prev) => ({
      ...prev,
      selectedFeatures: prev.selectedFeatures.includes(feature)
        ? prev.selectedFeatures.filter((f) => f !== feature) // Remove if already selected
        : [...prev.selectedFeatures, feature], // Add if not selected
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Submit the form data to the backend or perform other actions
  };

  return (
    <>
      <PageHeader title="Create Parking Space" />
      <div className="container bg-gray-200 min-h-screen flex flex-col items-center pb-28">
        <img src="/reservation-preview.png" alt="Reservation Preview" />
        <form className="w-full" onSubmit={handleSubmit}>
          <FormInput
            placeholder="Your Parking Space Name"
            type="text"
            name="displayName"
            label="Location Name"
            value={formData.displayName}
            onChange={handleInputChange}
          />

          <FormInput
            placeholder="Parking rate per hour"
            type="number"
            name="twoWheelerHourlyRate"
            label="Two Wheeler Hourly Rate"
            value={formData.twoWheelerHourlyRate}
            onChange={handleInputChange}
          />

          <FormInput
            placeholder="Parking rate per hour"
            type="number"
            name="fourWheelerHourlyRate"
            label="Four Wheeler Hourly Rate"
            value={formData.fourWheelerHourlyRate}
            onChange={handleInputChange}
          />

          <FormInput
            placeholder="Total Parking Capacity"
            type="number"
            name="capacity"
            label="Capacity"
            value={formData.capacity}
            onChange={handleInputChange}
          />

          <FormInput
            placeholder="Reserved Parking Count"
            type="number"
            name="reservedCount"
            label="Reserved Count"
            value={formData.reservedCount}
            onChange={handleInputChange}
          />

          <AdditionalFeatures
            handleFeatureClick={handleFeatureClick}
            features={additionalFeatures}
            selectedFeatures={formData.selectedFeatures}
          />

          <Button
            title="Create"
            styles="bg-primary text-white hover:bg-blue-700 transition-all duration-0 hover:duration-150 ease-in-out"
          />
        </form>
      </div>
    </>
  );
};

export default RegisterParkingSpace;
