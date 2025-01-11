import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Import route handlers for different endpoints
import signupRoute from './routes/signup.js';
import loginRoute from './routes/login.js';
import bookingRoute from './routes/booking.js';
import contactRoute from './routes/contact.js';

const app = express(); // Create an instance of an Express application
const port = process.env.PORT || 5000; // Define the port for the server to listen on
const localFrontendUrl = process.env.FRONTEND_URL_LOCAL || 'http://localhost:5173';
const deploymentFrontendUrl =
  process.env.DEPLOYMENT_FRONTEND_URL || 'https://restaurent-web-app-with-team.vercel.app/';

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(
  cors({
    origin: [localFrontendUrl, deploymentFrontendUrl], // Allow both local and production URLs
    credentials: true, // Allow cookies or authentication headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  })
);

// MongoDB Connection
const mongoURI =
  process.env.MONGODB_URL ||
  'mongodb+srv://indadul9735:pnIbLCZonMyyhHxq@restaurentwebapp.18fog.mongodb.net/';

mongoose
  .connect(mongoURI)  // Removed useNewUrlParser and useUnifiedTopology
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the application if the database connection fails
  });

// Routes
app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/booking', bookingRoute);
app.use('/contact', contactRoute);

// Handle invalid routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
app.listen(port, (err) => {
  if (err) {
    console.error('Failed to start server:', err);
  } else {
    console.log(`Server running on port ${port}`);
  }
});
