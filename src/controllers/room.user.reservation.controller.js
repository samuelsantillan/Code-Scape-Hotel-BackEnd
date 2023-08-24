import RoomUserReservation from "../models/room.user.reservation.model.js"; // Cambia el nombre aquí


export const createRoomUserReservation = async (req, res) => {
  const { idRoom, idUser, startDate, endDate } = req.body; // Actualiza aquí
  console.log(req.body)
  try {
    const newRoomUserReservation = new RoomUserReservation({
      idRoom: idRoom,
      idUser: idUser,
      startDate: startDate, // Actualiza aquí
      endDate: endDate, // Actualiza aquí
    });
    const roomUserReservationSaved = await newRoomUserReservation.save();
    res.status(201).json(roomUserReservationSaved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getRoomsUserReservation = async (req, res) => {
  try {
    const users = await RoomUserReservation.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getRoomUserReservation = async (req, res) => {
  const { id } = req.params;
  try {
    const roomUserReservation = await RoomUserReservation.find({ idRoom : id });
    res.json(roomUserReservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAllRoomUserReservation =   async (req, res) => {
  try {
    const roomUserReservation = await RoomUserReservation.deleteMany();
    res.json(roomUserReservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
