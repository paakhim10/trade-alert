import path from "path";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import AsyncHandler from "../utils/asyncHandler.js";
import logger from "../utils/logger.js";
import { UnregisteredUser } from "../models/unregisteredUser.model.js";
import { User } from "../models/user.model.js";
import { sendConfirmationMail } from "../utils/sendMail.js";
import { generateToken } from "../utils/jwt.js";

export const signup = AsyncHandler(async (req, res) => {
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
  const mailSent = await sendConfirmationMail(email, newUser._id);

  if (!mailSent) {
    const response = await UnregisteredUser.deleteOne({ _id: newUser._id });
    console.log(response);
    throw new ApiError(500, "Error sending email please try again");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "Please verify your email to continue"));
});

export const confirmEmail = AsyncHandler(async (req, res) => {
  logger.debug("Confirm email route");
  const { id } = req.query;

  if (!id) {
    throw new ApiError(400, "Invalid request");
  }

  const unregisteredUser = await UnregisteredUser.findById(id);
  console.log(unregisteredUser);
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

export const login = AsyncHandler(async (req, res) => {
  logger.debug("Login route");
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Please provide email and password");
  }
  const user = await User.findOne({ email }).select("-password");

  if (user) {
    if (!(await user.matchPassword(password))) {
      throw new ApiError(401, "Invalid credentials");
    }
    const token = generateToken(user, "registeredUser");
    return res.status(200).json(
      new ApiResponse(200, "User logged in succesfully", {
        ...user,
        token: token,
      })
    );
  }
  const unregisteredUser = await UnregisteredUser.findOne({ email }).select(
    "-password"
  );
  if (!unregisteredUser) {
    throw new ApiError(400, "Please Sign up first");
  }
  console.log(unregisteredUser.stage);
  if (unregisteredUser.stage === "Stage_EmailVerification") {
    throw new ApiError(400, "Please verify your email first");
  }
  const token = generateToken(unregisteredUser, "unregisteredUser");
  return res.status(200).json(
    new ApiResponse(200, "Add company Details", {
      email: unregisteredUser.email,
      stage: unregisteredUser.stage,
      token: token,
    })
  );
});

export const register = AsyncHandler(async (req, res) => {
  logger.debug("Register Route");

  const { alertPreferences, companies, fullName, newsPartners, phoneNumber } =
    req.body;

  // Prepare user data
  const userData = {
    email: req.user.email,
    password: req.user.password,
    name: fullName,
    phone: phoneNumber,
    companyStocks: companies.map((company) => ({
      name: company.name,
      quantity: parseInt(company.quantity, 10), // Ensure quantity is a number
      priority: parseInt(company.priority, 10), // Ensure priority is a number
    })),
    userPreferences: {
      news_partners: newsPartners || [], // Default to an empty array if undefined
      alert_preference: {
        alertTypes: alertPreferences.types?.map((type) => {
          if (type === "By Email") return "Email";
          if (type === "By SMS") return "SMS";
          if (type === "In App") return "Push";
        }), // Default to "Email"
        alertFrequency:
          alertPreferences.frequency == "As Necessary"
            ? "asNecessary"
            : alertPreferences.frequency, // Default to "Daily"
      },
    },
  };
  console.log("User Data: ", JSON.stringify(userData));
  try {
    // Create the user
    const user = await User.create(userData);

    if (!user) {
      throw new ApiError(500, "Error creating user");
    }

    // Delete the unregistered user
    await UnregisteredUser.deleteOne({ email: req.user.email });
    const token = generateToken(user, "registeredUser");

    return res
      .status(201)
      .json(
        new ApiResponse(201, "Registration Successful", {
          ...user,
          token: token,
        })
      );
  } catch (error) {
    logger.error("Error in registration:", error);
    throw new ApiError(500, "Error during registration");
  }
});
