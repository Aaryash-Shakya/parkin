import { useMarkerPopUpStore } from "../../store/useMarkerPopUp.store";

const MarkerPopUp = () => {
  const {
    showContent,
    clearContent,
    markerContent,
    clearMarkerContent,
  } = useMarkerPopUpStore();

  const handleClose = () => {
    clearContent(); // Hide popup
    clearMarkerContent(); // Clear marker data
  };

  return (
    <div className={`absolute bottom-0 left-0 z-[90] bg-white w-full`}>
      {showContent && (
        <div className="popup">
          <p>Latitude: {markerContent.latitude}</p>
          <p>Longitude: {markerContent.longitude}</p>
          <p>Description: {markerContent.description}</p>
          <button onClick={handleClose}>Close</button>
        </div>
      )}
    </div>
  );
};

export default MarkerPopUp;
