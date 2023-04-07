import express from "express";
import {
  updateUsername,
  deleteUser,
  addsubscribedChannels,
  getsubscribedChannels,
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
router.post("/sub/:id", addsubscribedChannels);

//get subscribed channels
router.post("/getsub/:id", getsubscribedChannels);

//unsubscribe a channel
// router.post("/unsub/:id", verifyToken, unsubscribe);
router.post("/unsub/:id", unsubscribe);

//like a video
router.put("/like/:videoId", verifyToken, like);

//dislike a video
router.put("/dislike/:videoId", verifyToken, dislike);

export default router;
