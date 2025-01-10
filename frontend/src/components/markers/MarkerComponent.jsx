import { Marker, Popup } from "react-leaflet";

const MarkerComponent = (props) => {
  const { latitude, longitude, description, icon, onClick } = props;
  return (
    <Marker
      position={[latitude, longitude]}
      icon={icon}
      eventHandlers={{
        click: () => {
          if (onClick) onClick(latitude, longitude);
        },
      }}
    >
      <Popup>
        {parseFloat(latitude).toFixed(6)}, {parseFloat(longitude).toFixed(6)}
        <br />
        {description || "No description provided"}
      </Popup>
    </Marker>
  );
};

export default MarkerComponent;
