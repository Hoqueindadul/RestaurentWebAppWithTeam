import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { BACKENDURL } from "../backendUrl";
import AOS from "aos";
import "aos/dist/aos.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { login } = useAuth();

  useEffect(() => {
    AOS.init(); // Initialize AOS animations
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    try {
      const response = await fetch(`${BACKENDURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }

      const data = await response.json();
      login(username); // Set user in auth context
      localStorage.setItem("loggedInUsername", username); // Save to localStorage
      setShowPopup(true);

      // Auto-close popup and navigate to homepage
      setTimeout(() => {
        setShowPopup(false);
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error during login:", error);
      setError(error.message);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/SignupForm");
  };

  return (
    <div className="container-xxl bg-white p-0">
      <div className="bodysign">
        <form
          id="login-box"
          onSubmit={handleSubmit}
          data-aos="fade-in"
          data-aos-duration="2000"
        >
          <div className="left">
            <h1>
              <b>Log In</b>
            </h1>
            <br />
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={formData.username}
              onChange={handleChange}
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <input type="submit" value="LogIn" />
            {error && <p className="text-danger mt-2">{error}</p>}
            <button
              type="button"
              onClick={handleLoginRedirect}
              className="btn5"
            >
              Don't have an account?
            </button>
          </div>
          <div className="right">
            <span className="loginwith">Log-In with</span>
            <br />
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
          <div className="orl">OR</div>
        </form>
        {showPopup && <div className="popup">Login successful!</div>}
      </div>
    </div>
  );
};

export default Login;
