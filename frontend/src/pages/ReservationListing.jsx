import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";

const ReservationListing = () => {
  const navigate = useNavigate();

  const reservations = [
    {
      displayName: "Kathmandu Medical College and research center",
      lat: 27.708317,
      lon: 85.3205817,
      price: 400,
      fromDateTime: "2025-01-10T04:27:55.110Z",
      toDateTime: "2025-01-10T06:27:55.110Z",
      vehicleType: "2 Wheeler",
    },
    {
      displayName: "Kathmandu Medical College and research center",
      lat: 27.708317,
      lon: 85.3205817,
      price: 400,
      fromDateTime: "2025-01-10T04:27:55.110Z",
      toDateTime: "2025-01-10T06:27:55.110Z",
      vehicleType: "2 Wheeler",
    },
    {
      displayName: "Kathmandu Medical College and research center",
      lat: 27.708317,
      lon: 85.3205817,
      price: 400,
      fromDateTime: "2025-01-10T04:27:55.110Z",
      toDateTime: "2025-01-10T06:27:55.110Z",
      vehicleType: "2 Wheeler",
    },
  ];
  return (
    <>
      <PageHeader title="Your Reservations" />
      <div className="container bg-gray-200 min-h-screen flex flex-col items-center pb-28">
        <img src="/reservation-list.png" alt="" />
        <div className="flex gap-2 mb-6">
          <div className="text-xs font-medium flex items-center text-gray-500">
            <StatusBadge status="success" /> Upcoming
          </div>
          <div className="text-xs font-medium flex items-center text-gray-500">
            <StatusBadge status="warning" /> Ongoing
          </div>
          <div className="text-xs font-medium flex items-center text-gray-500">
            <StatusBadge status="error" /> Expired
          </div>
        </div>
        <div>
          {reservations.map((reservation, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white rounded-3xl p-4 mb-6 gap-4 border-2 border-primary cursor-pointer"
              onClick={() => navigate(`/reservations/[${2}]`)}
            >
              <div>
                <div>
                  <div className="text-md font-medium w-full mb-2">
                    {reservation.displayName}
                  </div>
                </div>
                <div className="flex gap-2">
                  <img src="/car-icon-purple.svg" className="w-5" alt="" />
                  <div className="text-primary font-sm font-medium">2hrs</div>
                </div>
              </div>
              <div>
                <StatusBadge />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ReservationListing;
