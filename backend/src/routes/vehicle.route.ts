import express from "express";
import vehicleController from "../controllers/vehicle.controller";

const router = express.Router();

router.route("add").post(vehicleController.addUnregisteredVehicle);

export default router;
