import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap CSS is imported

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const popoverRef = useRef(null);
  const { loggedInUsername, logout } = useAuth();
  
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      <nav id="navmenu" className="navmenu">
        <div className="logo" data-aos="fade-right" data-aos-duration="1000">
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
              <div className="popover" data-aos="fade-down" data-aos-duration="500">
                <ul className="popover-content" type="none">
                  <li><Link to="/veg">VEG</Link></li>
                  <li><Link to="/nonveg">Non-VEG</Link></li>
                </ul>
              </div>
            )}
          </li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        {loggedInUsername ? (
          <DropdownButton id="dropdown-basic-button" title={loggedInUsername} className="ms-2">
            <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
            <Dropdown.Item onClick={() => {
              logout();
              navigate('/login');
            }}>Logout</Dropdown.Item>
          </DropdownButton>
        ) : (
          <Link to="/signupForm" className="btn btn-primary py-2 px-4">Sign Up</Link>
        )}
      </nav >
    </div >
  );
};

export default Navbar;