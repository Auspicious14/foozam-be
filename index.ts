import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error";
import foodRoutes from "./routes"

dotenv.config();

export const appRoute = express();

const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((url) => url.trim())
  : ["http://localhost:3002"];

console.log("CORS Allowed Origins:", allowedOrigins);

appRoute.use(errorHandler);
appRoute.use(
  cors({
    origin: (origin, callback) => {
      console.log("Incoming origin:", origin);
      if (
        !origin ||
        allowedOrigins.some((allowed) => origin.startsWith(allowed))
      ) {
        callback(null, true);
      } else {
        console.warn("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    exposedHeaders: ["Content-Disposition"],
  })
);
console.log("ENV:", process.env.CLIENT_URL);
appRoute.use(express.json({ limit: "50mb" }));
appRoute.use(express.urlencoded({ limit: "50mb", extended: true }));
appRoute.use(cookieParser());

appRoute.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Health check
appRoute.get("/api/health", (_, res) => res.json({ status: "ok" }));

appRoute.use('/api/foods', foodRoutes)
