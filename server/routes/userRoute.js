import express from "express";
import {
  updateUsername,
  deleteUser,
  addsubscribedChannels,
  getsubscribedChannels,
  unsubscribe,
  addsubscribedChannelsGoogle,
  getsubscribedChannelsGoogle,
  unsubscribeGoogle,
  like,
  dislike,
} from "../controllers/userController.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//delete user
// router.delete("/:id", verifyToken, deleteUser);
router.delete("/:id", deleteUser);
// router.delete("/:id", deleteGoogleUser);

//subscribe to a channel
router.post("/sub/:id", verifyToken, addsubscribedChannels);
router.post("/googlesub/:id", addsubscribedChannelsGoogle);

//get subscribed channels
router.post("/getsub/:id", verifyToken, getsubscribedChannels);
router.post("/getgooglesub/:id", getsubscribedChannelsGoogle);

//unsubscribe a channel
router.post("/unsub/:id", verifyToken, unsubscribe);
router.post("/googleunsub/:id", unsubscribeGoogle);

//like a video
// router.post("/like/:videoId",verifyToken, like);

//dislike a video
// router.post("/dislike/:videoId",verifyToken, dislike);

export default router;
