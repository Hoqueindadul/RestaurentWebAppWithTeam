import express from 'express';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { username, email, password, password2 } = req.body;

    if (!username || !email || !password || !password2) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== password2) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with that email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
