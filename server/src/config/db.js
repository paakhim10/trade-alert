import mongoose from "mongoose";
import AsyncHandler from "../utils/asyncHandler.js";
import logger from "../utils/logger.js";

const connectDB = AsyncHandler(async () => {
  const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
  logger.info(`MongoDB Connected: ${connectionInstance.connection.host}`);
});

export default connectDB;
