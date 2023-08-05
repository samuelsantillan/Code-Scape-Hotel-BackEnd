import { Router } from "express";
import { roomCreate } from "../controllers/room.upload.controller.js";

const router = Router();

router.post("/roomUpload", roomCreate);

export default router;
