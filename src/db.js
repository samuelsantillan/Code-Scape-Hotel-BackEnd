
import mongoose from "mongoose";

const uri = "mongodb+srv://CodeScapeHotel:nbKFeprnm6ng4gB6@cluster0.zklmoo4.mongodb.net/?retryWrites=true&w=majority"

export const connectDB = async () => {
    try {
      await mongoose.connect(uri);
      console.log("db connected");
    } catch (e) {
      console.log(e);
    }
  };
  