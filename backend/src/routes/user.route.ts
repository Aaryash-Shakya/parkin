import express from "express";
import userController from "../controllers/user.controller";

const router = express.Router();

router.route("/register").post(userController.registerUser);

router.route("/login").post(userController.loginUser);

export default router;
