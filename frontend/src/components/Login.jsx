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
    const [isLoading, setIsLoading] = useState(false); // State for loading
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

        setIsLoading(true); // Set loading to true when the form is submitted

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

            // Store token and update auth context with both token and username
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("username", username); // Store the username in localStorage
            login(username, data.token); // Call login with both username and token

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
        } finally {
            setIsLoading(false); // Set loading to false after the process finishes
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
                        <button type="submit" className="btn p-2 btn-primary w-100 mb-3" disabled={isLoading}>
                            {isLoading ? (
                                <span>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Login...
                                </span>
                            ) : (
                                "Login"
                            )}
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
