import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { useEffect, useState } from "react";
// import { useLoadingStore } from "../store/loading.store";
import { useUserStore } from "../store/user.store";
import { getOwnerParkingSpaces } from "../api/owner.booking";

const ParkingSpaceList = () => {
  const navigate = useNavigate();
  // const { setLoading } = useLoadingStore();
  const { userData } = useUserStore();

  const [reservations, setReservations] = useState([]);

  const fetchReservationData = async () => {
    try {
      // setLoading(true);

      const result = await getOwnerParkingSpaces(userData.userId);
      console.log("result :", result);
      setReservations(result);
    } catch (err) {
      console.log("err :", err);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservationData();
  }, []);

  return (
    <>
      <PageHeader title="Your Parking Locations" />
      <div className="container bg-gray-200 min-h-screen flex flex-col items-center pb-28">
        <img src="/reservation-list.png" alt="" />

        <div className="w-full">
          {reservations.map((reservation, index) => (
            <div
              key={index}
              className="relative w-full flex bg-white p-4 rounded-lg date-badge-parent  items-center mb-4 gap-4 cursor-pointer "
              onClick={() =>
                navigate(`/owner/parking-spaces/${reservation._id}`)
              }
            >
              <div className="date-badge">
                Jan
                <span>12</span>
              </div>
              <div>
                <div>
                  <div className="text-md font-medium w-full mb-2">
                    {reservation.name}
                  </div>
                </div>
                <div className="flex gap-2 w-full">
                  <img src="/bike-icon-purple.svg" className="w-5" alt="" />
                  <div className="text-primary flex gap-2 items-center font-sm font-medium">
                    {reservation.capacity}{" "}
                    <span className="text-gray-300">|</span>
                    <div className="font-semibold text-sm text-primary">
                      {reservation?.hourlyRates?.TWO_WHEELER?.ratePerHour ? (
                        <>
                          Rs.
                          {
                            reservation?.hourlyRates?.TWO_WHEELER?.ratePerHour
                          }{" "}
                          /hr
                        </>
                      ) : (
                        <span className="text-green-600">Free</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div>{/* <StatusBadge /> */}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ParkingSpaceList;
