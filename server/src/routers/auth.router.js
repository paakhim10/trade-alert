import { Router } from "express";
import {
  signup,
  confirmEmail,
  login,
  register,
} from "../controllers/auth.controllers.js";

import {
  verifyUnRegisteredToken,
  checkIfRegistrationNotComplete,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup", signup);
router.get("/confirmEmail", confirmEmail);
router.post("/login", login);
router.post(
  "/register",
  verifyUnRegisteredToken,
  checkIfRegistrationNotComplete,
  register
);

export default router;
