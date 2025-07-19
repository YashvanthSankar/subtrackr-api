import e, { Router } from "express";
import { sendReminder } from "../controllers/workflow.controller.js";

const workflowRouter = Router();

workflowRouter.post("/", sendReminder);

export default workflowRouter;
