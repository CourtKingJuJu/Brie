function Overview({ patient }) {
    return (
      <section className="chart-section">
        <div className="chart-section-header">
          <div>
            <h2>Patient Overview</h2>
            <p>Basic patient and admission information.</p>
          </div>
        </div>
  
        <div className="overview-grid">
          <div className="info-field">
            <span>Full Name</span>
            <strong>
              {patient.first_name} {patient.last_name}
            </strong>
          </div>
  
          <div className="info-field">
            <span>Room</span>
            <strong>{patient.room_number}</strong>
          </div>
  
          <div className="info-field">
            <span>Date of Birth</span>
            <strong>{patient.date_of_birth}</strong>
          </div>
  
          <div className="info-field">
            <span>Admission Date</span>
            <strong>
              {new Date(patient.admission_date).toLocaleDateString()}
            </strong>
          </div>
  
          <div className="info-field">
            <span>Code Status</span>
            <strong>{patient.code_status}</strong>
          </div>
  
          <div className="info-field">
            <span>Allergies</span>
            <strong>{patient.allergies}</strong>
          </div>
        </div>
      </section>
    );
  }
  
  export default Overview;