import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined in the environment variables.");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected...");
    return true;
  } catch (err) {
    if (err instanceof Error) {
      console.error("MongoDB connection error:", err.message);
    } else {
      console.error("MongoDB connection error:", err);
    }
    process.exit(1);
  }
};
