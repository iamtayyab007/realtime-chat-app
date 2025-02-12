import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./Routes/userRoutes.js";

// Load environment variables
dotenv.config();
// create express application
const app = express();

//Middleware to handle JSON data in requests
app.use(express.json());

//Enable CORS to allow cross-origin requests
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

// defining router middleware
app.use("/api/auth", userRoute);

// Connecting to mongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.log(err.message);
  });

// defining the PORT
const server = app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
