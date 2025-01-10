import logger from "../logger";
import bookingModel from "../models/booking.model";

async function createBooking(req: any, res: any, next: any) {
	const {
		userId,
		parkingId,
		vehicleType,
		registrationNumber,
		startTime,
		endTime,
	} = req.body;
	logger.log.info({
		message: `Inside booking controller to book parking session`,
		reqId: req.id,
		ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
		api: "/booking",
		method: "POST",
	});
	try {
		if (!userId || !parkingId || !vehicleType || !startTime || !endTime) {
			return res.status(400).json({ message: "All fields are required" });
		}
		const newBooking = new bookingModel({
			userId,
			parkingId,
			vehicleType,
			registrationNumber,
			startTime,
			endTime,
		});
		await newBooking.save();
		return res.status(201).json({
			message: "Booking created successfully",
			booking: newBooking,
		});
	} catch (error) {
		logger.log.error({ reqId: req.id, message: error });
		return next(error);
	}
}

async function listBookings(req: any, res: any, next: any) {
	const { userId } = req.params;
	logger.log.info({
		message: `Inside booking controller to list bookings`,
		reqId: req.id,
		ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
		api: "/bookings",
		method: "GET",
	});
	try {
		const bookings = await bookingModel.find({
			userId,
		});
		return res.status(200).json({ bookings });
	} catch (error) {
		logger.log.error({ reqId: req.id, message: error });
		return next(error);
	}
}

export default {
	createBooking,
	listBookings,
};
