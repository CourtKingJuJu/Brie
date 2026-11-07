import { useNavigate } from "react-router-dom";

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

function PatientCard({ patient }) {
  const navigate = useNavigate();

  const age = calculateAge(patient.date_of_birth);

  return (
    <button
      className="patient-card"
      onClick={() => navigate(`/patients/${patient.patient_id}`)}
    >
      <div className="patient-card-main">
        <div className="patient-avatar">
          {patient.first_name[0]}
          {patient.last_name[0]}
        </div>

        <div className="patient-info">
          <h3>
            {patient.first_name} {patient.last_name}
          </h3>

          <span>
            {age} years old · Room {patient.room_number}
          </span>
        </div>
      </div>

      <div className="patient-card-status">
        <span className="stable-dot"></span>
        Stable
      </div>

      <span className="patient-arrow">→</span>
    </button>
  );
}

export default PatientCard;