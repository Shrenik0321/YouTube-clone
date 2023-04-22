import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    return next(createError(401, "You are not authenticated"));
  } else {
    // When a JWT is decoded and verified successfully, the jwt.verify() function returns the decoded payload as an object and thats how we derive the userId here
    jwt.verify(token, process.env.JWT, (err, userId) => {
      if (err) {
        console.log("Token is not valid");
        return createError(403, "Token is not valid");
      } else {
        // Assigning the userId to  req.userId to means the request will then be passed as a request to the controller
        req.userId = userId.id;
        // Continues from where code is left
        next();
      }
    });
  }
};
