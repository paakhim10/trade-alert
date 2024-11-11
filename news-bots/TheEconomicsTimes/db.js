import mongoose from "mongoose";

const connectDB = async () => {
  const connectionInstance = await mongoose.connect(
    "mongodb://localhost:27017/news"
  );
  console.log(`MongoDB Connected: ${connectionInstance.connection.host}`);
};

export default connectDB;
