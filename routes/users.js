import express from "express";
import {
  deleteUserById,
  getAllUser,
  getUserUsersById,
  updateUserById,
} from "../controllers/user.controller.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkAuthentication", verifyToken, (req, res, next) => {
//   res.send("you are logged in");
// });
// router.get("/checkUser/:id", verifyUser, (req, res, next) => {
//   res.send("hello user, you are logged in and you can delete your account");
// });
// router.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("hello admin, you are logged in and you can delete all account");
// });

// GET ONE BY ID
router.get("/:id", verifyUser, getUserUsersById);

// GET ALL HOTEL
router.get("/", verifyAdmin, getAllUser);

// update
router.patch("/:id", verifyUser, updateUserById);

// DELETE
router.delete("/:id", verifyUser, deleteUserById);
export default router;
