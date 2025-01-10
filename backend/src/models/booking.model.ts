import { model, Schema } from "mongoose";

export type TBooking = {
	userId: string;
	parkingId: string;
	vehicleType: "TWO_WHEELER" | "FOUR_WHEELER";
	startTime: Date;
	endTime: Date;
	totalCost?: number;
	parkingSessionId?: string;
	status?: "CONFIRMED" | "CANCELLED" | "COMPLETED";
};

const bookingSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "users",
			required: true,
		},
		parkingId: {
			type: Schema.Types.ObjectId,
			ref: "parkings",
			required: true,
		},
		vehicleType: {
			type: String,
			enum: ["TWO_WHEELER", "FOUR_WHEELER"],
			required: true,
		},
		startTime: {
			type: Date,
			required: true,
		},
		endTime: {
			type: Date,
			required: true,
		},
		totalCost: {
			type: Number,
			required: false,
		},
		parkingSessionId: {
			type: Schema.Types.ObjectId,
			ref: "parkingSessions",
			required: false,
		},
		status: {
			type: String,
			enum: ["RESERVED", "CANCELLED", "COMPLETED"],
			default: "RESERVED",
		},
	},
	{
		timestamps: true,
	},
);

export default model("bookings", bookingSchema);
