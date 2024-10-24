import { useState } from "react";
import axios from "axios";
import usePatients from "../../hooks/patient.zustand"; // Zustand store
import "./Login.css";

const Login = () => {
  const [adhar, setAdhar] = useState("");
  const setNewPatient = usePatients((state) => state.setNewPatient); // Zustand action

  // Handle Aadhar input change
  const handleAdharChange = (e) => {
    const input = e.target.value;
    setAdhar(input);

    // Fetch patient data when Aadhar is fully entered (12 digits)
    if (input.length >= 10) {
      loginPatient(input);
    }
  };

  // Function to login the patient by Aadhar
  const loginPatient = async (adhar) => {
    try {
      const response = await axios.get(`http://localhost:8000/getRecord/${adhar}`);
      console.log("Get Record Response:", response.data);

      // Set patient data in Zustand store
      const { name, DOB, publicAddress, email, contact, gender, adhar: fetchedAdhar } = response.data;
      const patient = { name, DOB, ImageUrl: response.data.url, email, publicAddress, contact, gender, adhar: fetchedAdhar };
      setNewPatient(patient);
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
    </div>
  );
};

export default Login;
