import logger from "../logger";
import User from "../models/user.model";
import bcrypt from "bcrypt";

async function registerUser(req: any, res: any, next: any) {
	const { name, phone, password, type } = req.body;

	logger.log.info({
		message: `Inside user controller to register user`,
		reqId: req.id,
		ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
		api: "/register",
		method: "POST",
	});
	if (!name || !phone || !password || !type) {
		return res.status(400).json({ message: "All fields are required" });
	}

	try {
		const existingUser = await User.findOne({ phone });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			name,
			phone,
			password: hashedPassword,
			type,
		});

		await newUser.save();

		return res
			.status(201)
			.json({ message: "User registered successfully" });
	} catch (error) {
		return res.status(500).json({ message: "Server error", error });
	}
}

async function loginUser(req: any, res: any, next: any) {
	const { phone, password } = req.body;

	logger.log.info({
		message: `Inside user controller to login user`,
		reqId: req.id,
		ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
		api: "/login",
		method: "POST",
	});
	if (!phone || !password) {
		return res.status(400).json({ message: "All fields are required" });
	}

	try {
		const user = await User.findOne({ phone });
		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ message: "Invalid password" });
		}

		return res
			.status(200)
			.json({ message: "User logged in successfully", data: user });
	} catch (error) {
		return res.status(500).json({ message: "Server error", error });
	}
}

export default {
	registerUser,
	loginUser,
};
