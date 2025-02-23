import { useEffect, useState } from "react";
import { useMarkerPopUpStore } from "../../store/useMarkerPopUp.store";
import { toast } from "react-toastify";
import { useUserStore } from "../../store/user.store";
import Button from "../form/Button";
import { useNavigate } from "react-router-dom";
import { getParkingDetail } from "../../api/parking";
import { useMarkerStore } from "../../store/useMarker.store";

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

  const { toggleSearch , setEndPosition} = useMarkerStore();

  const [additionalFeatures, setAdditionalFeatures] = useState([]);
  const [markerData, setMarkerData] = useState();

  useEffect(() => {
    const apiCall = async () => {
      console.log(markerContent);
      if (!markerContent.parkingId) return;
      await getParkingDetail(markerContent.parkingId).then((data) => {
        console.log(data);
        setAdditionalFeatures(data?.features);
        setMarkerData(data);
      });
    };
    apiCall();
  }, [markerContent]);

  if (!markerData) return;

  return (
    <div>
      <div className="flex gap-4 mb-2">
        <div className="flex gap-1 font-semibold text-green-600 items-center">
          <img src="/bike-icon-purple.svg" className="w-5 green-img" alt="" />
          {markerData.availableSlots}
        </div>
        <div className="flex gap-1 font-semibold text-red-600 items-center">
          <img src="/bike-icon-purple.svg" className="w-5 red-img" alt="" />
          {markerData.capacity - markerData.availableSlots}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">
        {markerData?.name}
      </h3>

      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Latitude</span>
        <span className="font-medium">
          {markerData?.location?.coordinates[1]}
        </span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Longitude</span>
        <span className="font-medium">
          {markerData?.location?.coordinates[0]}
        </span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-600">2 wheeler Price/hr</span>
        <span className="font-medium">
          Rs. {markerData?.hourlyRates.TWO_WHEELER.ratePerHour}
        </span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-600">4 wheeler Price/hr</span>
        <span className="font-medium">
          Rs. {markerData.hourlyRates.FOUR_WHEELER.ratePerHour}
        </span>
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
          onClick={() => {
            // console.log("I am here")
            setEndPosition({
              lat: markerData?.location?.coordinates[1],
              long: markerData?.location?.coordinates[0],
            });
            // setTimeout(() => {
            //   toggleSearch();
            // }, 1000);
          }}
          styles="text-sm px-2 bg-primary text-white transition-all duration-0 hover:duration-150 ease-in-out"
        />
        <Button
          title="Reserve Space"
          onClick={handleReservationNavigation}
          styles="text-sm px-2 bg-secondary text-black transition-all duration-0 hover:duration-150 ease-in-out"
        />
      </div>
    </div>
  );
};

export default RiderMarkerPopup;
