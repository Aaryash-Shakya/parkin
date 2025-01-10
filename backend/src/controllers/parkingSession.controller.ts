import parkingModel, { TParking } from "../models/parking.model";
import logger from "../logger";
import vehicleModel, { TVehicle } from "../models/vehicle.model";
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

		if (!parkingObj.hourlyRates) {
			parkingSessionObj.totalCost = 0;
			parkingSessionObj.status = `Free Parking`;
		} else {
			const vehicleRates =
				parkingObj.hourlyRates[vehicleObj.vehicleType || "TWO_WHEELER"];

			if (!vehicleRates) {
				parkingSessionObj.totalCost = 0;
				parkingSessionObj.status = `Free Parking`;
				await parkingSessionObj.save();

				return res.json({
					vehicle: vehicleObj,
					parkingSession: parkingSessionObj,
					parking: parkingObj,
				});
			}

			if (durationInSeconds < vehicleRates.freeMinutes * 60) {
				parkingSessionObj.totalCost = 0;
				parkingSessionObj.status = `Under free minutes (${vehicleRates.freeMinutes} min)`;
			} else {
				parkingSessionObj.totalCost =
					durationInHours * vehicleRates.ratePerHour;
				parkingSessionObj.status = "Charged";
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

async function findParkedVehiclesOfUser(req: any, res: any, next: any) {
	const { userId } = req.params;
	logger.log.info({
		message: `Inside parking controller to find currently parked vehicles`,
		reqId: req.id,
		ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
		api: "/user/parked-vehicles",
		method: "GET",
	});
	try {
		const vehicleObjs = await vehicleModel.find({
			userId,
		});
		let vehicleIds: any[] = [];
		if (vehicleObjs.length > 0) {
			vehicleIds = vehicleObjs.map((vo) => vo._id);
		}

		const parkingSessions = await parkingSessionModel
			.find({
				exitTime: null,
				vehicleId: { $in: vehicleIds },
			})
			.populate("parkingId")
			.populate("vehicleId");

		// calculate price
		parkingSessions.forEach((parkingSession) => {
			const currentDate = new Date();
			const durationInSeconds =
				(currentDate.getTime() - parkingSession.entryTime.getTime()) /
				1000;
			const durationInHours = Math.ceil(durationInSeconds / 3600);

			// reserved, under free minutes
			const parkingObj: TParking =
				parkingSession.parkingId as unknown as TParking;
			const vehicleObj: TVehicle =
				parkingSession.vehicleId as unknown as TVehicle;
			if (!parkingObj.hourlyRates) {
				parkingSession.totalCost = 0;
				parkingSession.status = `Free Parking`;
			} else {
				const vehicleRates =
					parkingObj.hourlyRates[
						vehicleObj.vehicleType || "TWO_WHEELER"
					];

				if (!vehicleRates) {
					parkingSession.totalCost = 0;
					parkingSession.status = `Free Parking`;

					return res.json({
						vehicle: vehicleObj,
						parkingSession: parkingSession,
						parking: parkingObj,
					});
				}

				if (durationInSeconds < vehicleRates.freeMinutes * 60) {
					parkingSession.totalCost = 0;
					parkingSession.status = `Under free minutes (${vehicleRates.freeMinutes} min)`;
				} else {
					parkingSession.totalCost =
						durationInHours * vehicleRates.ratePerHour;
					parkingSession.status = "Charging";
				}
			}
		});

		res.json({
			vehicles: vehicleObjs,
			parkingSessions,
		});
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

export default { recordEntry, recordExit, findParkedVehiclesOfUser };
