import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  numberHabitation: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  nameHabitation: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  photos: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
  },
});


export default mongoose.model('Room', roomSchema);