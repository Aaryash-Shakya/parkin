import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ReserveParking from "./components/reservations/ReserveParking";
import BottomNavbar from "./components/BottomNavbar";

const MyRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/reserve-parking" element={<ReserveParking />} />
        </Routes>
      </Router>
      <BottomNavbar />
    </>
  );
};

export default MyRoutes;
