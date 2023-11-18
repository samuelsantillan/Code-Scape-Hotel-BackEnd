import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 1,
  },
  state :{
    type: Boolean,
    default: true,
  }
},{
  timestamps: true
});

export default mongoose.model(
  "User",
  userSchema
);
