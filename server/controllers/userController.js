import { createError } from "../error.js";
import UserModel from "../models/UserModel.js";
import GoogleUserModel from "../models/GoogleUserModel.js";

export const updateUsername = async (req, res) => {
  if (req.params.id === req.userId) {
    try {
      await UserModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: res.body,
        },
        { new: true }
      );
    } catch (err) {
      console.error(err);
    }
  } else {
    return next(createError(403, "You can update only your account"));
  }
};

export const deleteUser = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    console.error(err);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
  }
};

// Should be improved
export const addsubscribedChannels = async (req, res) => {
  try {
    await UserModel.updateOne(
      { _id: req.userId },
      { $push: { subscribedChannels: req.body.channelTitle } }
    );
  } catch (err) {
    console.error(err);
  }
};

export const getsubscribedChannels = async (req, res) => {
  try {
    const result = await UserModel.findOne({ _id: req.userId });
    if (result === null) {
      res.send([]);
    } else {
      res.send(result.subscribedChannels);
    }
  } catch (err) {
    console.error(err);
  }
};

export const unsubscribe = async (req, res) => {
  try {
    await UserModel.updateOne(
      { _id: req.userId },
      { $pull: { subscribedChannels: { $in: [req.body.channelTitle] } } }
    );
  } catch (err) {
    console.error(err);
  }
};

export const addsubscribedChannelsGoogle = async (req, res) => {
  try {
    const res = await GoogleUserModel.updateOne(
      { googleId: req.body.id },
      { $push: { subscribedChannels: req.body.channelTitle } }
    );
  } catch (err) {
    console.error(err);
  }
};

export const getsubscribedChannelsGoogle = async (req, res) => {
  try {
    const result = await GoogleUserModel.findOne({ googleId: req.body.id });
    if (result === null) {
      res.send([]);
    } else {
      res.send(result.subscribedChannels);
    }
  } catch (err) {
    console.error(err);
  }
};

export const unsubscribeGoogle = async (req, res) => {
  try {
    await GoogleUserModel.updateOne(
      { googleId: req.body.id },
      { $pull: { subscribedChannels: { $in: [req.body.channelTitle] } } }
    );
  } catch (err) {
    console.error(err);
  }
};

export const like = async (req, res) => {
  console.log("like");
  // if (req.params.id === req.userId) {
  //   try {
  //     await UserModel.findByIdAndDelete(req.params.id);
  //     res.status(200).json("User has been deleted");
  //   } catch (err) {
  //     console.error(err);
  //   }
  // } else {
  //   return next(createError(403, "You can delete only your account"));
  // }
};

export const dislike = async (req, res) => {
  console.log("dislike");
  // if (req.params.id === req.userId) {
  //   try {
  //     await UserModel.findByIdAndDelete(req.params.id);
  //     res.status(200).json("User has been deleted");
  //   } catch (err) {
  //     console.error(err);
  //   }
  // } else {
  //   return next(createError(403, "You can delete only your account"));
  // }
};
