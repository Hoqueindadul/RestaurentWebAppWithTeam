import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose'; // Import mongoose for MongoDB connection
import signupRoute from './routes/signup.js';
import loginRoute from './routes/login.js';
import bookingRoute from './routes/booking.js';
import contactRoute from './routes/contact.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
const connectDB = async () => {
  try {
    const dbUri = process.env.MONGODB_URL || 'mongodb+srv://indadul9735:pnIbLCZonMyyhHxq@restaurentwebapp.18fog.mongodb.net/';
    await mongoose.connect(dbUri); // No need for useNewUrlParser or useUnifiedTopology
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

connectDB() // Call the MongoDB connection function

// Enable CORS with specific origin and credentials
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://restaurent-web-app-with-team.vercel.app'], // Adjust for dev and prod environments
    credentials: true, // Allow cookies/session handling
  })
);

// Middleware for parsing JSON and handling body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route handlers
app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/booking', bookingRoute);
app.use('/contact', contactRoute);

// Default error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
