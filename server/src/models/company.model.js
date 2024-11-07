import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sc_code: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  ltp: {
    type: Number,
    required: true,
  },
  market_cap: {
    type: String,
    required: true,
  },
  pe_ratio: {
    type: Number,
    required: true,
  },
  change_percent: {
    type: Number,
    required: true,
  },
  volume: {
    type: Number,
    required: true,
  },
  fiftytwo_weekhigh: {
    type: Number,
    required: true,
  },
  fiftytwo_weeklow: {
    type: Number,
    required: true,
  },
});

export const Company = mongoose.model("Company", companySchema);
