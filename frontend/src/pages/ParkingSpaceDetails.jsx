import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // For route parameters
import AdditionalFeatures from "../components/form/AdditionalFeatures";
import Button from "../components/form/Button";
import FormInput from "../components/form/FormInput";
import PageHeader from "../components/PageHeader";

const ParkingSpaceDetails = () => {
  const { id } = useParams(); // Get the parking space ID from the route
  const additionalFeatures = ["CCTV", "EV Charging", "Sheltered", "Free"];

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    displayName: "Kathmandu Model School",
    twoWheelerHourlyRate: "34",
    fourWheelerHourlyRate: "55",
    capacity: "67",
    reservedCount: "22",
    selectedFeatures: ["CCTV", "EV Charging"],
  });

  //   const [formData, setFormData] = useState({
  //     displayName: "",
  //     twoWheelerHourlyRate: "",
  //     fourWheelerHourlyRate: "",
  //     capacity: "",
  //     reservedCount: "",
  //     selectedFeatures: [],
  //   });

  const [isReadOnly, setIsReadOnly] = useState(true);

  useEffect(() => {
    if (id) {
      // Simulating fetching data from backend
      const fetchParkingDetails = async () => {
        try {
          //   const response = await fetch(`/api/parking/${id}`); // Replace with actual API
          //   const data = await response.json();
          //   setFormData({
          //     displayName: data.displayName,
          //     twoWheelerHourlyRate: data.twoWheelerHourlyRate,
          //     fourWheelerHourlyRate: data.fourWheelerHourlyRate,
          //     capacity: data.capacity,
          //     reservedCount: data.reservedCount,
          //     selectedFeatures: data.selectedFeatures || [],
          //   });
          setIsReadOnly(true); // Disable inputs when editing existing parking space
        } catch (error) {
          console.error("Failed to fetch parking details:", error);
        }
      };
      fetchParkingDetails();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeatureClick = (feature) => {
    if (isReadOnly) return; // Do not allow changes if read-only
    setFormData((prev) => ({
      ...prev,
      selectedFeatures: prev.selectedFeatures.includes(feature)
        ? prev.selectedFeatures.filter((f) => f !== feature) // Remove if already selected
        : [...prev.selectedFeatures, feature], // Add if not selected
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isReadOnly) return; // Prevent submission in read-only mode
    console.log("Form Data:", formData);
    // Submit the form data to the backend or perform other actions
  };

  const handleMapViewClick = () => {
    navigate("/");
    // other logic to move the marker and camera to the lat lng
  };

  return (
    <>
      <PageHeader
        title={"Your Parking Space"}
        backPath="/owner/parking-spaces"
      />
      <div className="container bg-gray-200 min-h-screen flex flex-col items-center pb-28 pt-7">
        <form className="w-full" onSubmit={handleSubmit}>
          <FormInput
            placeholder="Your Parking Space Name"
            type="text"
            name="displayName"
            label="Location Name"
            value={formData.displayName}
            onChange={handleInputChange}
            disabled={isReadOnly}
          />

          <FormInput
            placeholder="Parking rate per hour"
            type="number"
            name="twoWheelerHourlyRate"
            label="Two Wheeler Hourly Rate"
            value={formData.twoWheelerHourlyRate}
            onChange={handleInputChange}
            disabled={isReadOnly}
          />

          <FormInput
            placeholder="Parking rate per hour"
            type="number"
            name="fourWheelerHourlyRate"
            label="Four Wheeler Hourly Rate"
            value={formData.fourWheelerHourlyRate}
            onChange={handleInputChange}
            disabled={isReadOnly}
          />

          <FormInput
            placeholder="Total Parking Capacity"
            type="number"
            name="capacity"
            label="Capacity"
            value={formData.capacity}
            onChange={handleInputChange}
            disabled={isReadOnly}
          />

          <FormInput
            placeholder="Reserved Parking Count"
            type="number"
            name="reservedCount"
            label="Reserved Count"
            value={formData.reservedCount}
            onChange={handleInputChange}
            disabled={isReadOnly}
          />

          <AdditionalFeatures
            handleFeatureClick={handleFeatureClick}
            features={additionalFeatures}
            selectedFeatures={formData.selectedFeatures}
            isReadOnly={isReadOnly}
          />

          <Button
            title="View on Map"
            onClick={handleMapViewClick}
            type="button"
            styles="bg-primary text-white hover:bg-blue-700 transition-all duration-0 hover:duration-150 ease-in-out"
          />
        </form>
      </div>
    </>
  );
};

export default ParkingSpaceDetails;
