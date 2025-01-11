import { useEffect, useState } from "react";
import { useMarkerPopUpStore } from "../../store/useMarkerPopUp.store";
import { toast } from "react-toastify";
import { useUserStore } from "../../store/user.store";
import Button from "../form/Button";
import { useNavigate } from "react-router-dom";
import { getParkingDetail } from "../../api/parking";

const RiderMarkerPopup = ({ setShowContent }) => {
  const { userData } = useUserStore();
  const navigate = useNavigate();
  const handleReservationNavigation = () => {
    setShowContent(false);
    if (!userData?.isAuthenticated) {
      navigate("/sign-in");
      toast.warn("Please login in to access full features.");
      return;
    }
    navigate("/reserve-parking");
  };

  const { markerContent } = useMarkerPopUpStore();

  const [additionalFeatures, setAdditionalFeatures] = useState([]);

  useEffect(() => {
    const apiCall = async () => {
      console.log(markerContent);
      await getParkingDetail(markerContent.parkingId).then((data) => {
        console.log(data);
        setAdditionalFeatures(data?.features);
      });
    };
    apiCall();
  }, [markerContent]);

  return (
    <div>
      <div className="flex gap-4 mb-2">
        <div className="flex gap-1 font-semibold text-green-600 items-center">
          <img src="/bike-icon-purple.svg" className="w-5 green-img" alt="" />
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

      <div className="flex gap-2 mt-4">
        {additionalFeatures.map((feat) => (
          <div
            className="font-semibold text-xs border-2 border-primary rounded-2xl px-3 py-1 text-primary bg-[#8001ff33]"
            key={feat}
          >
            {feat}
          </div>
        ))}
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
