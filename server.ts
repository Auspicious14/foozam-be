import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { json } from "body-parser";
import dotenv from "dotenv";
import {appRoute} from "./index"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URL || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(appRoute);

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
