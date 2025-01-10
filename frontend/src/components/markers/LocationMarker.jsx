import { useMapEvents } from "react-leaflet";
import MarkerComponent from "./MarkerComponent";

import NewParkingIcon from "/vite.svg";
import { useState } from "react";

const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <MarkerComponent
      latitude={position.lat}
      longitude={position.lng}
      description="You are here"
      icon={NewParkingIcon}
    />
  );
};

export default LocationMarker;
