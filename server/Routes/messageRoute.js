import express from "express";
import {
  addMessages,
  getAllMessages,
} from "../controllers/messageController.js";
const router = express.Router();

//  router for adding the messages
router.post("/addmsg/", addMessages);
router.post("/getmsg/", getAllMessages);

export default router;
