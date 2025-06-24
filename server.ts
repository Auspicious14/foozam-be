import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { json } from "body-parser";
import dotenv from "dotenv";
import foodRoutes from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URL || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
app.use("/api/foods", foodRoutes);

// Health check
app.get("/api/health", (_, res) => res.json({ status: "ok" }));

// Start server (for local dev)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// For Vercel serverless
module.exports = app;
