import { model, Schema } from "mongoose";

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
		},
		totalCost: {
			type: Number,
			required: true,
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
