import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);  // Step 1: Manage login popup visibility
  const popoverRef = useRef(null);
  const { loggedInUsername, logout } = useAuth();
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!loggedInUsername) {
      setShowLoginPopup(true);  // Show the login popup if user is not logged in
    }
  }, [loggedInUsername]);

  const handleLogin = () => {
    setShowLoginPopup(false);  // Hide the popup after login
    navigate("/login");
  };

  return (
    <div className="navbar">
      <nav id="navmenu" className="navmenu">
        <div className="logo">
          <img src="/logo.png" alt="logo" />
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          &#9776;
        </div>
        <ul className={`nav-links ${menuVisible ? "active" : ""}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li onClick={toggleDropdown} className="menu-item" ref={popoverRef}>
            Menu <span className="arrow">&#9662;</span>
            {dropdownVisible && (
              <div className="popover">
                <ul className="popover-content">
                  <li><Link to="/veg" className="dropDownItem">Veg</Link></li>
                  <li><Link to="/nonveg" className="dropDownItem">Non-Veg</Link></li>
                </ul>
              </div>
            )}
          </li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        {loggedInUsername ? (
          <DropdownButton
            id="dropdown-basic-button"
            title={typeof loggedInUsername === "string" ? loggedInUsername : "User"}
            className="ms-2"
          >
            <Dropdown.Item onClick={() => navigate("/profile")}>Profile</Dropdown.Item>
            <Dropdown.Item onClick={() => {
              logout();
              navigate("/login");
            }}>Logout</Dropdown.Item>
          </DropdownButton>
        ) : (
          <Link to="/signupForm" className="btn btn-primary">Sign Up</Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;