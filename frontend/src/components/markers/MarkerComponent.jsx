import { Marker, Popup } from "react-leaflet";
import StatusBadge from "../StatusBadge";

const MarkerComponent = (props) => {
  const { latitude, longitude, icon, onClick, status } = props;
  return (
    <Marker
      position={[latitude, longitude]}
      icon={icon}
      eventHandlers={{
        click: () => {
          // Show the popup
          if (onClick) onClick(latitude, longitude);
        },
      }}
    >
      <Popup>
        {status === "available" ? (
          <button className="flex flex-col" type="submit">
            <div className="flex gap-2 items-center">
              <StatusBadge status="success" />
              <p className="capitalize text-[1rem] font-main">
                Parking {status}
              </p>
            </div>
          </button>
        ) : (
          <button className="flex flex-col" type="submit">
            <div className="flex gap-2 items-center">
              <StatusBadge status="error" />
              <p className="capitalize text-md font-main">Parking {status}</p>
            </div>
          </button>
        )}
      </Popup>
    </Marker>
  );
};

export default MarkerComponent;
