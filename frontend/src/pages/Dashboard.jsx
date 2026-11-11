import { useEffect, useState } from "react";
import PatientList from "../components/patients/PatientList";
import { currentNurse } from "../data/mockData";
import { getPatients } from "../services/patientService";

function Dashboard() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    async function loadPatients() {
      const data = await getPatients();
      setPatients(data);
    }

    loadPatients();
  }, []);

  return (
    <div>
      <div className="page-heading">
        <div>
          <span className="eyebrow">FRIDAY · NOVEMBER 6, 2026</span>

          <h1>
            Good evening, {currentNurse.first_name}
          </h1>

          <p>
            Here is an overview of your current patients and shift.
          </p>
        </div>

        <div className="shift-card">
          <span>Current shift</span>
          <strong>Day Shift</strong>
          <small>07:00 – 19:00</small>
        </div>
      </div>

      <section className="dashboard-stats">
        <div className="stat-card">
          <span>MY PATIENTS</span>
          <strong>{patients.length}</strong>
          <small>Active assignments</small>
        </div>

        <div className="stat-card">
          <span>WARD</span>
          <strong>4B</strong>
          <small>General Medicine</small>
        </div>

        <div className="stat-card">
          <span>SHIFT</span>
          <strong>Day</strong>
          <small>07:00 – 19:00</small>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <h2>My Patients</h2>
            <p>Patients currently assigned to you.</p>
          </div>

          <span className="patient-count">
            {patients.length} patients
          </span>
        </div>

        <PatientList patients={patients} />
      </section>
    </div>
  );
}

export default Dashboard;