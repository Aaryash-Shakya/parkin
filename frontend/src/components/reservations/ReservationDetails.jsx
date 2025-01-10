import { useParams } from "react-router-dom";
import PageHeader from "../PageHeader";
import { formatISODate } from "../../helpers";

const ReservationDetails = () => {
  const { id } = useParams();

  const reservation = {
    displayName: "Kathmandu Medical College and research center",
    lat: 27.708317,
    lon: 85.3205817,
    price: 400,
    fromDateTime: "2025-01-10T04:27:55.110Z",
    toDateTime: "2025-01-10T06:27:55.110Z",
    vehicleType: "2 Wheeler",
  };

  console.log("id :", id);
  return (
    <>
      <PageHeader title="Your Reservation" backPath="/reservations" />
      <div className="container bg-gray-200 min-h-screen flex flex-col items-center pb-28 pt-8">
        <img src="/reservation-preview.png" alt="" className="w-52 mb-8" />
        <div className="bg-white rounded-3xl overflow-hidden">
          <div className="w-full gap-4 bg-secondary px-5 py-6 ">
            <div className="text-md font-medium w-full text-lg mb-3">
              {reservation.displayName}
            </div>
            <div className="flex text-sm text-gray-600 gap-1">
              <span className="">
                {formatISODate(reservation.fromDateTime)}
              </span>
              to
              <span className="">{formatISODate(reservation.toDateTime)}</span>
            </div>
          </div>
          <div className="px-5 py-6">
            <div className="mb-5 border-b border-gray-300 pb-5">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Rs/hour</span>
                <span className="font-medium">20</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Latitude</span>
                <span className="font-medium">27.708317</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Longitude</span>
                <span className="font-medium">85.3205817</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Vehicle Type</span>
                <span className="font-medium">2 wheeler</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2 items-end">
                <span className="text-gray-600">Total Price</span>
                <span className="text-primary text-xl font-semibold">
                  Rs. 200
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReservationDetails;
