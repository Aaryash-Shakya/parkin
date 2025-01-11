import { useMap } from "react-leaflet";
import L from "leaflet";
import { useState } from "react";
import { useMarkerStore } from "../../store/useMarker.store";
import MarkerComponent from "./MarkerComponent";
import { useMarkerPopUpStore } from "../../store/useMarkerPopUp.store";

const newIcon = L.icon({
  iconUrl: "/marker.svg",
  iconSize: [28, 28],
});

const AddNewMarker = () => {
  const { setNewMarker, clearNewMarker } = useMarkerStore();

  const [markerPosition, setMarkerPosition] = useState(null); // Local state to track the marker position
  const { setMarkerContent, setShowContent } = useMarkerPopUpStore();

  const map = useMap();

  // Add event listener when the component is mounted
  map.on("click", (e) => {
    const { lat: latitude, lng: longitude } = e.latlng;
    const newPosition = { lat: latitude, lng: longitude };
    setMarkerContent({
      latitude: newPosition?.lat,
      longitude: newPosition?.lng,
      description: "This is a custom marker!",
    });
    setShowContent(true); // Show the popup
    setMarkerPosition(newPosition); // Update the local marker state
    setNewMarker(newPosition); // Update the global state via your store
  });

  return (
    <>
      {markerPosition && (
        <MarkerComponent
          latitude={markerPosition.lat}
          longitude={markerPosition.lng}
          icon={newIcon}
          onClick={() => {
            clearNewMarker();
            setMarkerPosition(null);
          }}
        />
      )}
    </>
  );
};

export default AddNewMarker;
