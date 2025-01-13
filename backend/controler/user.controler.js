import { User, Booking, Contact } from "../models/user.model.js";
import bcrypt from "bcrypt";
import createTokenAndSaveCookies from "../jwt/authToken.js";


export const contactFormSubmit = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (name.length > 100) {
            return res.status(400).json({ message: "Name cannot exceed 100 characters." });
        }

        if (subject.length > 150) {
            return res.status(400).json({ message: "Subject cannot exceed 150 characters." });
        }

        if (message.length > 500) {
            return res.status(400).json({ message: "Message cannot exceed 500 characters." });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email address." });
        }

        // Save the contact form data
        const newContact = new Contact({ name, email, subject, message });
        const savedContact = await newContact.save();

        res.status(201).json({
            message: "Contact form submitted successfully.",
            contact: savedContact,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const register = async (req, res) => {
    try {
        const { username, mobile, email, password } = req.body;
        console.log("Parsed Data:", { username, mobile, email, password });

        // Validate input fields
        if (!username || !mobile || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validate duplicate phone number
        const userPhone = await User.findOne({ mobile });
        if (userPhone) {
            return res.status(400).json({ message: "Phone number already registered" });
        }

        // Check if the user already exists
        const user = await User.findOne({ email });    
        if (user) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ 
            username,
            mobile, 
            email,
            password: hashPassword 
        });
        await newUser.save();

        // Generate token and respond
        try {
            const token = await createTokenAndSaveCookies(newUser._id, res);
            return res.status(201).json({ message: "User registered successfully", newUser, token });
        } catch (tokenError) {
            return res.status(500).json({ error: "Token creation failed" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const login = async (req, res) => {
    console.log("Request Body:", req.body); // Log request body for debugging
    const { username, password } = req.body; // Extract username and password

    try {
        // Check if username and password are provided
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required." });
        }

        // Find user by username
        const user = await User.findOne({ username }).select("+password");
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // Compare password
        const isMatchPassword = await bcrypt.compare(password, user.password);
        if (!isMatchPassword) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // Create token and respond
        const token = await createTokenAndSaveCookies(user._id, res); // Await token creation
        res.status(200).json({
            message: "Login successful.",
            user: {
                _id: user._id,
                username: user.username,
            },
            token,
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};



export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "User logout successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const bookTabel = async (req, res) => {
    const { name, email, phone, date, time, guests, bookingCode } = req.body;

    // Input validation
    if (!name || !email || !phone || !date || !time || !guests || !bookingCode) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Check for existing booking with the same bookingCode
        const existingBooking = await Booking.findOne({ bookingCode });
        if (existingBooking) {
            return res.status(409).json({ message: 'Booking with this code already exists.' });
        }

        // Create a new booking instance
        const newBooking = new Booking({
            name,
            email,
            phone,
            date,
            time,
            guests,
            bookingCode,
        });

        // Save the new booking to the database
        const savedBooking = await newBooking.save();

        // Send a success response with the saved booking data, including bookingCode
        res.status(201).json({
            message: 'Booking created successfully.',
            booking: savedBooking, // Ensure the full saved booking data is sent
        });
    } catch (error) {
        // Log the error for debugging
        console.error('Error saving booking:', error);

        // Send an error response
        res.status(500).json({
            message: 'Failed to save booking. Please try again later.',
            error: error.message || 'Internal Server Error',
        });
    }
};

