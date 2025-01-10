import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MyIcon from "/vite.svg";
import MarkerComponent from "./markers/MarkerComponent";
import AddNewMarker from "./markers/AddNewMarkers";
import RoutingComponent from "./markers/RoutingComponent";

const searchAreaIcon = L.icon({
  iconUrl: MyIcon,
  iconSize: [24, 24],
});
const parkingIcon = L.icon({
  iconUrl: MyIcon,
  iconSize: [24, 24],
});

const currentPosition = [27.698865, 85.297047]; // Default center position
const PointA = [27.691005, 85.300813]; // Example coordinates for Point A
const PointB = [27.689751, 85.299434
]; // Example coordinates for Point B`

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
    latitude: 27.688418,
    longitude: 85.301502,
    description: "Marker 1",
    icon: parkingIcon,
  },
  {
    latitude: 27.688331,
    longitude: 85.302393,
    description: "Marker 2",
    icon: parkingIcon,
  },
  {
    latitude: 27.688329356193083,
    longitude: 85.30236389186568,
    description: "Marker 3",
    icon: parkingIcon,
  },
];

const Map = (props) => {
  const { selectPosition } = props; // markersData is the JSON array of marker data
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];
  // const [showContent, setShowContent] = useState(false);

  // const handleMarkerClick = (latitude, longitude) => {
  //   setShowContent(true);
  // };

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

      {markersData.map((marker, index) => (
        <MarkerComponent
          key={index}
          latitude={marker.latitude}
          longitude={marker.longitude}
          description={marker.description}
          icon={marker.icon}
          // onClick={handleMarkerClick}
        />
      ))}

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
      <RoutingComponent from={PointA} to={PointB} />
    </MapContainer>
  );
};

export default Map;
