import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

// Import route handlers for different endpoints
import signupRoute from './routes/signup.js';
import loginRoute from './routes/login.js';
import bookingRoute from './routes/booking.js';
import contactRoute from './routes/contact.js';

const app = express(); // Create an instance of an Express application
const port = process.env.PORT || 5000; // Define the port for the server to listen on

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS to allow requests from different origins

// MongoDB Connection
const mongoURI = process.env.MONGODB_URL   || 'mongodb+srv://indadul9735:pnIbLCZonMyyhHxq@restaurentwebapp.18fog.mongodb.net/'; // Use environment variable for MongoDB URI
mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the application if the database connection fails
  });

// Define routes for handling different API endpoints
app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/booking', bookingRoute);
app.use('/contact', contactRoute);

// Start the server and listen on the specified port
app.listen(port, (err) => {
  if (err) {
    console.error('Failed to start server:', err);
  } else {
    console.log(`Server running on port ${port}`);
  }
});
