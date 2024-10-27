import { useState } from "react";
import axios from "axios";
import usePatients from "../../hooks/patient.zustand"; // Zustand store
import "./SignUp.css";

const PatientSignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    DOB: "",
    ImageUrl: "",
    email: "",
    publicAddress: "",
    contact: "",
    gender: "",
    adhar: "",
  });

  const addPatient = usePatients((state) => state.addPatient); // Zustand action

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, DOB, ImageUrl, email, publicAddress, contact, gender, adhar } = formData;

    try {
      const response = await axios.post("http://localhost:8000/createRecord", {
        _publicAddress: publicAddress,
        _name: name,
        _DOB: DOB,
        _url: ImageUrl,
        _email: email,
        _control: "controlCode", // Dummy control code for now
        _gender: gender,
        _aadhar: adhar,
        _patientId: "patient123", // Dummy ID for now
      });

      console.log("Create Record Response:", response.data);

      // Add patient to Zustand store
      const newPatient = { ...formData };
      addPatient(newPatient);

      // Clear form
      setFormData({
        name: "",
        DOB: "",
        ImageUrl: "",
        email: "",
        publicAddress: "",
        contact: "",
        gender: "",
        adhar: "",
      });
    } catch (error) {
      console.error("Error creating patient record:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Patient Sign-Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input type="date" name="DOB" value={formData.DOB} onChange={handleChange} placeholder="Date of Birth" required />
        <input type="text" name="ImageUrl" value={formData.ImageUrl} onChange={handleChange} placeholder="Image URL" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="text" name="publicAddress" value={formData.publicAddress} onChange={handleChange} placeholder="Public Address" required />
        <input type="tel" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact Number" required />
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="text" name="adhar" value={formData.adhar} onChange={handleChange} placeholder="Aadhar" required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default PatientSignUp;
