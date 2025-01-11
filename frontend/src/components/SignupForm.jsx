import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKENDURL } from "../backendUrl";

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    mobile: "",
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { username, mobile, email, password, password2 } = formData;

    // Validate mobile number (10 digits)
    if (!/^\d{10}$/.test(mobile)) {
      setError("Mobile number must be 10 digits.");
      return false;
    }

    // Validate email format
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    // Validate password strength
    if (password.length < 8 || !/[!@#$%^&*]/.test(password)) {
      setError("Password must be at least 8 characters and include a special character.");
      return false;
    }

    // Check if passwords match
    if (password !== password2) {
      setError("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    if (!validateForm()) return;

    setLoading(true); // Set loading state

    try {
      const backendUrl = BACKENDURL;
      const response = await fetch(`${backendUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // If needed, add authorization headers or cookies
          // "Authorization": `Bearer ${your_token}`,
        },
        body: JSON.stringify({
          username: formData.username,
          mobile: formData.mobile,
          email: formData.email,
          password: formData.password,
        }),
        credentials: "include", // Include credentials if necessary (e.g., cookies or sessions)
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Registration successful!");
        navigate("/Login");
      } else {
        setError(data.error || "Failed to register. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred during registration. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleLoginRedirect = () => {
    navigate("/Login");
  };

  return (
    <div className="bodysign">
      <form
        id="login-box"
        onSubmit={handleSubmit}
        data-aos="fade-out"
        data-aos-duration="3000"
      >
        <div className="left">
          <h1><b>Sign Up</b></h1>

          {error && <p className="text-danger">{error}</p>} {/* Error message */}

          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleChange}
            aria-label="Username"
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            required
            value={formData.mobile}
            onChange={handleChange}
            aria-label="Mobile Number"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            aria-label="Email"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            aria-label="Password"
          />
          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            required
            value={formData.password2}
            onChange={handleChange}
            aria-label="Confirm Password"
          />

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Me Up"}
          </button>

          <button
            type="button"
            onClick={handleLoginRedirect}
            className="btn btn-secondary mt-3"
          >
            Already have an account? Login
          </button>
        </div>

        <div className="right">
          <span className="loginwith">Sign in with<br />social network</span>

          <button type="button" className="social-signin facebook">
            Log in with Facebook
          </button>
          <button type="button" className="social-signin twitter">
            Log in with Twitter
          </button>
          <button type="button" className="social-signin google">
            Log in with Google+
          </button>
        </div>
        <div className="or">OR</div>
      </form>
    </div>
  );
};

export default SignupForm;
