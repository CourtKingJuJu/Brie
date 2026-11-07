import {
    patients,
    assignments,
    observations,
    medications,
    orders,
    notes,
  } from "../data/mockData";
  
  export async function getAssignedPatients(nurseId) {
    const nurseAssignments = assignments.filter(
      (assignment) =>
        assignment.nurse_id === nurseId && assignment.end_time === null
    );
  
    return nurseAssignments
      .map((assignment) =>
        patients.find(
          (patient) => patient.patient_id === assignment.patient_id
        )
      )
      .filter(Boolean);
  }
  
  export async function getPatient(patientId) {
    return patients.find((patient) => patient.patient_id === patientId);
  }
  
  export async function getPatientObservations(patientId) {
    return observations.filter(
      (observation) => observation.patient_id === patientId
    );
  }
  
  export async function getPatientMedications(patientId) {
    return medications.filter(
      (medication) => medication.patient_id === patientId
    );
  }
  
  export async function getPatientOrders(patientId) {
    return orders.filter((order) => order.patient_id === patientId);
  }
  
  export async function getPatientNotes(patientId) {
    return notes.filter((note) => note.patient_id === patientId);
  }