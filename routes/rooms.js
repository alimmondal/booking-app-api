import express from "express";
import {
  createRoom,
  deleteRoomById,
  getAllRooms,
  getRoomById,
  updateRoomById,
} from "../controllers/room.controller.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const app = express();

const router = express.Router();

// create
router.post("/:hotelId", verifyAdmin, createRoom);

// GET ONE BY ID
router.get("/:id", getRoomById);

// GET ALL HOTEL
router.get("/", getAllRooms);

// update
router.patch("/:id", verifyAdmin, updateRoomById);

// DELETE
router.delete("/:id/:hotelId", verifyAdmin, deleteRoomById);

export default router;
