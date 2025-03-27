import express from "express";
import mongoose from "mongoose";
import router from "./route/Route.js"; // Ensure this is the correct router
import errorHandler from "./middleware/errorhandler.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const corsOptions = {
  allowedHeaders: ["Authorization", "Content-Type"],
  methods: ["GET", "POST", "PUT", "UPDATE", "DELETE"],
  origin: ["http://localhost:5173"], // Allow frontend
};

const app = express();

app.use(cors(corsOptions)); // Ensure CORS is configured properly
app.use(express.json()); // Ensure JSON parsing is enabled

// Use an async function to start the server
async function startServer() {
  try {
    await mongoose.connect(process.env.DB, {
      serverSelectionTimeoutMS: 30000, // 30 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds timeout
      maxPoolSize: 10, // Maintain up to 10 socket connections
    });

    // Increase timeout to 2 minutes
    app.use((req, res, next) => {
      req.setTimeout(120000); // 120 seconds
      next();
    });

    console.log("Connected to DB");

    app.use("/api", router); // Use correct router variable
    app.use(errorHandler);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

startServer();
