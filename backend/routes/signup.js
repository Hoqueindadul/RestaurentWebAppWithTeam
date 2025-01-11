import express from 'express';
import { User } from '../models/user.js'; // Ensure the path and file name are correct
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    console.log('Login attempt:', req.body);

    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password');
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    console.log('Login successful');
    res.status(200).json({ message: 'Login successful!' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; // Use export default
