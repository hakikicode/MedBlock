// Navbar.js
import React from 'react';
import './Navbar.css'; // Importing the CSS file
import logo from "../../assets/medblock-high-resolution-logo (1).png";
import Footer from '../Footer/Footer';
const Navbar = () => {
    return (
        <>
        <nav className="navbar">
            <div className="navbar-logo">
            <a href="/">
        <img src={logo} alt="Logo" />
    </a>
            </div>
            <div className="navbar-links">
                <a href="#Login" className="nav-item">Login</a>
                {/* <a href="#home2" className="nav-item">Register</a> */}
                <a href="#Footer" className="nav-item">Talk to Us</a>
            </div>
            
        </nav>
        
        </>
    );
};

export default Navbar;
