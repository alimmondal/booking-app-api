import Hotels from "../models/Hotels.js";
import Rooms from "../models/Rooms.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotels(req.body);
  try {
    const savedHotel = await newHotel.save();
    // const savedHotel = await Hotels.create(req.body);

    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};
export const getHotel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Hotels.findById(id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotels.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);

    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotels.countDocuments({ city: city });
      })
    );

    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotels.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotels.countDocuments({ type: "apartment" });
    const resortCount = await Hotels.countDocuments({ type: "resort" });
    const villaCount = await Hotels.countDocuments({ type: "villa" });
    const cabinCount = await Hotels.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (error) {
    next(error);
  }
};

export const updateHotelById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Hotels.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
      }
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteHotelById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Hotels.findByIdAndDelete(id);

    res.status(200).json("deleted successfully");
  } catch (error) {
    next(error);
  }
};
export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotels.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Rooms.findById(room);
      })
    );

    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
