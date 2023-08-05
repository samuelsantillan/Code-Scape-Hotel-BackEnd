import mongoose from 'mongoose';

const availableDateSchema = new mongoose.Schema({
  idRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },

  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

export default mongoose.model('AvailableDate', availableDateSchema);