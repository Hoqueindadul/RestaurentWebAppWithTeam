import express from 'express';
import { User } from '../models/user.js'; // Ensure the path and file name are correct
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { username, mobile, email, password } = req.body;

    // Hash the password before saving the user
    const saltRounds = 10; // Adjust salt rounds as needed
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      mobile,
      email,
      password: hashedPassword, // Use the hashed password
    });

    await newUser.save();
    res.status(200).json({ message: 'Registration completed successfully!' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Error registering new user' });
  }
});

export default router; // Use export default
