import Hotels from "../models/Hotels.js";
import Rooms from "../models/Rooms.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Rooms(req.body);
  try {
    const savedRoom = await newRoom.save();
    // const savedRoom = await Rooms.create(req.body);
    try {
      await Hotels.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json({ savedRoom });
  } catch (err) {
    next(err);
  }
};
export const getRoomById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const room = await Rooms.findById(id);

    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Rooms.find();

    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
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
  } catch (err) {
    next(err);
  }
};

export const updateRoomAvailability = async (req, res, next) => {
  try {
    // const { id } = req.params;
    await Rooms.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );

    res.status(200).json("Updated successfully");
  } catch (err) {
    next(err);
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
    } catch (err) {
      next(err);
    }

    res.status(200).json("deleted successfully");
  } catch (err) {
    next(err);
  }
};
