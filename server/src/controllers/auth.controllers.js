import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import AsyncHandler from "../utils/asyncHandler.js";
import logger from "../utils/logger.js";
import { UnregisteredUser } from "../models/unregisteredUser.model.js";
import { User } from "../models/user.model.js";

export const signup = AsyncHandler(async (req, res, next) => {
  logger.debug("Signup route");
  const { email, password, confirmPassword } = req.body;
  if (!email || !password || !confirmPassword) {
    throw new ApiError(400, "Please provide email and password");
  }
  if (password !== confirmPassword) {
    throw new ApiError(400, "Passwords do not match");
  }
  const user = await User.findOne({ email });
  if (user) {
    throw new ApiError(400, "User Account already exists");
  }
  const unregisteredUser = await UnregisteredUser.findOne({ email });
  if (unregisteredUser) {
    if (unregisteredUser.stage === "Stage_EmailVerification") {
      throw new ApiError(
        400,
        "User already signed up. Please verify your email"
      );
    } else if (unregisteredUser.stage === "Stage_AddUserDetails") {
      throw new ApiError(400, "User already signed up. Please add details");
    }
  }

  const newUser = await UnregisteredUser.create({
    email,
    password,
    stage: "Stage_EmailVerification",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "User created successfully"));
});
