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
import AvailableDate from "../models/available.date.model.js";
import Room from "../models/room.model.js";
import multer from "multer";
import { auth } from "../middlewares/auth.middleware.js";
import { storage } from "../libs/multer.js";
import Image from "../models/image.model.js";
const uploader = multer({ storage: storage });
const router = Router();
import { IMAGE_URL } from "../config.js";

router.post("/upload", uploader.single("image"), async (req, res) => {
  const { file, body } = req;

  if (file && body) {
    const newImage = new Image({
      fileName: file.filename,
      urlFile: `${IMAGE_URL}${file.filename}.jpg`,
    });
    await newImage.save();
    res.json(newImage);
  }
});

router.post(
  "/roomCreateWithPhotos",
  uploader.single("image"),
  async (req, res) => {
    const { file, body } = req;
    const {
      numberHabitation,
      type,
      nameHabitation,
      photos,
      price,
      description,
      availableDates,
    } = JSON.parse(req.body.room);
    if (file && body) {
      try {
        const numberHabitationFound = await Room.findOne({ numberHabitation });
        if (numberHabitationFound)
          return res
            .status(400)
            .json({ message: "The number habitation already exists" });
        const newRoom = new Room({
          numberHabitation,
          type,
          nameHabitation,
          price,
          description,
          photos: `${IMAGE_URL}${file.filename}`,
        });
        console.log(newRoom);
        await newRoom.save();
        const availableDateDocuments = [];

        for (const date of availableDates) {
          const [startDate, endDate] = date;
          const availableDate = new AvailableDate({
            idRoom: newRoom._id,
            startDate,
            endDate,
          });
          console.log(availableDate);
          console.log(startDate);
          availableDateDocuments.push(availableDate);
        }
        await AvailableDate.insertMany(availableDateDocuments);
        res.send("room and available dates upload successfully");
      } catch (error) {
        console.log(error);
        res.status(500).send("An error ocurred");
      }
    }
  }
);

router.get("/rooms", getRooms);

router.put(
  "/roomUpdateWithPhotos/:id",
  uploader.single("image"),
  async (req, res) => {
    const {
      numberHabitation,
      type,
      nameHabitation,
      photos,
      price,
      description,
      availableDates,
    } = JSON.parse(req.body.room);
    console.log(req.body);
    const { file, body } = req;
    console.log("ESTOY ACAAAAAAAAAAAAAAAAAA");
    console.log(JSON.parse(req.body.room));
    console.log(file);
    console.log(req.params.id);

    if (file && body) {
      try {
        const roomUpdated = await Room.findOneAndUpdate(
          { _id: req.params.id },
          {
            numberHabitation,
            type,
            nameHabitation,
            photos: `${IMAGE_URL}${file.filename}`,
            price,
            description,
            availableDates,
          },
          { new: true }
        );
        return res.json(roomUpdated);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }
  }
);
router.post("/roomCreate", createRoom);
router.delete("/roomDelete/:id", deleteRoom);
router.get("/roomGet", getRooms);
router.get("/roomGet/:id", getRoom);
router.put("/roomUpdate/:id", updateRoom);
router.get("/profile", auth, profile);
router.get("/getRoomUserReservation", getRoomUserReservation);
export default router;
