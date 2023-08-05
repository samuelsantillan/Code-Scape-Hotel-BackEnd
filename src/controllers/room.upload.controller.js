import Room from "../models/room.model.js";
import AvailableDate from "../models/available.date.model.js";

export const roomCreate = async (req, res) => {
  const {
    numberHabitation,
    type,
    nameHabitation,
    photo,
    price,
    description,
    availableDates,
  } = req.body;
  try {
    const numberHabitationFound = await Room.findOne({ numberHabitation });
    if (numberHabitationFound)
      return res
        .status(400)
        .json({ message: "The number habitation already exists" });
    const newRoom = new Room({
      numberHabitation,
      type,
      nameHabitation,
      price,
      description,
      photo,
    });
    console.log(newRoom);
    await newRoom.save();
    const availableDateDocuments = [];
    for (const date of availableDates) {
      const [startDate, endDate] = date;
      const availableDate = new AvailableDate({
        idRoom: newRoom._id,
        startDate,
        endDate,
      });
      console.log(availableDate);
      availableDateDocuments.push(availableDate);
    }
    await AvailableDate.insertMany(availableDateDocuments);
    res.send("room and available dates upload successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred");
  }
};
