import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // UserModel is a mongoose model used to respresent a collection in the database. newUser is an instance of that model that represents a new document to be saved in to the database
    const newUser = new UserModel({ ...req.body, password: hash });
    await newUser.save();
    res.status(200).send("User has been created!");
  } catch (err) {
    console.error(err)
    // The next function runs all the available middlewares after this piece of code
    next(err);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user) {
      return next(createError(404, "User not found!"));
    } else {
      const isCorrect = await bcrypt.compare(req.body.password, user.password);
      if (!isCorrect) {
        return next(createError(400, "Wrong Credentials"));
      } else {
        // Remove password before responding back for security measurements
        const { password, ...others } = user._doc;
        const token = jwt.sign({ id: user._id }, process.env.JWT);
        let response = { ...others, access_token: token };
        return res.status(200).json(response);
      }
    }
  } catch (err) {
    next(err);
  }
};
