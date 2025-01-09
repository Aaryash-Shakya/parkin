import express from "express";
import parkingController from "../controllers/parking.controller";

const router = express.Router();

router.route("/nearby").get(parkingController.findNearbyParking);

export default router;
