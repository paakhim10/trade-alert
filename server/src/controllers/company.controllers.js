import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import AsyncHandler from "../utils/asyncHandler.js";
import logger from "../utils/logger.js";
import { Company } from "../models/company.model.js";

export const getCompaniesSuggestion = AsyncHandler(async (req, res, next) => {
  logger.debug("getCompaniesSuggestion route");
  const { query } = req.query;
  if (!query) {
    throw new ApiError(400, "Query is required");
  }

  const companies = await Company.find({
    $or: [
      { name: { $regex: `^${query}`, $options: "i" } },
      { symbol: { $regex: `^${query}`, $options: "i" } },
    ],
  }).select("name symbol");

  return res
    .status(200)
    .json(new ApiResponse(200, "Companies found", companies));
});
