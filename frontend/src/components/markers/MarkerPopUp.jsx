/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useMarkerPopUpStore } from "../../store/useMarkerPopUp.store";
import Button from "../form/Button";
import RiderMarkerPopup from "./RiderMarkerPopup";

const MarkerPopUp = () => {
  const {
    clearContent,
    markerContent,
    clearMarkerContent,
    showContent,
    setShowContent,
  } = useMarkerPopUpStore();

  const navigate = useNavigate();

  const handleClose = () => {
    clearContent(); // Hide popup
    clearMarkerContent(); // Clear marker data
  };

  const handleCreationNavigation = () => {
    setShowContent(false);
    return navigate("/owner/register-space");
  };

  return (
    <div
      className={`fixed w-full shadow-2xl transition-all rounded-t-3xl z-[60] p-6 bg-white left-1/2 transform -translate-x-1/2 ${
        showContent ? "bottom-0" : "-bottom-full"
      }`}
      style={{ boxShadow: "0px -2px 10px rgba(0,0,0,0.2)" }}
    >
      <div className="popup ">
        <button
          className="text-gray-600 absolute top-2 right-4 cursor-pointer font-semibold"
          onClick={handleClose}
        >
          X
        </button>

        {/* <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Add Your Parking Location
          </h3>

          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Latitude</span>
            <span className="font-medium">
              {parseFloat(markerContent?.latitude?.toFixed(4))}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Longitude</span>
            <span className="font-medium">
              {parseFloat(markerContent?.longitude?.toFixed(4))}
            </span>
          </div>

          <Button
            title="Create Parking Space"
            onClick={handleCreationNavigation}
            styles="bg-primary text-white hover:bg-blue-700 transition-all duration-0 hover:duration-150 ease-in-out"
          />
        </div> */}

        <RiderMarkerPopup setShowContent={setShowContent} />
      </div>
    </div>
  );
};

export default MarkerPopUp;
