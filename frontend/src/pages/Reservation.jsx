import { useState } from "react";
import ReserveParking from "../components/reservations/ReserveParking";
import ConfirmReservation from "../components/reservations/ConfirmReservation";

const Reservation = () => {
  const [confirmPage, setConfirmPage] = useState(false);
  return (
    <>
      {confirmPage ? (
        <ConfirmReservation setConfirmPage={setConfirmPage} />
      ) : (
        <ReserveParking setConfirmPage={setConfirmPage} />
      )}
    </>
  );
};

export default Reservation;
