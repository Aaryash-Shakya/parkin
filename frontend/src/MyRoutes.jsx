import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import BottomNavbar from "./components/BottomNavbar";
import Reservation from "./pages/Reservation";
import ReservationListing from "./pages/ReservationListing";
import ReservationDetails from "./components/reservations/ReservationDetails";
import Setting from "./pages/Setting";

const MyRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/reserve-parking" element={<Reservation />} />
          <Route path="/reservations" element={<ReservationListing />} />
          <Route path="/reservations/:id" element={<ReservationDetails />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
        <BottomNavbar />
      </BrowserRouter>
    </>
  );
};

export default MyRoutes;
