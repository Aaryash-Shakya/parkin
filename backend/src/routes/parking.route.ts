import express from "express";
import parkingController from "../controllers/parking.controller";

const router = express.Router();

router.route("/add").post(parkingController.addParking);

router.route("/update/:parkingId").put(parkingController.updateParking);

router.route("/nearby").get(parkingController.findNearbyParking);

export default router;
