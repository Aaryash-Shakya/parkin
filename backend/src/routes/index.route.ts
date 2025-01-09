import express from "express";
import logger from "../logger";

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

export default router;

