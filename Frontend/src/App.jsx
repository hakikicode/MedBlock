import { useState } from "react";

import "./App.css";
import { Link } from "react-scroll";
import vid from "./d.mp4";
import logo from "./medblock-high-resolution-logo (1).png";
import Card from "./Components/Card";
//import Web3AuthComponent from "./Components/Web3Auth";
import TypeWriterEffect from "react-typewriter-effect";
import Navbar from "./Components/Navbar";
import doc from "./download (24).jpeg"
import patient from "./download (25).jpeg"
import Footer from "./Components/Footer";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Web3AuthComponent from "./Components/Web3Auth";
function App() {
  return (
    <>
    <Navbar/>
      <div className="app-container">
        <video className="video" autoPlay loop muted id="video">
          <source src={vid} type="video/mp4" />
        </video>

        <div className="app-navbar">
          <Link
            activeClass="active"
            to="contact"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
          >
            Doctor
          </Link>

          <Link
            activeClass="active"
            to="certifications"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
          >
            Patients
          </Link>

          <Link
            activeClass="active"
            to="projects"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
          >
            Sign Up
          </Link>
        </div>

        {/* <h1 className="welcome">MedBlock</h1> */}
        <h2 className="welcome-2">
          <TypeWriterEffect
            startDelay={2000}
            cursorColor="purple"
            repeat={true}
            typeSpeed={80}
            nextTextDelay={5000}
            multiText={["Decentralised", "Secure", "Accessible"]}
          />
        </h2>
        <h3 className="welcome-3">
          "Making your medical records easy to access<br></br> Totally
          transparent, all in one place."
        </h3>
      </div>

      <div className="pfp-container">
        <img src={logo} alt="MedBlock" className="pfp" />
      </div>
      
      <div style={styles.appContainer} id="home1">
      <h1>Login Here</h1>

        <Card
          imageSrc={doc}
          text1="Doctor"
          text2="Click to Login"
          text3=""
          onClick={() => handleClick("Card 1")}
        />
        <Card
          imageSrc={patient}
          text1="Patients"
          text2="Click to Login"
          text3=""
          onClick={() => handleClick("Card 2")}
        />
      </div>
      
      <div style={styles.appContainer} id="home2">
        
        <h1>Sign Up<br></br> Bring all your reports<br></br> at the tip of your Fingers!</h1>
        
        <Card
          imageSrc={doc}
          text1="Doctor"
          text2="Sign Up"
          text3=""
          onClick={() => handleClick("Card 1")}
        />
        <Card
          imageSrc={patient}
          text1="Patients"
          text2="Sign Up"
          text3=""
          onClick={() => handleClick("Card 2")}
        />
      </div>
      <Footer/>


      <Router>
      <nav>
          <ul>
            
              <li>
                  <Link to="/DoctorLogin">Web3AuthComponent</Link>
              </li>
              <li>
                  <Link to="/PatientSignUp">Web3AuthComponent</Link>
              </li>
          </ul>
      </nav>
      <Switch>
          
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
      </Switch>
      <Footer /> 
  </Router>



    </>
  );
}

const styles = {
  appContainer: {
      display: 'flex',
      padding: 20 ,
      gap: '40px',
      justifyContent: 'center',
      alignItems: 'center',
      height: '80vh',
      backgroundColor: '#4B0082', /* Purplish blue background */
      color: "white"
  },
};

export default App;
