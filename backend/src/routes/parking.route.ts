import express from "express";
import parkingController from "../controllers/parking.controller";
import parkingSessionController from "../controllers/parkingSession.controller";

const router = express.Router();

router.route("/add").post(parkingController.addParking);

router.route("/update/:parkingId").put(parkingController.updateParking);

router.route("/nearby").get(parkingController.findNearbyParking);

router.route("/entry").post(parkingSessionController.recordEntry);

router.route("/exit").put(parkingSessionController.recordExit);

export default router;
