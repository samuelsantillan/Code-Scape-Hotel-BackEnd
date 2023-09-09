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

export const sendConfirmationEmail = async (req, res) => {
  const { nameHabitation, type, startDate, endDate, email } = req.body;
  console.log(req.body);
  try {
    const mailOptions = {
      from: "codescapehotel@gmail.com",
      to: email,
      subject: "Confirmación de reserva",
      html: emailTemplate(nameHabitation),
    };

    await transporter.sendMail(mailOptions);
    // console.log(`Correo electrónico enviado a ${email} con éxito.`);
    res.json({ message: `Correo electrónico enviado a ${email} con éxito.` });
    // res.status(201).json(nameHabitation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
