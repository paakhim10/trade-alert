import { Router } from "express";
import { signup, confirmEmail } from "../controllers/auth.controllers.js";

const router = Router();

router.post("/signup", signup);
router.get("/confirmEmail", confirmEmail);

export default router;
