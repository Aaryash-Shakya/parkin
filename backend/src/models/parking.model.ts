import { model, Schema } from "mongoose";

const parkingSchema = new Schema(
	{
		// KEC Underground parking
		name: {
			type: String,
			required: true,
		},
		// Kalimati Marga (Beside TB hospital)
		address: {
			type: String,
			required: false,
		},
		// GEO JSON
		location: {
			type: {
				type: String,
				enum: ["Point"],
				required: true,
			},
			coordinates: {
				type: [Number],
				required: true,
			},
		},
		// capacity in terms of number of 2 wheelers. we can later convert it into 4 wheeler count depending using some ratio
		capacity: {
			type: String,
			required: true,
		},
		hourlyRates: [
			{
				vehicleType: {
					type: String,
					enum: ["TWO_WHEELER", "FOUR_WHEELER"],
					required: true,
				},
				ratePerHour: { type: Number, required: true },
				freeMinutes: { type: Number, default: 10 }, // Free time in minutes before charging starts
			},
		],
		monthlyRates: {
			type: [
				{
					vehicleType: {
						type: String,
						enum: ["TWO_WHEELER", "FOUR_WHEELER"],
						required: true,
					},
					ratePerMonth: { type: Number, required: true },
				},
			],
			required: false,
			default: null, // Allows monthlyRates to be null if subscription isn't available
		},
		// Extra features rendered as a small tag in the UI
		features: {
			type: [
				{
					type: String,
					enum: ["CCTV", "EV Charging", "Sheltered"],
				},
			],
			required: false,
			default: [],
		},
		// parking is registered by user who is the owner of Parking
		userId: {
			type: Schema.Types.ObjectId,
			ref: "users",
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

export default model("parkings", parkingSchema);
