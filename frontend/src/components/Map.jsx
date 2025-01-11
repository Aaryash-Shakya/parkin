import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ParkingIcon from "/marker.svg";
import CurrentIcon from "/current.svg";
import MarkerComponent from "./markers/MarkerComponent";
import AddNewMarker from "./markers/AddNewMarkers";
import RoutingComponent from "./markers/RoutingComponent";
import { useMarkerStore } from "../store/useMarker.store";
import { useMarkerPopUpStore } from "../store/useMarkerPopUp.store";
import { useParkingStore } from "../store/parking.store";
import { useUserStore } from "../store/user.store";
import { listAllParking } from "../api/parking";

const searchAreaIcon = L.icon({
  iconUrl: CurrentIcon, // current location icon
  iconSize: [30, 30],
});
const parkingIcon = L.icon({
  iconUrl: ParkingIcon, // parking icon
  iconSize: [40, 40],
});

const currentPosition = [27.698865, 85.297047]; // Default center position

// const PointA = [27.691005, 85.300813]; // Example coordinates for Point A
// const PointB = [27.689751, 85.299434
// ]; // Example coordinates for Point B`

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

const Map = (props) => {
  const { selectPosition } = props; // markersData is the JSON array of marker data
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];

  const { startPosition, endPosition } = useMarkerStore();
  const { setMarkerContent, toggleContent } = useMarkerPopUpStore();

  const { parkings } = useParkingStore();
  const { userData } = useUserStore();
  const { triggerSearch } = useMarkerStore();

  console.log(parkings);

  const markersData = parkings.map((parking) => ({
    parkingId: parking._id,
    name: parking.name,
    latitude: parking.location.coordinates[1],
    longitude: parking.location.coordinates[0],
    status: parking.status,
    description: parking.description,
  }));

  useEffect(() => {
    const apiCall = async () => {
      await listAllParking().then((data) => {
        console.log(data);
      });
    };
    apiCall();
  }, []);

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
          onClick={() => {
            setMarkerContent({
              parkingId: marker.parkingId,
            });
            toggleContent();
          }}
          icon={parkingIcon}
          status={marker.status}
          name={marker.name}
        />
      ))}

      {/* search garera ako  */}
      {selectPosition && (
        <MarkerComponent
          latitude={locationSelection[0]}
          longitude={locationSelection[1]}
          icon={searchAreaIcon}
          description="Search Area"
          onClick={() => {
            setMarkerContent({
              latitude: locationSelection[0],
              longitude: locationSelection[1],
              description: "This is a custom marker!",
            });
            toggleContent();
          }}
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
      {userData.type === "OPERATOR" && <AddNewMarker />}
      {triggerSearch && (
        <RoutingComponent from={startPosition} to={endPosition} />
      )}
    </MapContainer>
  );
};

export default Map;
