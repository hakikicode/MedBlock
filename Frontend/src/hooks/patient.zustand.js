import { create } from 'zustand';

// Define the initial patient data structure
const initialState = {
    patients: [
    {
        name: "Khuch TO HAi",
        DOB: "2-34-2224",
        ImageUrl: "https://picsum.photos/200/300?random=1",
        email: "ajiyesh@gamil.com",
        publicAddress: "0x7BEb7983B03e75B4b7F62E2B13256Aec92C223Fa",
        contact: "98438409442",
        gender: "Male",
        adhar: "12345678910",
    }

    ], // Start with an empty array of patients
    newPatient: null, // No new patient by default
};

//Patient arguments

//name
//DOB
//Image Url
//email
//publicAddress
//contact
//gender
//Adhar





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
