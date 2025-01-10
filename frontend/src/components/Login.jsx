import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { login } = useAuth();

  useEffect(() => {
    AOS.init(); // Initialize AOS (for animations)
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    try {
      // Static backend URL
      const backendUrl = "http://localhost:5000";

      const response = await fetch(`${backendUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setShowPopup(true);
        login(username); // Update the auth context with logged-in username
        localStorage.setItem("loggedInUsername", username); // Save the username to localStorage
        setTimeout(() => {
          setShowPopup(false);
          navigate("/");
        }, 2000); // Adjust delay as needed
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      console.error("There was an error!", error);
      setError("An error occurred. Please try again.");
    }
  };

  const handleLoginRedirect = () => {
    navigate("/SignupForm");
  };

  return (
    <div className="container-xxl bg-white p-0">
      {/* Form structure */}
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
              placeholder="Username :"
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
            <input type="submit" name="signup_submit" value="LogIn" />
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
            <button
              type="button"
              className="social-signin facebook"
            >
              Log in with Facebook
            </button>
            <button
              type="button"
              className="social-signin twitter"
            >
              Log in with Twitter
            </button>
            <button
              type="button"
              className="social-signin google"
            >
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
