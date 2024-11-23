import mongoose, { Schema } from "mongoose";

import connectDB from "../config/db.js"; // Import the database connection function

const { tradeAlertConnection } = await connectDB(); // Get the news connection

// Define the Notification Schema
const notificationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Export the Notification Model
export const Notification = tradeAlertConnection.model(
  "Notification",
  notificationSchema
);
