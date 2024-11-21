import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import AsyncHandler from "../utils/asyncHandler.js";
import logger from "../utils/logger.js";
import { User } from "../models/user.model.js";

export const getUser = AsyncHandler(async (req, res) => {
  logger.debug("getUser route");
  const id = req.user._id;
  if (!id) {
    throw new ApiError(400, "User id is required");
  }
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res.status(200).json(new ApiResponse(200, "User found", user));
});

export const saveNotificationToken = AsyncHandler(async (req, res) => {
  logger.debug("saveNotificationToken route");
  console.log(req.user);
  const id = req.user._id;
  const { notificationToken } = req.body;
  if (!notificationToken) {
    throw new ApiError(400, "Notification token is required");
  }

  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  user.notificationToken = notificationToken;
  await user.save();
  return res.status(200).json(new ApiResponse(200, "Notification token saved"));
});
