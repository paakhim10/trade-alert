import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import logger from "./utils/logger.js";
import AuthRouter from "./routers/auth.router.js";
import CompanyRouter from "./routers/company.router.js";

dotenv.config();

// Initialize express app
const app = express();

// Middlewares
const whitelistOrigins = process.env.CORS_ORIGINS.split(",");
const morganFormat = ":method :url :status :response-time ms";

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
app.use(
  morgan(morganFormat, {
    stram: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// Routes
app.use("/api/v1/auth", AuthRouter);

app.use("/api/v1/company", CompanyRouter);

export default app;
