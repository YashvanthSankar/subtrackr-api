import nodemailer from "nodemailer";
import { NODEMAILER_MAILID } from "../config/env.js";
import { NODEMAILER_PASS } from "../config/env.js";

// configure transporter with your email service
const transporter = nodemailer.createTransport({
  service: "gmail", // or use 'SendGrid', 'Mailgun', etc.
  auth: {
    user: NODEMAILER_MAILID, // your email (e.g., myemail@gmail.com)
    pass: NODEMAILER_PASS, // your password or app password
  },
});

// export your function
export async function sendReminderEmail(to, subject, text) {
  try {
    const info = await transporter.sendMail({
      from: `"My App" <${NODEMAILER_MAILID}>`, // sender address
      to, // receiver
      subject, // subject line
      text, // plain text body
      // html: "<b>Hello world?</b>",               // optional html body
    });
    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
