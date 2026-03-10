import express from "express";
import { getSubscription, updateSubscription } from "../controllers/subscriptionController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
router.use(authMiddleware);

router.get("/", getSubscription);
router.put("/", updateSubscription);

export default router;