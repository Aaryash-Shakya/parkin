import { model, Schema } from "mongoose";

enum UserType {
	ADMIN = "ADMIN",
	USER = "USER",
	OPERATOR = "OPERATOR",
}

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			enum: UserType,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

export default model("users", userSchema);
