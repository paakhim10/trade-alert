import { Router } from "express";
import { getCompaniesSuggestion } from "../controllers/company.controllers.js";

const router = Router();

router.get("/getSuggestion", getCompaniesSuggestion);

export default router;
