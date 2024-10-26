// import "./Doctor.css";
// import { useState, useEffect } from "react";
// import { getAccounts, getMedicalRecord } from "../../utils/web3";
// import usePatients from "../../hooks/patient.zustand"; // Zustand hook
// import vid from "../../assets/d.mp4";
// import logo from "../../assets/medblock-high-resolution-logo (1).png";
// import TypeWriterEffect from "react-typewriter-effect";
// import Navbar from "../Navbar/Navbar";
// import axios from "axios";

// function Doctor() {
//   const [account, setAccount] = useState(null);
//   const [patient, setPatient] = useState(null); // State for selected patient
//   const [allPatients, setAllPatients] = useState([]); // State for all fetched patients
//   const [searchQuery, setSearchQuery] = useState(''); // Search query state
//   const [filteredPatients, setFilteredPatients] = useState([]); // Filtered patients based on search
//   const [medicalRecords, setMedicalRecords] = useState([]); // State for storing medical records



//   const patients = usePatients((state) => state.patients); // Zustand hook at the top level
//   const addPatient = usePatients((state) => state.addPatient); // Zustand action to add a patient

//   // Fetch all patients from the web2 API on mount
//   useEffect(() => {
//     const fetchPatients = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/getAllPatients');
//         console.log(response.data);
//         setAllPatients(response.data); // Store fetched patients
//         setFilteredPatients(response.data); // Initially, all patients are shown
//       } catch (error) {
//         console.error("Error fetching patients:", error);
//       }
//     };
//     fetchPatients();
//   }, []);

//   // Function to connect the wallet
//   const connectWallet = async () => {
//     try {
//       const accounts = await getAccounts();
//       setAccount(accounts[0]);
//       console.log("Connected account:", accounts[0]);
//     } catch (error) {
//       console.error("Error connecting wallet:", error);
//     }
//   };

//   // Function to search patients by Aadhar number
//   const handleSearch = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     if (query === "") {
//       setFilteredPatients(allPatients); // Show all patients if search query is empty
//     } else {
//       const filtered = allPatients.filter((patient) => patient.aadhar.includes(query));
//       setFilteredPatients(filtered); // Filter patients based on search query
//     }
//   };

//   // Function to select a patient from the search results
//   const selectPatient = async (selectedPatient) => {
//     setPatient(selectedPatient); // Set the selected patient
//     const medicalRecords = await handleGetMedicalRecord(selectedPatient.publicAddress); // Fetch medical record via Web3
//     setMedicalRecords(medicalRecords); // Store fetched medical records
//   };

//   // Function to get a medical record using the Web3 contract
//   const handleGetMedicalRecord = async (publicAddress) => {
//     try {
//       if (!publicAddress) {
//         console.log("No public address provided");
//         return;
//       }
//       const medicalRecord = await getMedicalRecord(publicAddress);
//       console.log("Medical Record:", medicalRecord);
//       return medicalRecord; // Return the fetched medical record
//     } catch (e) {
//       console.error("Error fetching medical record:", e);
//     }
//   };

//     // Function to update a patient's medical record
//   const handleUpdateMedicalRecord = async () => {

//     try {

//       //get html element defined in the component by document by id -update record and set variable record to thta

//       const updateRecord = document.getElementById("update-record");
//       const record = updateRecord;
//       console.log("Patient Addrss: ",patient);
//       console.log("updated record: ",record);
//       //const updatedRecord = await updateRecordByDoctor(patient.publicAddress, "Test record");
//       //console.log(updatedRecord);
//     } catch (error) {
//       console.error("Error updating medical record:", error);
//     }
//   };

//   // Render the selected patient's details and medical records
//   const renderPatientDetails = () => {
//     if (!patient) return null;
//     return (
//       <div className="patient-details">
//         <img src={patient.url} alt="Patient" className="patient-image" />
//         <h3>{patient.name}</h3>
//         <p>Aadhar: {patient.adhar}</p>
//         <p>Email: {patient.email}</p>
//         <p>Public Address: {patient.publicAddress}</p>

//         {/* Render medical records */}
//         <div className="medical-records">
//           <h4>Medical Records:</h4>
//           {medicalRecords.length > 0 ? (
//             medicalRecords.map((record, index) => (
//               <p key={index}>
//                 <strong>Record {index + 1}:</strong> {record}
//               </p>
//             ))
//           ) : (
//             <p>No medical records found</p>
//           )}

//           <div>
//             <button onClick={() => handleGetMedicalRecord(patient.publicAddress)}></button>

           

//             <input
//               type="text"
//               id="search"
//               value={searchQuery}
//               onChange={handleSearch}
//               placeholder="Update record"
//               className="update-Record"
//             />

//             <button onClick={handleUpdateMedicalRecord}>Update Record</button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="app-container">
//         <video className="video" autoPlay loop muted id="video">
//           <source src={vid} type="video/mp4" />
//         </video>
//         <h2 className="welcome-2">
//           {/* <TypeWriterEffect
//             startDelay={2000}
//             cursorColor="purple"
//             repeat={true}
//             typeSpeed={80}
//             nextTextDelay={5000}
//             multiText={["Safe", "Secure", "Accessible"]}
//           /> */}
//         </h2>
//         {/* <h3 className="welcome-3">
//           "Making your medical records easy to access
//           <br />
//           Totally transparent, all in one place."
//         </h3> */}
//       </div>

//       <div className="pfp-container">
//         <img src={logo} alt="MedBlock" className="pfp" />
//       </div>

//       {/* Search bar */}
//       <input
//         type="text"
//         id="search"
//         value={searchQuery}
//         onChange={handleSearch}
//         placeholder="Search by Aadhar number"
//         className="search-bar"
//       />

//       {/* Display search results */}
//       <div className="search-results">
//         {filteredPatients.map((patient, index) => (
//           <div key={index} className="search-result" onClick={() => selectPatient(patient)}>
//             <img src={patient.url} alt={patient.name} className="result-image" />
//             <p>{patient.name}</p>
//           </div>
//         ))}
//       </div>

//       {/* Render selected patient's details */}
//       {renderPatientDetails()}

//       {/* Action buttons */}
//       <button className="btn" onClick={connectWallet}>Connect Wallet</button>
//     </>
//   );
// }

// export default Doctor;
import "./Doctor.css";
import { useState, useEffect } from "react";
import { getAccounts, getMedicalRecord, updateRecordByDoctor } from "../../utils/web3"; // Added updateRecordByDoctor
import usePatients from "../../hooks/patient.zustand"; // Zustand hook
import vid from "../../assets/d.mp4";
import logo from "../../assets/medblock-high-resolution-logo (1).png";
import TypeWriterEffect from "react-typewriter-effect";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import Footer from "../Footer/Footer";

function Doctor() {
  const [account, setAccount] = useState(null);
  const [patient, setPatient] = useState(null); // State for selected patient
  const [allPatients, setAllPatients] = useState([]); // State for all fetched patients
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [searchBy, setSearchBy] = useState('aadhar'); // Search filter option
  const [filteredPatients, setFilteredPatients] = useState([]); // Filtered patients based on search
  const [medicalRecords, setMedicalRecords] = useState([]); // State for storing medical records
  const [newRecord, setNewRecord] = useState(''); // New record input

  const patients = usePatients((state) => state.patients); // Zustand hook at the top level
  const addPatient = usePatients((state) => state.addPatient); // Zustand action to add a patient

  // Fetch all patients from the web2 API on mount
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8000/getAllPatients');
        console.log(response.data);
        setAllPatients(response.data); // Store fetched patients
        setFilteredPatients(response.data); // Initially, all patients are shown
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  // Function to connect the wallet
  const connectWallet = async () => {
    try {
      const accounts = await getAccounts();
      setAccount(accounts[0]);

      console.log("Connected account:", account);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // Function to search patients by selected option (name, Aadhar, or email)
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      setFilteredPatients(allPatients); // Show all patients if search query is empty
    } else {
      let filtered;
      if (searchBy === 'aadhar') {
        filtered = allPatients.filter((patient) => patient.aadhar.includes(query));
      } else if (searchBy === 'name') {
        filtered = allPatients.filter((patient) => patient.name.toLowerCase().includes(query.toLowerCase()));
      } else if (searchBy === 'email') {
        filtered = allPatients.filter((patient) => patient.email.toLowerCase().includes(query.toLowerCase()));
      }
      setFilteredPatients(filtered); // Filter patients based on search query and selected option
    }
  };

  // Function to select a patient from the search results
  const selectPatient = async (selectedPatient) => {
    setPatient(selectedPatient); // Set the selected patient
    const medicalRecords = await handleGetMedicalRecord(selectedPatient.publicAddress); // Fetch medical record via Web3
    setMedicalRecords(medicalRecords); // Store fetched medical records
  };

  // Function to get a medical record using the Web3 contract
  const handleGetMedicalRecord = async (publicAddress) => {
    try {
      if (!publicAddress) {
        console.log("No public address provided");
        return;
      }
      const medicalRecord = await getMedicalRecord(publicAddress,account);
      console.log("Medical Record:", medicalRecord);
      return medicalRecord; // Return the fetched medical record
    } catch (e) {
      console.error("Error fetching medical record:", e);
      console.log("DOCTOR NOT CONNECTED");
      return ["YOU ARE NOT A DOCTOR"];
    }
  };

  // Function to update a patient's medical record
  const handleUpdateMedicalRecord = async () => {
    try {
      if (!patient || !newRecord) {
        console.error("No patient selected or record entered.");
        return;
      }

      const updatedRecord = await updateRecordByDoctor(patient.publicAddress, newRecord);
      console.log("Updated record:", updatedRecord);


      // Optionally, update the state to reflect the new record in the UI
      setMedicalRecords([...medicalRecords, newRecord]);
      setNewRecord(''); // Clear the input after updating
    } catch (error) {
      console.error("Error updating medical record:", error);
    }
  };

  // Render the selected patient's details and medical records
  const renderPatientDetails = () => {
    if (!patient) return null;
    return (
      <div className="patient-details">
        <img src={patient.url} alt="Patient" className="patient-image" />
        <h3>{patient.name}</h3>
        <p>Aadhar: {patient.aadhar}</p>
        <p>Email: {patient.email}</p>
        {/* <p>Public Address: {patient.publicAddress}</p> */}

        {/* Render medical records */}
        <div className="medical-records">
          <h4>Medical Records:</h4>
          {medicalRecords.length > 0 ? (
            medicalRecords.map((record, index) => (
              <p key={index}>
                <strong>Record {index + 1}:</strong> {record}
              </p>
            ))
          ) : (
            <p>No medical records found</p>
          )}

          <div>
            <input
              type="text"
              value={newRecord}
              onChange={(e) => setNewRecord(e.target.value)}
              placeholder="Update record"
              className="update-Record"
            />

            <button onClick={handleUpdateMedicalRecord}>Update Record</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="app-container">
        <video className="video" autoPlay loop muted id="video">
          <source src={vid} type="video/mp4" />
        </video>
        
      </div>

     

      

     <div className="login-container">
     
      <div className="search-filter">
        <label htmlFor="searchBy">Search by:</label>
        <select id="searchBy" value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
          <option value="aadhar">Aadhar</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>
      </div>

      {/* Search bar */}
      <input
        type="text"
        id="search"
        value={searchQuery}
        onChange={handleSearch}
        placeholder={`Search by ${searchBy}`}
        className="search-bar"
      />

      {/* Display search results */}
      <div className="search-results">
        {filteredPatients.map((patient, index) => (
          <div key={index} className="search-results-item" onClick={() => selectPatient(patient)}>
            <img src={patient.url} alt={patient.name} className="result-image" />
            <p>{patient.name}</p>
          </div>
        ))}
      </div>
<div>
      {/* Render selected patient's details */}
      {renderPatientDetails()}

      {/* Action buttons */}
      <button onClick={connectWallet}>Connect Wallet</button>
      </div>
      </div>
     
      
    </>
  );
}

export default Doctor;
