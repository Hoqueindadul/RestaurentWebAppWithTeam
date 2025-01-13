import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { DEPLOYMENT_BACKEND_URL } from "../deployment_backend_url";
import { LOCAL_BACKEND_URL } from "../local_backend_url";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

const SignupForm = () => {
    const [username, setUsername] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false); // State for loading

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();

        // Validation for empty fields
        if (!username || !mobile || !email || !password) {
            toast.error("All fields are required.");
            return;
        }

        setIsLoading(true); // Set loading to true before API call

        try {
            const formData = {
                username,
                mobile,
                email,
                password,
            };

            // Use appropriate backend URL
            const BACKEND_URL =
                process.env.NODE_ENV === "production"
                    ? DEPLOYMENT_BACKEND_URL
                    : LOCAL_BACKEND_URL;

            const response = await axios.post(`${BACKEND_URL}/api/users/register`, formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // Show success message
            toast.success("User registered successfully!");

            // Reset form fields
            setUsername("");
            setMobile("");
            setEmail("");
            setPassword("");

            // Redirect after a delay to allow the toast to display
            setTimeout(() => {
                navigate("/login");
            }, 3000); // 3 seconds delay
        } catch (error) {
            // Show error message from backend or fallback message
            const errorMessage =
                error.response?.data?.message || "An unexpected error occurred. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 signupPage">
            {/* Include the Toaster for toast messages */}
            <Toaster position="top-right" reverseOrder={false} />

            <div className="card shadow-lg p-4 m-4" style={{ maxWidth: "500px", width: "100%" }}>
                <div className="card-body">
                    <h2 className="card-title text-center text-primary mb-4">
                        <b>Sign Up</b>
                    </h2>
                    <form onSubmit={handleRegister}>
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

                        {/* Mobile Input */}
                        <div className="mb-3">
                            <label htmlFor="mobile" className="form-label">Phone Number</label>
                            <input
                                type="text"
                                id="mobile"
                                className="form-control"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>

                        {/* Email Input */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
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
                                    Sign Up...
                                </span>
                            ) : (
                                "Sign Up"
                            )}
                        </button>

                        {/* Login Link */}
                        <div className="text-center">
                            <Link to="/login" className="btn btn-link">
                                Already have an account? Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
