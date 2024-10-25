import { useState } from "react";
import axios from "axios";
import usePatients from "../../hooks/patient.zustand"; // Zustand store
import { useNavigate } from "react-router-dom"; // For navigation
import "./Login.css";

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

  // Function to login the patient by Aadhar
  const loginPatient = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/getRecord/${adhar}`);
      console.log("Get Record Response:", response.data);

      // Set patient data in Zustand store
      const { name, DOB, publicAddress, email, contact, gender, adhar: fetchedAdhar } = response.data;

      const patient =response.data;
      setNewPatient(patient);

      //check if the zustand state is updated
      


      // Navigate to the Patient Page
      navigate("/Patient");
    } catch (error) {
      console.error("Error fetching patient record:", error);
    }
  };

  return (
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
    </div>
  );
};

export default Login;
