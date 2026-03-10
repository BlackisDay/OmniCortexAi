import express from "express";
import { getChats, sendChat } from "../controllers/chatController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
router.use(authMiddleware);

router.get("/", getChats);
router.post("/", sendChat);

export default router;