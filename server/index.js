import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute.js";
import commentRoutes from "./routes/commentRoute.js";
import authRoutes from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

const connect = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to DB!");
  } catch (err) {
    console.error(err);
  }
};

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/comment", commentRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  res.status(status).json({
    success: false,
    status: status,
    message: message,
  });
});

app.listen(5000, () => {
  connect();
  console.log("Running on port 5000!");
});
