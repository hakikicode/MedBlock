import "./Doctor.css";
import { Link } from "react-scroll";
import vid from "../../assets/d.mp4";
import logo from "../../assets/medblock-high-resolution-logo (1).png";
import Card from "../Card/Card";
import TypeWriterEffect from "react-typewriter-effect";
import Navbar from "../Navbar/Navbar";
import doc from "../../assets/download (24).jpeg"
import patient from "../../assets/download (25).jpeg"
import Footer from "../Footer/Footer";
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import Web3AuthComponent from "./Components/Web3Auth";
function Doctor() {
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
            multiText={["Safe", "Secure", "Accessible"]}
          />
        </h2>
        <h3 className="welcome-3">
          "Making your medical records easy to access<br></br> 
          Totally transparent, all in one place."
        </h3>
      </div>

      <div className="pfp-container">
        <img src={logo} alt="MedBlock" className="pfp" />
      </div>
      
      {/* <div style={styles.appContainer} id="home1">
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
      </div> */}

    </>
  );
}


export default Doctor;