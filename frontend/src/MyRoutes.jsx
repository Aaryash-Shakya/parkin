import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import BottomNavbar from "./components/BottomNavbar";
import Reservation from "./pages/Reservation";
import ReservationListing from "./pages/ReservationListing";
import ReservationDetails from "./pages/ReservationDetails";
import ParkingStatus from "./pages/ParkingStatus";
import Setting from "./pages/Setting";
import RegisterParkingSpace from "./pages/RegisterParkingSpace";
import ParkingSpaceList from "./pages/ParkingSpaceList";
import ParkingSpaceDetails from "./pages/ParkingSpaceDetails";
import ParkingStatusList from "./pages/ParkingStatusList";
import OwnerParkingStatus from "./pages/OwnerParkingStatus";
import MarkerPopUp from "./components/markers/MarkerPopUp";

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
          <Route path="/parking" element={<ParkingStatus />} />
          <Route path="/reservations/:id" element={<ReservationDetails />} />
          <Route path="/setting" element={<Setting />} />
          <Route
            path="/owner/register-space"
            element={<RegisterParkingSpace />}
          />
          <Route path="/owner/parking-spaces" element={<ParkingSpaceList />} />
          <Route
            path="/owner/parking-spaces/:id"
            element={<ParkingSpaceDetails />}
          />
          <Route
            path="/owner/parking-status-listing/"
            element={<ParkingStatusList />}
          />
          <Route
            path="/owner/parking-status/:id"
            element={<OwnerParkingStatus />}
          />
        </Routes>
        <MarkerPopUp />

        <BottomNavbar />
      </BrowserRouter>
    </>
  );
};

export default MyRoutes;
