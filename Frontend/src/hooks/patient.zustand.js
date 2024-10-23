{// import { create } from 'zustand';

// // Define the Patient type
// export type Patient = {
//     name: string;
//     DOB: string;
//     publicAddress: string;
//     email: string;
//     contact: string;
//     adhar: string;
// };

// // Define the state for managing patients
// interface PatientState {
//     patients: Patient[];
//     newPatient: Patient | null;
//     setNewPatient: (patient: Patient | null) => void;
//     addPatient: (patient: Patient) => void;
//     updatePatient: (publicAddress: string, updatedInfo: Partial<Patient>) => void;
//     removePatient: (publicAddress: string) => void;
// }

// // Initial state
// const initialState: PatientState = {
//     patients: [], // Start with an empty array of patients
//     newPatient: null, // No new patient by default
// };

// // Create the Zustand store
// const usePatients = create<PatientState>((set) => ({
//     ...initialState,

//     // Add a new patient
//     addPatient: (patient) =>
//         set((state) => ({ patients: [...state.patients, patient] })),

//     // Remove a patient by their publicAddress
//     removePatient: (publicAddress) =>
//         set((state) => {
//             const newPatients = state.patients.filter(
//                 (patient) => patient.publicAddress !== publicAddress
//             );
//             return {
//                 patients: newPatients,
//             };
//         }),

//     // Set a new patient in the state (can be used for temporary storage)
//     setNewPatient: (patient) => set(() => ({ newPatient: patient })),

//     // Update a patient's information by their publicAddress
//     updatePatient: (publicAddress, updatedInfo) =>
//         set((state) => {
//             const updatedPatients = state.patients.map((patient) =>
//                 patient.publicAddress === publicAddress
//                     ? { ...patient, ...updatedInfo }
//                     : patient
//             );
//             return {
//                 patients: updatedPatients,
//             };
//         }),
// }));

// export default usePatients;
}



import { create } from 'zustand';

// Define the initial patient data structure
const initialState = {
    patients: [], // Start with an empty array of patients
    newPatient: null, // No new patient by default
};

// Create the Zustand store for patient management
const usePatients = create((set) => ({
    ...initialState,
    
    // Add a new patient
    addPatient: (patient) =>
        set((state) => ({ patients: [...state.patients, patient] })),

    // Remove a patient by their publicAddress
    removePatient: (publicAddress) =>
        set((state) => {
            const newPatients = state.patients.filter(
                (patient) => patient.publicAddress !== publicAddress
            );
            return {
                patients: newPatients,
            };
        }),

    // Set a new patient in the state (can be used for temporary storage)
    setNewPatient: (patient) => set(() => ({ newPatient: patient })),

    // Update a patient's information by their publicAddress
    updatePatient: (publicAddress, updatedInfo) =>
        set((state) => {
            const updatedPatients = state.patients.map((patient) =>
                patient.publicAddress === publicAddress
                    ? { ...patient, ...updatedInfo }
                    : patient
            );
            return {
                patients: updatedPatients,
            };
        }),
}));

export default usePatients;
