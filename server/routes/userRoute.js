import express from "express";
import {
  updateUsername,
  deleteUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
} from "../controllers/userController.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//update username
router.put("/:id", verifyToken, updateUsername);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//subscribe to a channel
// router.post("/sub/:id", verifyToken, subscribe);
router.post("/sub/:id", subscribe);

//unsubscribe a channel
router.put("/unsub/:id", verifyToken, unsubscribe);

//like a video
router.put("/like/:videoId", verifyToken, like);

//dislike a video
router.put("/dislike/:videoId", verifyToken, dislike);

export default router;
