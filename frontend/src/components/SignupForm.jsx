import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    mobile: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, mobile, email, password, password2 } = formData;

    if (password !== password2) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, mobile, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate("/Login");
      } else {
        alert(data.error || "Failed to register");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error registering new user");
    }
  };

  const handleLoginRedirect = () => {
    navigate("/Login");
  };

  return (
    <div className="bodysign">
      <form id="login-box" onSubmit={handleSubmit} data-aos="fade-out"
      data-aos-duration="3000">
        <div className="left">
          <h1><b>Sign Up</b></h1>
          
          <input
            type="text"
            name="username"
            placeholder="Username :"
            required
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="number"
            name="mobile"
            placeholder="Mobile No :"
            required
            value={formData.mobile}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail :"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password2"
            placeholder="Retype password"
            required
            value={formData.password2}
            onChange={handleChange}
          />
          
          <input type="submit" name="signup_submit" value="Sign me up" />
          
          <button type="button" onClick={handleLoginRedirect} className="btn5">
            Already have an account? Login
          </button>
        </div>
        
        <div className="right">
          <span className="loginwith">Sign in with<br />social network</span>
          
          <button type="button" className="social-signin facebook">Log in with Facebook</button>
          <button type="button" className="social-signin twitter">Log in with Twitter</button>
          <button type="button" className="social-signin google">Log in with Google+</button>
        </div>
        <div className="or">OR</div>
      </form>
    </div>
  );
};
export default SignupForm;
