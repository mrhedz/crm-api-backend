import express from "express";
import cors from "cors";
import pool from "./config/db";

import authRoutes from "./routes/auth.routes";
import clientsRoutes from "./routes/clients.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "API running",
    success: true,
  });
});

app.get("/health", (_req, res) => {
  res.status(200).json({
    message: "API healthy",
    success: true,
  });
});

app.get("/health/db", async (_req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.status(200).json({
      message: "Database connected",
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Database connection failed",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/clients", clientsRoutes);

export default app;