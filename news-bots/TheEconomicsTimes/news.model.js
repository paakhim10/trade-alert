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
    article: {
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

export const News = mongoose.model("News", newsSchema);
