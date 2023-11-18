import Room from "../models/room.model.js";
import AvailableDate from "../models/available.date.model.js";
import roomUserReservation from "../models/room.user.reservation.model.js";
import User from "../models/user.model.js";
export const profile = async (req, res) => {
  console.log(req.user);
  res.send("profile");
}

export const getRoomUserReservation = async (req, res) => {
  try {
    const roomUserReservation = await roomUserReservation.find();
    res.json(roomUserReservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRooms = async (req, res) => {
  console.log(req.user)
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getRoom = async (req, res) => {
  try {
    const rooms = await Room.findById(req.params.id);
    if(!rooms) return res.status(404).send("La habitacion no existe");
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await Room.findOneAndDelete({ _id: req.params.id });
    // Utiliza el objeto de filtro { _id: req.params.id } para encontrar y eliminar la habitación por su ID
    console.log(req.params.id);
    if (!deletedRoom) {
      return res.status(404).send("La habitacion no existe");
    }
    res.send("La habitacion se ha eliminado correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


export const createRoom = async (req, res) => {
  const {
    numberHabitation,
    type,
    nameHabitation,
    photos,
    price,
    description,
    availableDates,
  } = req.body;
  console.log(req.body);
  try {
    const numberHabitationFound = await Room.findOne({ numberHabitation });
    if (numberHabitationFound)
      return res
        .status(400)
        .json({ message: "El numero de la habitacion ya existe" });
    const newRoom = new Room({
      numberHabitation,
      type,
      nameHabitation,
      price,
      description,
      photos,
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
      console.log(startDate);
      availableDateDocuments.push(availableDate);
    }
    await AvailableDate.insertMany(availableDateDocuments);
    res.send("La habitacion se ha creado correctamente");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al crear la habitacion");
  }
};

export const updateRoom = async (req, res) => {
  try {
    const {
      numberHabitation,
      type,
      nameHabitation,
      photos,
      price,
      description,
      availableDates,
    } = req.body;
    const roomUpdated = await Room.findOneAndUpdate(
      { _id: req.params.id },
      {
        numberHabitation,
        type,
        nameHabitation,
        photos,
        price,
        description,
        availableDates,
      },
      { new: true }
    );
    return res.json(roomUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
