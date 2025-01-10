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
			type: Number,
			required: true,
		},
		reservedSlots: {
			type: Number,
			required: false,
		},
		maxHeightInMeter: {
			type: Number,
			required: false,
		},
		// hourlyRates null means free parking
		hourlyRates: {
			type: {
				TWO_WHEELER: {
					ratePerHour: { type: Number, required: true },
					freeMinutes: { type: Number, default: 0, required: true },
				},
				FOUR_WHEELER: {
					ratePerHour: { type: Number, required: true },
					freeMinutes: { type: Number, default: 0, required: true },
				},
			},
			required: false,
		},
		// monthlyRates null means no subscription
		monthlyRates: {
			type: {
				TWO_WHEELER: {
					ratePerMonth: { type: Number, required: true },
				},
				FOUR_WHEELER: {
					ratePerMonth: { type: Number, required: true },
				},
			},
			required: false,
		},
		// Extra features rendered as a small tag in the UI
		features: {
			type: [
				{
					type: String,
					enum: ["CCTV", "EV Charging", "Sheltered", "Free"],
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
