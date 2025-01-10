import parkingModel from "../models/parking.model";
import logger from "../logger";

async function addParking(req: any, res: any, next: any) {
	const {
		name,
		address,
		lat,
		long,
		capacity,
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
		res.json(parkingObj);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

export default { addParking, updateParking, findNearbyParking };
