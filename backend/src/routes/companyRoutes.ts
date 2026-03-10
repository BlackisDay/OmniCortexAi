import express from "express";
import { getCompany, updateCompany } from "../controllers/companyController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
router.use(authMiddleware);

router.get("/", getCompany);
router.put("/", updateCompany);

export default router;