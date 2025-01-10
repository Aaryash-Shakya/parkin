import Button from "../form/Button";
import { useNavigate } from "react-router-dom";

const RiderMarkerPopup = ({ setShowContent }) => {
  const navigate = useNavigate();
  const handleReservationNavigation = () => {
    setShowContent(false);
    return navigate("/reserve-parking");
  };

  return (
    <div>
      <div className="flex gap-4 mb-2">
        <div className="flex gap-1 font-semibold text-green-600 items-center">
          <img src="/bike-icon-purple.svg" className="w-5 green-img" alt="" />
          10
        </div>
        <div className="flex gap-1 font-semibold text-yellow items-center">
          <img src="/bike-icon-purple.svg" className="w-5 yellow-img" alt="" />
          10
        </div>
        <div className="flex gap-1 font-semibold text-red-600 items-center">
          <img src="/bike-icon-purple.svg" className="w-5 red-img" alt="" />
          10
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">
        Kathmandu Parking Complex
      </h3>

      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Latitude</span>
        <span className="font-medium">32323</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Longitude</span>
        <span className="font-medium">323</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Price/hr</span>
        <span className="font-medium">Rs. 40</span>
      </div>

      <div className="flex gap-4">
        <Button
          title="Directions"
          onClick={() => {}}
          styles="text-md px-2 bg-primary text-white transition-all duration-0 hover:duration-150 ease-in-out"
        />
        <Button
          title="Reserve Space"
          onClick={handleReservationNavigation}
          styles="text-md px-2 bg-secondary text-black transition-all duration-0 hover:duration-150 ease-in-out"
        />
      </div>
    </div>
  );
};

export default RiderMarkerPopup;
