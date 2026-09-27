import dotenv from "dotenv";
dotenv.config();

import express from "express";
const PORT = process.env.PORT || 5000;
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./utils/swagger.js";

import authRoutes from "./routes/auth.js";
import transactionRoutes from "./routes/transactions.js";
import uploadRoutes from "./routes/upload.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { logger } from "./middlewares/logger.js";

dotenv.config({ path: "./backend/.env" });

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://personal-finance-tracker-api-s11c.onrender.com",
    ],
  }),
);
app.use(helmet());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/upload", uploadRoutes);

app.use(logger);

app.use(logger);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const frontendPath = path.join(__dirname, "../frontend/dist");

  // Serve React static files
  app.use(express.static(frontendPath));

  // React Router fallback
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.json({
      message: "Personal Finance Tracker API is running",
    });
  });
}

// MongoDB
mongoose
  .connect(
    process.env.NODE_ENV === "development"
      ? process.env.MONGO_URI_DEV
      : process.env.MONGO_URI_PRO,
  )
  .then(() => {
    console.log("✅ MongoDB connected");
    console.log("Database:", mongoose.connection.name);
    console.log("Host:", mongoose.connection.host);
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:", error.message);
  });

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
