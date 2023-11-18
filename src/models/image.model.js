import mongoose from "mongoose";

const Image = new mongoose.Schema({
  fileName: {
    type: String,
  },

  urlFile: {
    type: String,
  },
  dateUpload: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Image", Image);
