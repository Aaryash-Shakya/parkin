import express from "express";
import logger from "../logger";
import userModel from "../models/user.model";

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
	await userModel.create({
		name: "test",
		phone: "123456789",
		password: "123456",
		type: "ADMIN",
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

export default router;
