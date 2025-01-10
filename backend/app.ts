import express, {
	Request,
	Response,
	NextFunction,
	Application,
	ErrorRequestHandler,
} from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import methodOverride from "method-override";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import createHttpError from "http-errors";

import dotenv from "dotenv";
import routes from "./src/routes/index.route";
import * as uuid from "uuid";
import mongoose from "mongoose";
import config from "./config/config";

dotenv.config();

const app: Application = express();

// parse body params and attache them to req.body
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

app.use(cookieParser());
app.use(compression());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use((req: any, res: Response, next: NextFunction) => {
	req.id = uuid.v4();
	next();
});

// const limiter = rateLimit({
// 	windowMs: 15 * 60 * 1000, // 15 minutes
// 	max: 100, // limit each IP to 100 requests per windowMs
// });

app.use("/parkin/v1", routes);

// app.use('/tangible/v1/public', limiter);

app.use((req: Request, res: Response, next: NextFunction) => {
	next(new createHttpError.NotFound());
});

const errorHandler: ErrorRequestHandler = (
	err,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	res.status(err.statusCode || 500);
	res.send({
		status: err.statusCode || 500,
		success: false,
		error: err.error || err.message,
		stack: err.details?.body || err.headers,
		path: req.originalUrl,
		method: req.method,
	});
};

app.use(errorHandler);

const port = Number(process.env.PORT || 3000);

// connect to db
if (!config.mongoUri) {
	console.error("Mongo URI not found");
	process.exit(1);
}
mongoose
	.connect(config.mongoUri)
	.then(() =>
		app.listen(port, () => {
			console.log("Connected to db");
			console.log(`Server is running on port ${port}`);
		}),
	)
	.catch((err) => console.log(err));
