import Users from "../models/Users.js";

export const getUserUsersById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Users.findById(id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
export const getAllUser = async (req, res, next) => {
  try {
    const users = await Users.find();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const updateUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Users.findByIdAndUpdate(
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

export const deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Hotels.findByIdAndDelete(id);

    res.status(200).json("deleted successfully");
  } catch (error) {
    next(error);
  }
};
