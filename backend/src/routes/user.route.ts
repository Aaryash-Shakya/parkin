import express from "express";
import userController from "../controllers/user.controller";
import vehicleController from "../controllers/vehicle.controller";
import parkingSessionController from "../controllers/parkingSession.controller";
import bookingController from "../controllers/booking.controller";

const router = express.Router();

router.route("/register").post(userController.registerUser);

router.route("/login").post(userController.loginUser);

router
	.route("/vehicle/register")
	.post(vehicleController.registerVehicleForUser);

router.route("/vehicles").get(vehicleController.getVehiclesForUser);

router
	.route("/parked-vehicles")
	.get(parkingSessionController.findParkedVehiclesOfUser);

router.route("/booking").post(bookingController.createBooking);

router.route("/bookings/:userId").get(bookingController.listBookings);

export default router;
