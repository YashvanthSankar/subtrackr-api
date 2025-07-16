import { Router } from "express";
import { signUp, signIn, signOut } from "../controllers/auth.controller.js";

const authRouter = Router();

// /api/v1/auth
// POST /api/v1/auth/sign-up
authRouter.post("/sign-up", (req, res) => {
  signUp;
});
// POST /api/v1/auth/sign-in
authRouter.post("/sign-in", (req, res) => {
  signIn;
});
// POST /api/v1/auth/sign-out
authRouter.post("/sign-out", (req, res) => {
  signOut;
});

export default authRouter;
