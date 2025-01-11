import parkingModel, { TParking } from "../models/parking.model";
import logger from "../logger";
import parkingSessionModel from "../models/parking-session.model";

async function addParking(req: any, res: any, next: any) {
	const {
		name,
		address,
		lat,
		long,
		capacity,
		maxHeightInMeter,
		features,
		hourlyRates,
		monthlyRates,
		userId,
	} = req.body;
	logger.log.info({
		message: `Inside parking controller to add parking ${name}`,
		reqId: req.id,
		ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
		api: "/parking/add",
		method: "POST",
	});
	try {
		const parkingObj = new parkingModel();
		if (userId) parkingObj.userId = userId;
		if (name) parkingObj.name = name;
		if (address) parkingObj.address = address;
		if (lat && long)
			parkingObj.location = {
				type: "Point",
				coordinates: [parseFloat(long), parseFloat(lat)],
			};
		if (capacity) parkingObj.capacity = parseInt(capacity);
		if (maxHeightInMeter)
			parkingObj.maxHeightInMeter = parseFloat(maxHeightInMeter);
		if (features) parkingObj.features = features;
		if (hourlyRates) parkingObj.hourlyRates = hourlyRates;
		if (monthlyRates) parkingObj.monthlyRates = monthlyRates;
		await parkingObj.save();
		res.json(parkingObj);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

async function updateParking(req: any, res: any, next: any) {
	const { parkingId } = req.params;
	const {
		name,
		address,
		lat,
		long,
		capacity,
		maxHeightInMeter,
		features,
		hourlyRates,
		monthlyRates,
	} = req.body;
	logger.log.info({
		message: `Inside parking controller to update parking ${name}`,
		reqId: req.id,
		ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
		api: "/parking/update/:parkingId",
		method: "PUT",
	});
	try {
		const parkingObj = await parkingModel.findById(parkingId);
		if (!parkingObj) {
			return res.status(404).json({ error: "Parking not found" });
		}
		if (name) parkingObj.name = name;
		if (address) parkingObj.address = address;
		if (lat && long)
			parkingObj.location = {
				type: "Point",
				coordinates: [parseFloat(long), parseFloat(lat)],
			};
		if (capacity) parkingObj.capacity = parseInt(capacity);
		if (maxHeightInMeter)
			parkingObj.maxHeightInMeter = parseFloat(maxHeightInMeter);
		if (features) parkingObj.features = features;
		if (hourlyRates) parkingObj.hourlyRates = hourlyRates;
		if (monthlyRates) parkingObj.monthlyRates = monthlyRates;
		await parkingObj.save();
		res.json(parkingObj);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

async function findNearbyParking(req: any, res: any, next: any) {
	const { lat, long, radiusInKm } = req.query;
	logger.log.info({
		message: `Inside parking controller to find nearby parkings ${lat} ${long}`,
		reqId: req.id,
		ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
		api: "/parking/nearby",
		method: "GET",
	});
	try {
		if (!lat || !long || !radiusInKm) {
			return res.status(400).json({ error: "Missing query" });
		}
		const EARTH_RADIUS_KILOMETER = 6378.1;

		type TParkingWithAvailableSlots = TParking & {
			_id: string;
			availableSlots: number;
		};

		const parkingObj = await parkingModel.find({
			location: {
				// $near: {
				// 	$geometry: {
				// 		type: "Point",
				// 		coordinates: [parseFloat(long), parseFloat(lat)],
				// 	},
				// 	$maxDistance: radius,
				// 	$minDistance: 0,
				// },
				$geoWithin: {
					$centerSphere: [
						[parseFloat(long), parseFloat(lat)],
						parseFloat(radiusInKm) / EARTH_RADIUS_KILOMETER,
					],
				},
			},
		});

		// count available slots
		const processedParkings = await Promise.all(
			parkingObj.map(async (parking) => {
				const parkedVehicles = await parkingSessionModel.find({
					parkingId: parking._id,
					exitTime: null,
				});
				let usedSlots = 0;
				if (parking.reservedSlots) {
					usedSlots += parking.reservedSlots;
				}
				parkedVehicles.forEach((parkedVehicle) => {
					if (parkedVehicle.vehicleType === "TWO_WHEELER") {
						usedSlots += 1;
					} else if (parkedVehicle.vehicleType === "FOUR_WHEELER") {
						usedSlots += 2;
					}
				});
				return {
					...parking.toObject(),
					availableSlots: parking.capacity - usedSlots,
				};
			}),
		);

		console.log(processedParkings);
		res.json(processedParkings);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

async function listParkings(req: any, res: any, next: any) {
	logger.log.info({
		message: `Inside parking controller to list parkings`,
		reqId: req.id,
		ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
		api: "/parking/parkings",
		method: "GET",
	});
	try {
		const parkingObj = await parkingModel.find();
		res.json(parkingObj);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

async function listParkingsForUser(req: any, res: any, next: any) {
	const { userId } = req.params;
	logger.log.info({
		message: `Inside parking controller to list parkings for user ${userId}`,
		reqId: req.id,
		ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
		api: "/parking/parkings/:userId",
		method: "GET",
	});
	try {
		const parkingObj = await parkingModel.find({ userId });
		res.json(parkingObj);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

async function findParkingById(req: any, res: any, next: any) {
	const { parkingId } = req.params;
	logger.log.info({
		message: `Inside parking controller to find parking by id ${parkingId}`,
		reqId: req.id,
		ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
		api: "/parking/show/:parkingId",
		method: "GET",
	});
	try {
		const parkingObj = await parkingModel.findById(parkingId);
		if (!parkingObj) {
			return res.status(404).json({ error: "Parking not found" });
		}
		const parkedVehicles = await parkingSessionModel.find({
			parkingId: parkingObj._id,
			exitTime: null,
		});
		let usedSlots = 0;
		if (parkingObj.reservedSlots) {
			usedSlots += parkingObj.reservedSlots;
		}
		parkedVehicles.forEach((parkedVehicle) => {
			if (parkedVehicle.vehicleType === "TWO_WHEELER") {
				usedSlots += 1;
			} else if (parkedVehicle.vehicleType === "FOUR_WHEELER") {
				usedSlots += 2;
			}
		});
		res.json({
			...parkingObj.toObject(),
			availableSlots: parkingObj.capacity - usedSlots,
		});
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

export default {
	addParking,
	updateParking,
	findNearbyParking,
	listParkings,
	listParkingsForUser,
	findParkingById,
};
