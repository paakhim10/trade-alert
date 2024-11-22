import mongoose, { Schema } from "mongoose";

// Assuming you have a newsConnection for the `news` database
import connectDB from "../config/db.js"; // Import the database connection function

const { newsConnection } = await connectDB(); // Get the news connection

// Define the News Schema
const newsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isProcessed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Exporting models connected to the `news` database
export const TheEconomicsTimes = newsConnection.model(
  "TheEconomicsTimes",
  newsSchema
);
export const TheHindustanTimes = newsConnection.model(
  "TheHindustanTimes",
  newsSchema
);
export const LiveMint = newsConnection.model("LiveMint", newsSchema);
export const CNBC = newsConnection.model("CNBC", newsSchema);
export const Tribune = newsConnection.model("Tribune", newsSchema);
export const PulseByZerodha = newsConnection.model(
  "PulseByZerodha",
  newsSchema
);
export const TheTimesOfIndia = newsConnection.model(
  "TheTimesOfIndia",
  newsSchema
);
export const TheIndianExpress = newsConnection.model(
  "TheIndianExpress",
  newsSchema
);
