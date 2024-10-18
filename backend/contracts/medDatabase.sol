// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicalRecords {

    // Struct to hold patient medical data
    struct Patient {
        address[] doctors;        // Array of doctors treating the patient
        string[] medicalData;     // Array to store medical data (e.g., file hashes later)
    }

    // Mappings
    mapping(address => Patient) private patients;     // Maps a patient's public address to their medical records
    mapping(address => bool) public verifiedDoctors;  // Stores verified doctors

    address owner;

    // Constructor to set the owner and add the first doctor
    constructor( address _doctor) {
        owner = msg.sender;
        addNewDoctor(_doctor);  // Only the owner can add the first doctor
    }

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    modifier onlyDoctor() {
        require(verifiedDoctors[msg.sender], "Only verified doctors can perform this action");
        _;
    }

    modifier patientExists(address _patient) {
        require(patients[_patient].doctors.length > 0 && patients[_patient].medicalData.length > 0, "Patient record does not exist");
        _;
    }

    // Function to add a new doctor (only owner can add new doctors)
    function addNewDoctor(address _doctor) public onlyOwner {
        require(!verifiedDoctors[_doctor], "Doctor already exists");
        verifiedDoctors[_doctor] = true;
    }
    
    // Function for a patient to update their own medical record
    function updateRecordByPatient(string memory _record) public  { //if not exists ,this will create it.
        patients[msg.sender].medicalData.push(_record);
        // Patient updates their own record, no need to update the doctor
    }

    // Function for a doctor to update a patient's medical record
    function updateRecordByDoctor(address _patient, string memory _record) public onlyDoctor  { //if not exists it will create it
        patients[_patient].medicalData.push(_record);

        // Ensure the doctor isn't added multiple times
        bool doctorExists = false;
        for (uint i = 0; i < patients[_patient].doctors.length; i++) {
            if (patients[_patient].doctors[i] == msg.sender) {
                doctorExists = true;
                break;
            }
        }
        if (!doctorExists) {
            patients[_patient].doctors.push(msg.sender);  // Add doctor if not already in the list
        }
    }

    // Unified function to get medical records (for patient or doctor)
    function getMedicalRecord(address _patient) public view returns (string[] memory) {
        require(msg.sender == _patient || verifiedDoctors[msg.sender], "Access denied: Only patient or doctor can view records");

        if(patients[_patient].medicalData.length > 0)
        return patients[_patient].medicalData;
        //else return no medical records found
        else{
            string [] memory records = new string[](1);
            records[0] = "No records found";
            return records;
        }

    }

    // Function to get list of doctors treating a patient
    function getDoctors(address _patient) public view patientExists(_patient) returns (address[] memory) {
        require(msg.sender == _patient || verifiedDoctors[msg.sender], "Access denied: Only patient or doctor can view doctors");
        return patients[_patient].doctors;
    }
    
}
