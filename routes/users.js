import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
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

// update
router.patch("/:id", verifyUser, updateUser);

// DELETE
router.delete("/:id", deleteUser);

// GET ONE BY ID
router.get("/:id", verifyUser, getUser);

// GET ALL users
router.get("/", getUsers);

export default router;
