import { Router } from "express";

import { createRoomUserReservation } from "../controllers/room.user.reservation.controller.js";
import { getAvailableDates, getAvailableDate} from "../controllers/available.date.controller.js";


const router = Router();

router.post("/createRoomUserReservation", createRoomUserReservation);

router.get("/getAvailableDates", getAvailableDates);

router.get('/getAvailableDate/:id', getAvailableDate);

export default router;