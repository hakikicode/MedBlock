// Navbar.js
import React from 'react';
import './Navbar.css'; // Importing the CSS file
import logo from "../medblock-high-resolution-logo (1).png";
const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="navbar-links">
                <a href="#home1" className="nav-item">Login</a>
                <a href="#home2" className="nav-item">Register</a>
                <a href="#contact" className="nav-item">Talk to Us</a>
            </div>
        </nav>
    );
};

export default Navbar;
