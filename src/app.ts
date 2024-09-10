import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./inversify.config"; // Import your Inversify configuration
import AppError from "./utils/appError";
import validateEnv from "./utils/validateEnv";
import { AppDataSource } from "./utils/data-source";
import { seedAdmin } from "./seed";
import morgan from "morgan";
// Import your TypeORM DataSource

// Load environment variables
dotenv.config();
validateEnv(); // Validate environment variables

const startServer = async () => {
  try {
    // Initialize the database connection
    await AppDataSource.initialize();
    console.log("Database connected successfully");
    // Call seed function
    await seedAdmin();

    // Create an InversifyExpressServer instance
    const server = new InversifyExpressServer(container);

    // Configure server settings
    server.setConfig((app) => {
      app.use(morgan("dev"));
      app.use(express.json({ limit: "10kb" }));
      app.use(
        cors({
          //origin: config.get<string>("origin"),
          //origin:'http://localhost:3000/dashboard',
          //origin:'https://8ae4-163-53-201-67.ngrok-free.app',
          // origin: "http://localhost:8002",
          origin: "*",
          methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
          allowedHeaders: "*",
          // credentials: true,
        })
      );
      app.get("/api/healthChecker", (req, res) => {
        res.status(200).json({
          status: "success",
        });
      });

      app.get("/", (req, res) => {
        res.status(200).json({ message: "Welcome to the service!" });
      });

      app.use(
        (error: AppError, req: Request, res: Response, next: NextFunction) => {
          error.status = error.status || "error";
          error.statusCode = error.statusCode || 500;

          res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
          });
        }
      );
    });

    // Build and start the server
    const app = server.build();
    const port = process.env.PORT || 8002;

    app.listen(port, () => {
      console.log(`Server started on port: ${port}`);
    });
  } catch (error) {
    console.error("Error during server startup:", error);
    process.exit(1); // Exit the process with an error code
  }
};

startServer();
