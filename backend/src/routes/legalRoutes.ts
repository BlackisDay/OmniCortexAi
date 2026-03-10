import express from "express";
import { getLegalDocs, uploadLegalDoc } from "../controllers/legalController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
router.use(authMiddleware);

router.get("/", getLegalDocs);
router.post("/", uploadLegalDoc);

export default router;