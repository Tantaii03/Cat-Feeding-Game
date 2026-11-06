
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import translationRoutes from "./src/routes/translationRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  })
);

app.use(express.json());

// API: Home
app.get("/", (req, res) => {
  res.json({
    message: "Cat Feeding Game API is running!",
    status: "success",
  });
});

// API: Health Check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend connection successful!",
    service: "Cat Feeding Game",
  });
});

// API: Game Information
app.get("/api/game", (req, res) => {
  res.json({
    gameName: "Cat Feeding Game",
    description: "English Vocabulary Learning Game",
    version: "1.0.0",
    status: "ready",
  });
});

// API: AI FOR THAI Translation
app.use("/api/translation", translationRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
