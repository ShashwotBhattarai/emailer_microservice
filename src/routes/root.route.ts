import express, { Router } from "express";
import HealthController from "../controllers/healthCheck.controller";
const router: Router = express.Router();

const checkHealth = new HealthController().checkHealth;

router.get("/health", checkHealth);

export default router;
