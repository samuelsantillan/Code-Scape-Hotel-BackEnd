import { Router } from "express";

import { createRoomUserReservation } from "../controllers/room.user.reservation.controller.js";

const router = Router();

router.post("/createRoomUserReservation", createRoomUserReservation);