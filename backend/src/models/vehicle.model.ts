import { model, Schema } from "mongoose";

const vehicleSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			required: false,
			ref: "users",
		},
		// in terms of 2 wheeler (1 unit = 1 bike)
		size: {
			type: Number,
			required: true,
		},
		vehicleType: {
			type: String,
			enum: ["TWO_WHEELER", "FOUR_WHEELER"],
			required: true,
		},
		registrationNumber: {
			type: String,
			required: false,
			unique: true,
		},
	},
	{
		timestamps: true,
	},
);

export default model("vehicles", vehicleSchema);
