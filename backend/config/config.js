require("dotenv").config();

const config = {
	env: process.env.NODE_ENV,
	port: process.env.PORT,
	jwtSecret: process.env.JWT_SECRET,
	authTokenExpiry: process.env.AUTH_TOKEN_EXPIRY_TIME_IN_DAYS,
	logFileLocation: process.env.LOG_FILE_LOCATION,
	frontEndUrl: process.env.FRONTEND_URL,
	mongoUri: process.env.MONGO_URI,
};

export default config;

