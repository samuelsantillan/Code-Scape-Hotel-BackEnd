import roomUserReservation from "../models/room.user.reservation.model.js";

export const createRoomUserReservation = async (req, res) => {
  const { idRoom, idUser, dateStart, dateEnd } = req.body;
  try {
    const newRoomUserReservation = new roomUserReservation({
      idRoom,
      idUser,
      dateStart,
      dateEnd,
    });
    const roomUserReservationSaved = await newRoomUserReservation.save();
    res.status(201).json(roomUserReservationSaved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
