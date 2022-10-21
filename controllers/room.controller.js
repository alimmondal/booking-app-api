import Hotels from "../models/Hotels.js";
import Rooms from "../models/Rooms.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  // const newRoom = new Rooms(req.body);
  try {
    // const savedRoom = await newRoom.save();
    const savedRoom = await Rooms.create(req.body);
    try {
      await Hotels.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json({ status: "Success", data: savedRoom });
  } catch (error) {
    next(error);
  }
};
export const getRoomById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const room = await Rooms.findById(id);

    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};
export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Rooms.find();

    res.status(200).json({ status: "Success", data: rooms });
  } catch (error) {
    next(error);
  }
};

export const updateRoomById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedRoom = await Rooms.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
      }
    );

    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

export const deleteRoomById = async (req, res, next) => {
  const hotelId = req.params.hotelId;

  try {
    const { id } = req.params;
    const result = await Rooms.findByIdAndDelete(id);

    try {
      await Hotels.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      next(error);
    }

    res.status(200).json("deleted successfully");
  } catch (error) {
    next(error);
  }
};
