import express from "express";
import parkingController from "../controllers/parking.controller";
import parkingSessionController from "../controllers/parkingSession.controller";

const router = express.Router();

router.route("/add").post(parkingController.addParking);

router.route("/update/:parkingId").put(parkingController.updateParking);

router.route("/list").get(parkingController.listParkings);

router.route("/nearby").get(parkingController.findNearbyParking);

router.route("/entry").post(parkingSessionController.recordEntry);

router.route("/exit").put(parkingSessionController.recordExit);

router
	.route("/parked-vehicles/:parkingId")
	.get(parkingSessionController.listParkedVehicles);

export default router;
