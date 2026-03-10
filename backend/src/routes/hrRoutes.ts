import express from "express";
import { getEmployees, addEmployee } from "../controllers/employeeController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
router.use(authMiddleware);

// HR can manage employees
router.get("/", getEmployees);
router.post("/", addEmployee);

export default router;