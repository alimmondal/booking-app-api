import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotelById,
  getHotel,
  getHotels,
  updateHotelById,
} from "../controllers/hotel.controller.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const app = express();

const router = express.Router();

// create
router.post("/", verifyAdmin, createHotel);

// GET ONE BY ID
router.get("/find/:id", getHotel);

// GET ALL HOTEL
router.get("/", getHotels);

// update
router.patch("/:id", verifyAdmin, updateHotelById);

// DELETE
router.delete("/:id", verifyAdmin, deleteHotelById);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

export default router;
