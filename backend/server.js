import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./dbConnection/DB_Connection.js";
import userRoute from "./routes/user.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

// Load environment variables
const mongo_url = process.env.MONGODB_URL;
const port = process.env.PORT || 5000; // Default port fallback

const localFrontendUrl = process.env.FRONTEND_URL_LOCAL || "http://localhost:5173";
const deploymentFrontendUrl = process.env.MAIN_FRONTEND_URL || "https://restaurent-web-app-with-team.vercel.app/";

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [localFrontendUrl, deploymentFrontendUrl], // Allow both local and production URLs
    credentials: true, // Allow cookies or authentication headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow necessary HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
  })
);

// Endpoints
app.use("/api/users", userRoute);

// Connect to the database and start the server
connectDatabase(mongo_url)
  .then(() => {
    console.log("MongoDB is Connected");
    app.listen(port, () => {
      console.log(`Server is running on: ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
