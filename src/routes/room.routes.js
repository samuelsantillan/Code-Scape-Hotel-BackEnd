import { Router } from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  updateRoom,
  getRooms,
  profile,
  getRoomUserReservation,
} from "../controllers/admin.room.controller.js";

import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/roomCreate", createRoom);
router.delete("/roomDelete/:id", deleteRoom);
router.get("/roomGet", getRooms);
router.get("/roomGet/:id", getRoom);
router.put("/roomUpdate/:id", updateRoom);
router.get("/profile", auth, profile);
router.get("/getRoomUserReservation", getRoomUserReservation);
export default router;
