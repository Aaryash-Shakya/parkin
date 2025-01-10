import express from "express";
import userController from "../controllers/user.controller";
import vehicleController from "../controllers/vehicle.controller";
import parkingSessionController from "../controllers/parkingSession.controller";

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

export default router;
