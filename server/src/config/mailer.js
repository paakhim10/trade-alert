import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.EMAIL_ID);
console.log(process.env.EMAIL_APP_PASSWORD);

const transporter = nodemailer.createTransport({
  service: "Gmail", // You can change this to other services if needed
  auth: {
    user: process.env.EMAIL_ID, // Replace with your email
    pass: process.env.EMAIL_APP_PASSWORD, // Replace with your email password or app password
  },
});

export default transporter;
