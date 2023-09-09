import { Router } from "express";

import { createRoomUserReservation, getRoomsUserReservation , getRoomUserReservation, deleteAllRoomUserReservation, sendConfirmationEmail } from "../controllers/room.user.reservation.controller.js";
import { getAvailableDates, getAvailableDate} from "../controllers/available.date.controller.js";


const router = Router();

router.post("/createRoomUserReservation", createRoomUserReservation);

router.get("/getAvailableDates", getAvailableDates);

router.get('/getAvailableDate/:id', getAvailableDate);

router.get("/roomUsersReservations", getRoomsUserReservation);

router.get("/roomUserReservation/:id", getRoomUserReservation);

router.delete("/deleteAllRoomUserReservation", deleteAllRoomUserReservation);

router.post("/sendConfirmationEmail", sendConfirmationEmail);

export default router;