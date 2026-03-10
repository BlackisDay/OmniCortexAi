import express from "express";
import { getTransactions, addTransaction } from "../controllers/financeController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
router.use(authMiddleware);

router.get("/", getTransactions);
router.post("/", addTransaction);

export default router;