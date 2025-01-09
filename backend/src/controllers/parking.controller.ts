import parkingModel from "../models/parking.model";
import logger from "../logger";

async function findNearbyParking(req: any, res: any, next: any) {
	const { lat, long, radiusInKm } = req.query;
	logger.log.info({
		message: `Inside parking controller to find nearby parkings ${lat} ${long}`,
		reqId: req.id,
		ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
		api: "/nearby",
		method: "GET",
	});
	try {
		if (!lat || !long || !radiusInKm) {
			return res.status(400).json({ error: "Missing query" });
		}
		const EARTH_RADIUS_KILOMETER = 6378.1;
		const location = {
			type: "Point",
			coordinates: [parseFloat(long), parseFloat(lat)],
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
		res.json(parkingObj);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

export default { findNearbyParking };
