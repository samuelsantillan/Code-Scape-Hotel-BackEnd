import RoomUserReservation from "../models/room.user.reservation.model.js";
import nodemailer from "nodemailer";
import { emailTemplate } from "../views/email.js";

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "codescapehotel@gmail.com",
    pass: "yuocvgmxujkcqock",
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
    const roomUserReservation = await RoomUserReservation.find({ idRoom: id });
    res.json(roomUserReservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAllRoomUserReservation = async (req, res) => {
  try {
    const roomUserReservation = await RoomUserReservation.deleteMany();
    res.json(roomUserReservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const formatDateToSpanish = (date) => {
  const daysOfWeek = [
    "domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"
  ];
  
  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];

  const day = date.getDate();
  const dayOfWeek = daysOfWeek[date.getDay()];
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayOfWeek}, ${day} de ${month} de ${year}`;
};
export const sendConfirmationEmail = async (req, res) => {
  const { username, nameHabitation, type, startDate, endDate, email } = req.body;
  
  const formattedStartDate = formatDateToSpanish(new Date(startDate));
  const formattedEndDate = formatDateToSpanish(new Date(endDate));

  try {
    const mailOptions = {
      from: "codescapehotel@gmail.com",
      to: email,
      subject: "Confirmación de reserva",
      html: emailTemplate(username,nameHabitation, type, formattedStartDate, formattedEndDate),
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: `Correo electrónico enviado a ${email} con éxito.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
