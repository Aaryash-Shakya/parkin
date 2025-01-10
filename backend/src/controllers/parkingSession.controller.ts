import parkingModel from "../models/parking.model";
import logger from "../logger";
import vehicleModel from "../models/vehicle.model";
import parkingSessionModel from "../models/parking-session.model";

async function recordEntry(req: any, res: any, next: any) {
	const { parkingId, registrationNumber, size } = req.body;
	logger.log.info({
		message: `Inside parking controller to record entry for parking ${parkingId} and vehicle ${registrationNumber}`,
		reqId: req.id,
		ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
		api: "/parking/entry",
		method: "POST",
	});
	try {
		const parkingObj = await parkingModel.findById(parkingId);
		if (!parkingObj) {
			return res.status(404).json({ error: "Parking not found" });
		}

		let vehicleObj = await vehicleModel.findOne({
			registrationNumber: registrationNumber,
		});
		if (!vehicleObj) {
			vehicleObj = new vehicleModel({
				registrationNumber,
				size,
				vehicleType: size == 1 ? "TWO_WHEELER" : "FOUR_WHEELER",
				entryTime: new Date(),
			});
			await vehicleObj.save();
		}

		const parkingSessionObj = new parkingSessionModel({
			vehicleId: vehicleObj._id,
			parkingId: parkingObj._id,
			entryTime: new Date(),
			vehicleType: size == 1 ? "TWO_WHEELER" : "FOUR_WHEELER",
		});
		await parkingSessionObj.save();

		res.json({
			vehicle: vehicleObj,
			parkingSession: parkingSessionObj,
			parking: parkingObj,
		});
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

async function recordExit(req: any, res: any, next: any) {
	const { parkingId, registrationNumber } = req.body;
	logger.log.info({
		message: `Inside parking controller to record exit for parking ${parkingId} and vehicle ${registrationNumber}`,
		reqId: req.id,
		ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
		api: "/parking/exit",
		method: "PUT",
	});
	try {
		const parkingObj = await parkingModel.findById(parkingId);
		if (!parkingObj) {
			return res.status(404).json({ error: "Parking not found" });
		}

		const vehicleObj = await vehicleModel.findOne({
			registrationNumber: registrationNumber,
		});
		if (!vehicleObj) {
			return res.status(404).json({ error: "Vehicle not found" });
		}

		const parkingSessionObj = await parkingSessionModel.findOne({
			vehicleId: vehicleObj._id,
			parkingId: parkingObj._id,
			exitTime: null,
		});
		if (!parkingSessionObj) {
			return res
				.status(404)
				.json({ error: "Vehicle not found in parking" });
		}
		parkingSessionObj.exitTime = new Date();
		const durationInSeconds =
			(parkingSessionObj.exitTime.getTime() -
				parkingSessionObj.entryTime.getTime()) /
			1000;
		const durationInHours = Math.ceil(durationInSeconds / 3600);

		// reserved, under free minutes
		let status = "";

		if (!parkingId.hourlyRates) {
			parkingSessionObj.totalCost = 0;
			status = `Free Parking`;
		} else {
			const vehicleRates =
				parkingObj.hourlyRates &&
				parkingObj.hourlyRates[vehicleObj.vehicleType || "TWO_WHEELER"];

			if (!vehicleRates) {
				parkingSessionObj.totalCost = 0;
				status = `Free Parking`;
				await parkingSessionObj.save();

				return res.json({
					vehicle: vehicleObj,
					parkingSession: parkingSessionObj,
					parking: parkingObj,
				});
			}

			if (durationInSeconds < vehicleRates.freeMinutes * 60) {
				parkingSessionObj.totalCost = 0;
				status = `Under free minutes (${vehicleRates.freeMinutes} min)`;
			} else {
				parkingSessionObj.totalCost =
					durationInHours * vehicleRates.ratePerHour;
				status = "Charged";
			}
		}
		// if reservation cha bhaye "Free for reservation"
		await parkingSessionObj.save();

		res.json({
			vehicle: vehicleObj,
			parkingSession: parkingSessionObj,
			parking: parkingObj,
		});
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

export default { recordEntry, recordExit };
