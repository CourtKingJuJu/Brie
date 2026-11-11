import PatientCard from "./PatientCard";

function PatientList({ patients }) {
  if (!patients.length) {
    return (
      <div className="empty-state">
        <h3>No patients assigned</h3>
        <p>You currently have no active patient assignments.</p>
      </div>
    );
  }

  return (
    <div className="patient-list">
      {patients.map((patient) => (
        <PatientCard key={patient.patient_id} patient={patient} />
      ))}
    </div>
  );
}

export default PatientList;