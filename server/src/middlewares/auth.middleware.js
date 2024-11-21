import AsyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import logger from "../utils/logger.js";
import { verifyAndDecodeToken } from "../utils/jwt.js";
import { User } from "../models/user.model.js";
import { UnregisteredUser } from "../models/unregisteredUser.model.js";

export const verifyRegisteredToken = AsyncHandler(async (req, res, next) => {
  logger.debug("Verify Registered Token");
  const token =
    req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

  console.log("Token", token);

  if (!token) {
    logger.info("Token not found");
    throw new ApiError(401, "Please Login to continue");
  }
  const tokenData = verifyAndDecodeToken(token);
  console.log("token Data", tokenData);
  if (!tokenData.valid) {
    logger.info(`Invalid token: ${tokenData.error}`);
    throw new ApiError(401, "Invalid or expired token, please login");
  }
  const user = await User.findById(tokenData.data.id); // Assuming `findById` is correct
  if (!user) {
    logger.info("User not found");
    throw new ApiError(401, "User no longer exists, please login");
  }
  console.log("User", user);
  req.user = user;
  req.user.type = tokenData.data.type;
  next();
});

export const verifyUnRegisteredToken = AsyncHandler(async (req, res, next) => {
  logger.debug("Verify Unregistered Token");
  const token =
    req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    logger.info("Token not found");
    throw new ApiError(401, "Please Login to continue");
  }

  const tokenData = verifyAndDecodeToken(token);

  if (!tokenData.valid) {
    logger.info(`Invalid token`);
    throw new ApiError(401, "Invalid or expired token, please login");
  }
  logger.debug(tokenData.data.id);
  const user = await UnregisteredUser.findById(tokenData.data.id); // Assuming `findById` is correct

  if (!user) {
    logger.info("User not found");
    throw new ApiError(401, "User no longer exists, please login");
  }

  req.user = user;
  req.user.type = tokenData.data.type;
  next();
});

export const checkIfRegistrationNotComplete = AsyncHandler(
  async (req, res, next) => {
    logger.debug("Check if registration not complete");
    if (!req.user) {
      throw new ApiError(401, "Unauthorized access, user not found");
    }

    const { type } = req.user;

    if (type === "unregisteredUser") {
      next();
    } else {
      throw new ApiError(
        403,
        "User is either not signed up or already registered"
      );
    }
  }
);

export const checkIfRegistrationComplete = AsyncHandler((req, res, next) => {
  logger.debug("Check if registration complete");
  if (!req.user) {
    throw new ApiError(401, "Unauthorized access, user not found");
  }
  const { type } = req.user;
  if (type === "registeredUser") next();
  else {
    throw new ApiError(
      403,
      "User is either haven't completed registeration or isn't logged in"
    );
  }
});
