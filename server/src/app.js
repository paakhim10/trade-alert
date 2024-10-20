import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const whitelistOrigins = process.env.CORS_ORIGINS.split(",");

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || whitelistOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow sending cookies across domains
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());

export default app;
