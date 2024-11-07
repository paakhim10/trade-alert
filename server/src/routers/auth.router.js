import { Router } from "express";
import {
  signup,
  confirmEmail,
  login,
} from "../controllers/auth.controllers.js";

const router = Router();

router.post("/signup", signup);
router.get("/confirmEmail", confirmEmail);
router.post("/login", login);

export default router;
