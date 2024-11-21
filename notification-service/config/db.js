import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected:", connectionInstance.connection.host);
  } catch (err) {
    console.log("Error connecting database:", err);
  }
};

export default connectDB;
