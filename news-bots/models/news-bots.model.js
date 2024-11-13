import mongoose, { Schema } from "mongoose";

const newsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isProcessed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const TheEconomicsTimes = mongoose.model(
  "TheEconomicsTimes",
  newsSchema
);
export const TheHindustanTimes = mongoose.model(
  "TheHindustanTimes",
  newsSchema
);
export const LiveMint = mongoose.model("LiveMint", newsSchema);
export const CNBC = mongoose.model("CNBC", newsSchema);
export const Tribune = mongoose.model("Tribune", newsSchema);
export const PulseByZerodha = mongoose.model("PluseByZerodha", newsSchema);
export const TheTimesOfIndia = mongoose.model("TheTimesOfIndia", newsSchema);
export const TheIndianExpress = mongoose.model("TheIndianExpress", newsSchema);
