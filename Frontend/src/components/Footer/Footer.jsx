import React from 'react';
import './Footer.css'; // Import the CSS file
import logo from "../../assets/medblock-high-resolution-logo (1).png"

const Footer = () => {
    return (
        <footer className="footer" id="contact">
            <div className="footer-content">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="button-column">
                    <button>Button 1</button>
                    <button>Button 2</button>
                    <button>Button 3</button>
                    <button>Button 4</button>
                </div>
            </div>
            <div className="rights-reserved">
                &copy; 2024 Your Company. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
