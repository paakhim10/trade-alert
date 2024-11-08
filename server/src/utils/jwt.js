import jwt from "jsonwebtoken";

export const generateToken = (user, type) => {
  return jwt.sign({ id: user._id, type: type }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
