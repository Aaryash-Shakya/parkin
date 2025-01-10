import logger from "../logger";
import vehicleModel from "../models/vehicle.model";

async function addUnregisteredVehicle(req: any, res: any, next: any) {
	const { size, vehicleType, registrationNumber } = req.body;
	logger.log.info({
		message: `Inside vehicle controller to add unregistered vehicle`,
		reqId: req.id,
		ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
		api: "/vehicle/add",
		method: "POST",
	});
	if (!size || !vehicleType || !registrationNumber) {
		return res.status(400).json({ message: "All fields are required" });
	}
	try {
		const existingVehicle = await vehicleModel.findOne({
			registrationNumber,
		});
		if (existingVehicle) {
			return res
				.status(400)
				.json({
					message:
						"Vehicle with this registration number already exists",
				});
		}
		const newVehicle = new vehicleModel({
			size,
			vehicleType,
			registrationNumber,
		});
		await newVehicle.save();
		return res.status(201).json({ message: "Vehicle added successfully" });
	} catch (error) {
		logger.log.error({ reqId: req.id, message: error });
		return next(error);
	}
}

async function registerVehicleForUser(req: any, res: any, next: any) {
	const { size, vehicleType, registrationNumber, userId } = req.body;
	logger.log.info({
		message: `Inside vehicle controller to register vehicle for user`,
		reqId: req.id,
		ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
		api: "/user/vehicle/register",
		method: "POST",
	});
	try {
		if (!size || !vehicleType || !registrationNumber || !userId) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const existingVehicle = await vehicleModel.findOne({
			registrationNumber,
		});
		if (existingVehicle) {
			existingVehicle.userId = userId;
			existingVehicle.size = size;
			existingVehicle.vehicleType = vehicleType;
			await existingVehicle.save();
		} else {
			const newVehicle = new vehicleModel({
				size,
				vehicleType,
				registrationNumber,
				userId,
			});
			await newVehicle.save();
		}
		return res
			.status(201)
			.json({ message: "Vehicle registered successfully" });
	} catch (error) {
		logger.log.error({ reqId: req.id, message: error });
		return next(error);
	}
}

async function getVehiclesForUser(req: any, res: any, next: any) {
	const { userId } = req.query;
	logger.log.info({
		message: `Inside vehicle controller to get vehicles for user`,
		reqId: req.id,
		ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
		api: "/user/vehicles",
		method: "GET",
	});
	try {
		if (!userId) {
			return res.status(400).json({ message: "User ID is required" });
		}
		const vehicles = await vehicleModel.find({ userId });
		return res.status(200).json({ vehicles });
	} catch (error) {
		logger.log.error({ reqId: req.id, message: error });
		return next(error);
	}
}

export default {
	addUnregisteredVehicle,
	registerVehicleForUser,
	getVehiclesForUser,
};
