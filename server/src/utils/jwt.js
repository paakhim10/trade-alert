import jwt from "jsonwebtoken";

export const generateToken = (user, type) => {
  return jwt.sign({ id: user._id, type: type }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const verifyAndDecodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { valid: true, data: decoded }; // Return the decoded payload if valid
  } catch (error) {
    return { valid: false, error: error.message }; // Handle invalid or expired tokens
  }
};
