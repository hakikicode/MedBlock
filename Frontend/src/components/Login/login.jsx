import React,{ useState } from "react";
import axios from "axios";
import usePatients from "../../hooks/patient.zustand"; // Zustand store
import { useNavigate } from "react-router-dom"; // For navigation
import "./Login.css";
import Navbar from "../Navbar/Navbar";
import vid from "../../assets/d.mp4"
import PatientSignUp from "../SignUp/patientSignUp";
import LoginPatient1 from "./LoginPatient1";

const Login = () => {
  const [adhar, setAdhar] = useState("");
  const setNewPatient = usePatients((state) => state.setNewPatient); // Zustand action
  const navigate = useNavigate(); // Navigation hook
  const newPatient =usePatients((state) => state.newPatient);

  // Handle Aadhar input change
  const handleAdharChange = (e) => {
    const input = e.target.value;
    setAdhar(input);
  };

//   const [selectedOption, setSelectedOption] = useState('');

//   const handleChange = (event) => {
//     setSelectedOption(event.target.value);
// };

  // Function to login the patient by Aadhar
  const loginPatient = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/getRecord/${adhar}`);
      console.log("Get Record Response:", response.data);

      // Set patient data in Zustand store
      const { name, DOB, publicAddress, email, contact, gender, adhar: fetchedAdhar } = response.data;

      const patient =response.data;
      setNewPatient(patient);
      


      // Navigate to the Patient Page
      navigate("/Patient");
    } catch (error) {
      console.error("Error fetching patient record:", error);
    }
  };

  return (
    <>
      <Navbar />
      {/* <div className="app-container"> */}
        <video className="video" autoPlay loop muted id="video">
          <source src={vid} type="video/mp4" />
        </video>
        {/* </div> */}



{/*     
    <div className="login-container">
      <h2>Patient Login</h2>
      <input
        type="text"
        value={adhar}
        onChange={handleAdharChange}
        placeholder="Enter your Aadhar Number"
        className="login-input"
        maxLength="12"
      />
      <button onClick={loginPatient}>Login</button>
    </div> */}

    <div>
           
            {/* <select className="dropdown1" onChange={handleChange}>
            <option value="">Choose your Login Method</option>
                <option value="showComponent">Sign Up</option>
                <option value="hideComponent">Login</option>
            </select>
              
           
            {selectedOption === 'showComponent' && <SignUpPatient />}
            {selectedOption === 'hideComponent' && <LoginPatient />} */}
          <LoginPatient1/>
        </div>



    </>
  );
};

// const SignUpPatient = () => {
//   return (
//       <div>
//           <PatientSignUp/>
//       </div>
//   );
// };

// const LoginPatient = () => {
//   return (
//       <div>
//           <LoginPatient1/>
//       </div>
//   );
// };

export default Login;
