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
