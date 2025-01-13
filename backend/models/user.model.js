import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  mobile: { type: String, required: true }, // Changed to String for better phone number handling
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"], // Email format validation
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"], // Phone format validation
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
    match: [/^(?:[01]\d|2[0-3]):[0-5]\d$/, "Please enter a valid time in HH:MM format"], // Time format validation
  },
  guests: {
    type: Number,
    required: true,
    min: [1, "At least 1 guest is required"], // Minimum guests validation
  },
  bookingCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
}, { timestamps: true });

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Booking = mongoose.model('Booking', bookingSchema);
const Contact = mongoose.model('Contact', contactSchema);

export { User, Booking, Contact };
