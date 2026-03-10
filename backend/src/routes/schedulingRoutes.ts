import express from "express";
import { getSchedules, addSchedule } from "../controllers/schedulingController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
router.use(authMiddleware);

router.get("/", getSchedules);
router.post("/", addSchedule);

export default router;