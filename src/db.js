
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/CodeScapeHotel");
      console.log("db connected");
    } catch (e) {
      console.log(e);
    }
  };
  