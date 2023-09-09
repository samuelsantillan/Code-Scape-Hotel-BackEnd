import RoomUserReservation from "../models/room.user.reservation.model.js"; 
import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'codescapehotel@gmail.com',
      pass: 'yuocvgmxujkcqock',
  },
});

export const createRoomUserReservation = async (req, res) => {
  const { idRoom, idUser, startDate, endDate } = req.body; 
  console.log(req.body);
  try {
    const newRoomUserReservation = new RoomUserReservation({
      idRoom: idRoom,
      idUser: idUser,
      startDate: startDate, 
      endDate: endDate,
    });
    const roomUserReservationSaved = await newRoomUserReservation.save();
    await sendConfirmationEmail(req.user.email, roomUserReservationSaved);
    console.log(roomUserReservationSaved);

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

const sendConfirmationEmail = async (userEmail, reservationDetails) => {
  try {
    const mailOptions = {
      from: "codescapehotel@gmail.com",
      to: userEmail,
      subject: "Confirmación de reserva",
      text: `¡Tu reserva se ha confirmado!\n
        Detalles de la reserva:\n
        - Habitación: ${reservationDetails.idRoom}\n
        - Usuario: ${reservationDetails.idUser}\n
        - Fecha de inicio: ${reservationDetails.startDate}\n
        - Fecha de finalización: ${reservationDetails.endDate}\n`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Correo electrónico enviado a ${userEmail} con éxito.`);
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
  }
};
