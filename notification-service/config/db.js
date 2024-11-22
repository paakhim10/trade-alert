import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    // Connect to the first database (Trade Alert)
    const tradeAlertConnection = mongoose.createConnection(
      process.env.MONGODB_URI_TRADE_ALERT,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    tradeAlertConnection.on("connected", () =>
      console.log(
        "Connected to Trade Alert Database:",
        process.env.MONGODB_URI_TRADE_ALERT
      )
    );

    // Connect to the second database (News)
    const newsConnection = mongoose.createConnection(
      process.env.MONGODB_URI_NEWS,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    newsConnection.on("connected", () =>
      console.log("Connected to News Database:", process.env.MONGODB_URI_NEWS)
    );

    // Return both connections for use in the app
    return { tradeAlertConnection, newsConnection };
  } catch (err) {
    console.error("Error connecting databases:", err);
    throw err; // Re-throw error for further handling
  }
};

export default connectDB;
