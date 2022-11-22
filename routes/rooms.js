import express from "express";
import {
  createRoom,
  deleteRoomById,
  getAllRooms,
  getRoomById,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/room.controller.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const app = express();

const router = express.Router();

// create
router.post("/:hotelId", createRoom);

// GET ONE BY ID
router.get("/:id", getRoomById);
router.put("/availability/:id", updateRoomAvailability);

// DELETE
router.delete("/:id/:hotelId", verifyAdmin, deleteRoomById);

// GET ALL HOTEL
router.get("/", getAllRooms);

// update
router.patch("/:id", verifyAdmin, updateRoom);

export default router;
