import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import { useEffect } from "react";
import customIcon from "/vite.svg";

// custom icon for routing form one point to another
const CustomIcon = L.icon({
  iconUrl: customIcon,
  iconSize: [24, 24],
});

const RoutingComponent = ({ from, to }) => {
  const map = useMap();

  useEffect(() => {
    const routingControl = L.Routing.control({
      waypoints: [L.latLng(from), L.latLng(to)],
      routeWhileDragging: true,
      // Customize icons
      createMarker: (i, waypoint) => {
        return L.marker(waypoint.latLng, {
          icon: CustomIcon,
        });
      },
      lineOptions: {
        styles: [{ color: "rgb(126, 1, 255)", weight: 5, opacity: 0.7 }], // Custom color, weight, and opacity
      },
    }).addTo(map);

    // Cleanup on component unmount
    return () => map.removeControl(routingControl);
  }, [from, to, map]);

  return null;
};

export default RoutingComponent;
