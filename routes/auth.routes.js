import { Router } from "express";

const authRouter = Router();

authRouter.post("/sign-up", (req, res) => {
  res.send({ title: "Sign Up Page" });
});

authRouter.post("/sign-in", (req, res) => {
  res.send({ title: "Sign In Page" });
});

authRouter.post("/sign-out", (req, res) => {
  res.send({ title: "Sign Out Page" });
});

export default authRouter;
