import { Router } from "express";

import {
  getUser,
  saveNotificationToken,
} from "../controllers/user.controllers.js";

import { verifyRegisteredToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", verifyRegisteredToken, getUser);
router.post(
  "/saveNotificationToken",
  verifyRegisteredToken,
  saveNotificationToken
);

export default router;
