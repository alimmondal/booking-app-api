import Users from "../models/Users.js";

export const updateUser = async (req, res, next) => {
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

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Users.findByIdAndDelete(id);

    res.status(200).json("deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
export const getUsers = async (req, res, next) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
