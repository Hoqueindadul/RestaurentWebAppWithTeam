import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { DEPLOYMENT_BACKEND_URL } from "../deployment_backend_url";
import { LOCAL_BACKEND_URL } from "../local_backend_url";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        // Validation for empty fields
        if (!username || !password) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            // Determine backend URL based on environment
            const BACKEND_URL =
                process.env.NODE_ENV === "production"
                    ? DEPLOYMENT_BACKEND_URL
                    : LOCAL_BACKEND_URL;

            // Login API call
            const { data } = await axios.post(
                `${BACKEND_URL}/api/users/login`,
                { username, password },
                { headers: { "Content-Type": "application/json" } }
            );

            // Store token and update auth context
            localStorage.setItem("jwt", data.token);
            login(data.token);

            // Display success message
            toast.success(data.message || "User logged in successfully.");

            // Clear form fields
            setUsername("");
            setPassword("");

            // Redirect after delay
            setTimeout(() => {
                navigate("/");
            }, 3000); // 3 seconds delay
        } catch (error) {
            // Handle error response
            const errorMessage =
                error.response?.data?.message || "Failed to log in. Please try again.";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 loginPage">
            {/* Include the Toaster for toast messages */}
            <Toaster position="top-right" reverseOrder={false} />

            <div className="card shadow-lg p-4" style={{ maxWidth: "500px", width: "100%" }}>
                <div className="card-body">
                    <h2 className="card-title text-center text-primary mb-4">
                        <b>Log In</b>
                    </h2>
                    <form onSubmit={handleLogin}>
                        {/* Username Input */}
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                id="username"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-primary w-100 mb-3">
                            Login
                        </button>

                        {/* Signup Link */}
                        <div className="text-center">
                            <Link to="/signupForm" className="btn btn-link">
                                Don't have an account? Sign up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
