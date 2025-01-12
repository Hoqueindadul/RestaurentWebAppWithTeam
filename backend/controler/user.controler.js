import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import createTokenAndSaveCookies from "../jwt/authToken.js"

export const register = async (req, res) => {
    try {
        const { username, mobile, email, password } = req.body;
        console.log("Parsed Data:", { username, mobile, email, password});

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
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required." });
        }

        const user = await User.findOne({ username }).select("+password");
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const isMatchPassword = await bcrypt.compare(password, user.password);
        if (!isMatchPassword) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const token = createTokenAndSaveCookies(user._id, res);
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
        res.clearCookie("jwt")
        res.status(200).json({message:"User logout successfully."})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}
