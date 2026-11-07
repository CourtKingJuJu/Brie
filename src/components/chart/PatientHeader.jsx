function calculateAge(dateOfBirth) {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
  
    let age = today.getFullYear() - birthDate.getFullYear();
  
    const monthDifference = today.getMonth() - birthDate.getMonth();
  
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
  
    return age;
  }
  
  function PatientHeader({ patient }) {
    const age = calculateAge(patient.date_of_birth);
  
    return (
      <div className="patient-header">
        <div className="patient-header-left">
          <div className="large-patient-avatar">
            {patient.first_name[0]}
            {patient.last_name[0]}
          </div>
  
          <div>
            <span className="eyebrow">PATIENT CHART</span>
  
            <h1>
              {patient.first_name} {patient.last_name}
            </h1>
  
            <div className="patient-meta">
              <span>{age} years old</span>
              <span>•</span>
              <span>Room {patient.room_number}</span>
              <span>•</span>
              <span>ID: {patient.patient_id}</span>
            </div>
          </div>
        </div>
  
        <div className="patient-header-right">
          <div className="code-status">
            <span>Code Status</span>
            <strong>{patient.code_status}</strong>
          </div>
  
          <div className="allergy-status">
            <span>Allergies</span>
            <strong>{patient.allergies}</strong>
          </div>
        </div>
      </div>
    );
  }
  
  export default PatientHeader;