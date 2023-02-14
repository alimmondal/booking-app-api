import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
dotenv.config();
const app = express();

import authRoute from "../api/routes/auth.js";
import hotelRoute from "../api/routes/hotels.js";
import roomsRoute from "../api/routes/rooms.js";
import usersRoute from "../api/routes/users.js";

const MONGO = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1nyp1go.mongodb.net/?retryWrites=true&w=majority`;

const connect = async () => {
  try {
    await mongoose.connect(MONGO);
    console.log("db connected");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnect", () => {
  console.log("db disconnected");
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/rooms", roomsRoute);

// server;
const port = 8800 || 5000;

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something wrong";
  return res.status(500).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(port, () => {
  connect();
  console.log(`App is running on port ${port}`);
});
