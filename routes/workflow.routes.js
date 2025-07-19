import { Router } from "express";
import { sendReminders } from "../controllers/workflow.controller.js";

const workflowRouter = Router();

// POST /api/workflows/subscription/reminder
workflowRouter.post("/subscription/reminder", sendReminders);

export default workflowRouter;
