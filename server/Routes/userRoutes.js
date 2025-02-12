import express from "express";
import {
  loginUser,
  registerUser,
  setAvatar,
  getAllUsers,
} from "../controllers/usersController.js";
const router = express.Router();

// user registration router
router.post("/register", registerUser);
// user login router
router.post("/login", loginUser);
// set avatar router
router.post("/avatar/:id", setAvatar);
//get alluser contacts data
router.get("/allusers/:id", getAllUsers);

export default router;
