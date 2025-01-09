import express from "express";

const router = express.Router();

/** GET /health-check - Check service health */
router.get("/health-check", (req: any, res: any) => res.send({ msg: "OK" }));

export default router;

