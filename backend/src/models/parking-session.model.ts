import { model, Schema } from "mongoose";

export type TParkingSession = {
	parkingId: string;
	vehicleId: string;
	entryTime: Date;
	exitTime?: Date;
	totalCost?: number;
	status?: string;
	vehicleType: "TWO_WHEELER" | "FOUR_WHEELER";
};

const parkingSessionSchema = new Schema(
	{
		parkingId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "parkings",
		},
		vehicleId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "vehicles",
		},
		entryTime: {
			type: Date,
			required: true,
		},
		exitTime: {
			type: Date,
			required: false,
		},
		totalCost: {
			type: Number,
			required: false,
		},
		status: {
			type: String,
			required: false,
		},
		vehicleType: {
			type: String,
			enum: ["TWO_WHEELER", "FOUR_WHEELER"],
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

export default model("parkingSessions", parkingSessionSchema);
