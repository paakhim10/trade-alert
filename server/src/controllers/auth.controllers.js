import path from "path";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import AsyncHandler from "../utils/asyncHandler.js";
import logger from "../utils/logger.js";
import { UnregisteredUser } from "../models/unregisteredUser.model.js";
import { User } from "../models/user.model.js";
import { sendConfirmationMail } from "../utils/sendMail.js";

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

  if (!newUser) {
    throw new ApiError(400, "Error creating user");
  }

  // Send email verification
  await sendConfirmationMail(email, newUser._id);

  return res
    .status(201)
    .json(new ApiResponse(201, "Please verify your email to continue"));
});

export const confirmEmail = AsyncHandler(async (req, res, next) => {
  logger.debug("Confirm email route");
  const { id } = req.query;

  if (!id) {
    throw new ApiError(400, "Invalid request");
  }

  const unregisteredUser = await UnregisteredUser.findById(id);
  if (
    !unregisteredUser ||
    unregisteredUser.stage !== "Stage_EmailVerification"
  ) {
    throw new ApiError(404, "User not found");
  }

  unregisteredUser.stage = "Stage_AddUserDetails";
  await unregisteredUser.save();

  // Serve the HTML file as the response
  const confirmationPagePath = path.join(
    path.resolve(),
    "src",
    "templates",
    "confirmedEmailTemplate.html"
  );
  res.status(200).sendFile(confirmationPagePath);
});
