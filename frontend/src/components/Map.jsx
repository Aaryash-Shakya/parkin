import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MyIcon from "/vite.svg";
import MarkerPopUp from "./MarkerPopUp";

const icon = L.icon({
  iconUrl: MyIcon,
  iconSize: [24, 24],
});

const position = [51.505, -0.09];

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectPosition]);

  return null;
}

const Map = (props) => {
  const { selectPosition } = props;
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];

  return (
    <MapContainer
      center={position}
      zoom={8}
      className="w-full h-full absolute top-0 left-0 z-10"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=U6MzK4jnkC1LhK9ZscgV"
      />
      {selectPosition && (
        <Marker position={locationSelection} icon={icon}>
          <Popup>
            <MarkerPopUp />
          </Popup>
        </Marker>
      )}
      <ResetCenterView selectPosition={selectPosition} />
    </MapContainer>
  );
};
export default Map;
