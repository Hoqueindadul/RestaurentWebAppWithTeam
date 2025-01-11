import express from 'express';
import { User } from '../models/user.js'; // Ensure the path is correct
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    console.log('Signup attempt:', req.body); // Log incoming data for debugging

    const { username, mobile, email, password, password2 } = req.body;

    // Check if all required fields are provided
    if (!username || !mobile || !email || !password || !password2) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the passwords match
    if (password !== password2) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Check if the user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with that email' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      mobile,
      email,
      password: hashedPassword, // Store the hashed password
    });

    // Save the new user to the database
    await newUser.save();
    
    console.log('Signup successful for:', username); // Log successful signup

    res.status(201).json({ message: 'User registered successfully!' });

  } catch (error) {
    console.error('Signup error:', error); // Log the error to debug
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
