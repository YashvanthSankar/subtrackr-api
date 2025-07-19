import { NODEMAILER_MAILID, NODEMAILER_PASS } from "./env.js";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: NODEMAILER_MAILID,
    pass: NODEMAILER_PASS,
  },
});
