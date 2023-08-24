import availableDateSchema from "../models/available.date.model.js";

export const getAvailableDates = async (req, res) => {
  try {
    const availableDates = await availableDateSchema.find();
    res.status(200).json(availableDates);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAvailableDate = async (req, res) => {
  const { id } = req.params;
  try {
    const availableDate = await availableDateSchema.find({ idRoom : id});
    res.status(200).json(availableDate);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
