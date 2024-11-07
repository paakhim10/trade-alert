import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_ID, // Replace with your email
    pass: process.env.EMAIL_APP_PASSWORD, // Replace with your email password or app password
  },
});

export default transporter;
