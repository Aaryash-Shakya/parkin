import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ParkingIcon from "/marker.svg";
import CurrentIcon from "/current.svg";
import MarkerComponent from "./markers/MarkerComponent";
import AddNewMarker from "./markers/AddNewMarkers";

const searchAreaIcon = L.icon({
  iconUrl: CurrentIcon, // current location icon
  iconSize: [30, 30],
});
const parkingIcon = L.icon({
  iconUrl: ParkingIcon, // parking icon
  iconSize: [40, 40],
});

const currentPosition = [27.698865, 85.297047]; // Default center position

function ResetCenterView(props) {
  const { selectPosition } = props;
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView(
        L.latLng(selectPosition?.lat, selectPosition?.lon),
        map.getZoom(),
        {
          animate: true,
        }
      );
    }
  }, [selectPosition, map]);

  return null;
}

const markersData = [
  {
    name: "Sagarmatha Parking Space",
    latitude: 27.688418, //
    longitude: 85.301502,
    status: "available",
    description: "Marker 1",
  },
  {
    name: "Everest Parking Space ",
    latitude: 27.688331,
    longitude: 85.302393,
    status: "full",
    description: "Marker 2",
  },
  {
    name: "Kathmandu Parking Space ",
    latitude: 27.688329356193083,
    longitude: 85.30236389186568,
    status: "full",
    description: "Marker 3",
  },
  {
    name: "Shandar Momo Parking ",
    latitude: 27.688329356193076,
    longitude: 85.30236389186563,
    status: "Full",
    description: "Marker 3",
  },
];

const Map = (props) => {
  const { selectPosition } = props; // markersData is the JSON array of marker data
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];

  const handleMarkerClick = (latitude, longitude) => {
    console.log(`Marker clicked at ${latitude}, ${longitude}`);
  };

  return (
    <MapContainer
      center={currentPosition}
      zoom={35}
      className="w-full h-full absolute top-0 left-0 z-10"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/*  array bata data ako parking ko lagi ho  */}
      {markersData.map((marker, index) => (
        <MarkerComponent
          key={index}
          latitude={marker.latitude}
          longitude={marker.longitude}
          description={marker.description}
          icon={parkingIcon}
          status={marker.status}
          name={marker.name}
          onClick={handleMarkerClick}
        />
      ))}

      {/* search garera ako  */}
      {selectPosition && (
        <MarkerComponent
          latitude={locationSelection[0]}
          longitude={locationSelection[1]}
          icon={searchAreaIcon}
          description="Search Area"
        />
      )}

      {currentPosition && (
        <MarkerComponent
          latitude={currentPosition[0]}
          longitude={currentPosition[1]}
          icon={searchAreaIcon}
          description="Position"
        />
      )}
      <ResetCenterView selectPosition={selectPosition} />
      <AddNewMarker />
    </MapContainer>
  );
};

export default Map;
