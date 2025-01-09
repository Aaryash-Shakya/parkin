import express from "express";
import logger from "../logger";
import userModel from "../models/user.model";
import parkingModel from "../models/parking.model";
import parkingRoutes from "./parking.route";

const router = express.Router();

/** GET /health-check - Check service health */
router.get("/health-check", (req: any, res: any) => {
	logger.log.info({
		message: `Health Check`,
		reqId: req.id,
		ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
		api: "/health-check",
		method: "GET",
	});
	res.send({ msg: "OK" });
});

router.get("/test", async (req: any, res: any) => {
	const user = await userModel.create({
		name: "test",
		phone: "123456789",
		password: "123456",
		type: "ADMIN",
	});
	await parkingModel.create({
		name: "Lazimpat Parking Area",
		address: "Lazimpat Road, Kathmandu",
		location: {
			type: "Point",
			coordinates: [27.697376, 85.297399],
		},
		capacity: "50",
		hourlyRates: [
			{
				vehicleType: "TWO_WHEELER",
				ratePerHour: 40,
				freeMinutes: 10,
			},
			{
				vehicleType: "FOUR_WHEELER",
				ratePerHour: 150,
				freeMinutes: 10,
			},
		],
		monthlyRates: null, // No monthly subscription available
		features: ["CCTV"],
		userId: user._id,
	});
	logger.log.info({
		message: `Test`,
		reqId: req.id,
		ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
		api: "/test",
		method: "GET",
	});
	res.send({ msg: "User Created" });
});

router.use("/parking", parkingRoutes);

export default router;
