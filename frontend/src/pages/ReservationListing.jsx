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

        <div>
          {reservations.map((reservation, index) => (
            <div
              key={index}
              className="relative flex bg-white p-4 rounded-lg date-badge-parent justify-between items-center mb-4 gap-4 cursor-pointer "
              onClick={() => navigate(`/reservations/[${2}]`)}
            >
              <div className="date-badge">
                Apr
                <span>22</span>
              </div>
              <div>
                <div>
                  <div className="text-md font-medium w-full mb-2">
                    {reservation.displayName}
                  </div>
                </div>
                <div className="flex gap-2">
                  <img src="/car-icon-purple.svg" className="w-5" alt="" />
                  <div className="text-primary flex gap-2 items-center font-sm font-medium">
                    2hrs <span className="text-gray-300">|</span>
                    <div className="font-semibold text-sm text-green-600">
                      Expired
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

export default ReservationListing;
