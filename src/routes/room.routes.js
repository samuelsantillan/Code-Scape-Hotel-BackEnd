import { Router } from "express";
import { roomCreate } from "../controllers/admin.room.controller.js";

const router = Router();

router.post("/roomCreate", roomCreate);

export default router;
