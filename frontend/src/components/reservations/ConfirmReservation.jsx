import PageHeader from "../PageHeader";

const ConfirmReservation = ({ setConfirmPage }) => {
  const reservation = {
    displayName: "Kathmandu Medical College and research center",
    lat: 27.708317,
    lon: 85.3205817,
    price: 400,
  };
  return (
    <>
      <PageHeader title="Confirm Reservation" setConfirmPage={setConfirmPage} />
      <div className="container bg-gray-200 min-h-screen flex flex-col items-center pb-28 pt-8">
        <img src="/confirm-icon.svg" alt="" className="w-40 mb-8" />
        <div className="bg-white rounded-3xl overflow-hidden">
          <div className="w-full flex gap-4 bg-secondary px-5 py-6">
            <div className="text-md font-medium">{reservation.displayName}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmReservation;
