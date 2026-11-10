import { Link } from "react-router-dom";
import { patients } from "../data/mockData";

const patient = patients[0];

const preparationItems = [
  { label: "NPO status confirmed", status: "Pending" },
  { label: "IV access", status: "Complete" },
  { label: "Consent", status: "Complete" },
  { label: "Required labs", status: "Complete" },
  { label: "Medication review", status: "Pending" },
  { label: "Transport", status: "Pending" },
];

export default function ORReport() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>OR Preparation</h1>
          <p>
            Review information required for an upcoming procedure.
          </p>
        </div>
      </div>

      <section className="section-card">
        <div className="section-card-header">
          <div>
            <h2>Patient</h2>
            <p>
              {patient.first_name} {patient.last_name} · Room{" "}
              {patient.room_number}
            </p>
          </div>

          <Link
            to={`/patients/${patient.patient_id}`}
            className="secondary-button"
          >
            View Patient Chart
          </Link>
        </div>

        <div className="info-grid">
          <div>
            <span>Patient</span>
            <strong>
              {patient.first_name} {patient.last_name}
            </strong>
          </div>

          <div>
            <span>Date of Birth</span>
            <strong>{patient.date_of_birth}</strong>
          </div>

          <div>
            <span>Room</span>
            <strong>{patient.room_number}</strong>
          </div>

          <div>
            <span>Code Status</span>
            <strong>{patient.code_status}</strong>
          </div>

          <div>
            <span>Allergies</span>
            <strong>{patient.allergies}</strong>
          </div>

          <div>
            <span>Procedure</span>
            <strong>Mock Procedure</strong>
          </div>
        </div>
      </section>

      <div className="two-column-layout">
        <section className="section-card">
          <h2>Clinical Information</h2>

          <div className="report-section">
            <h3>Current Status</h3>
            <p>
              Patient is currently stable. Recent observations should be
              reviewed before transport.
            </p>
          </div>

          <div className="report-section">
            <h3>Relevant Medications</h3>
            <p>Acetaminophen — administered</p>
            <p>Ramipril — refused</p>
            <p>Enoxaparin — scheduled</p>
          </div>

          <div className="report-section">
            <h3>Active Orders</h3>
            <p>CBC — Active</p>
            <p>Chest X-Ray — Completed</p>
          </div>

          <div className="report-section">
            <h3>Recent Notes</h3>
            <p>
              Recent nursing documentation indicates a medication refusal
              during the current shift.
            </p>
          </div>
        </section>

        <section className="section-card">
          <div className="section-card-header">
            <h2>Preparation</h2>
            <span className="muted-text">Mock checklist</span>
          </div>

          <div className="checklist">
            {preparationItems.map((item) => (
              <div className="checklist-row" key={item.label}>
                <div className="checklist-box">
                  {item.status === "Complete" ? "✓" : ""}
                </div>

                <span>{item.label}</span>

                <span
                  className={
                    item.status === "Complete"
                      ? "status-complete"
                      : "status-pending"
                  }
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          <button
            className="primary-button full-width"
            onClick={() => alert("Mock OR preparation summary generated.")}
          >
            Generate OR Prep Summary
          </button>
        </section>
      </div>
    </div>
  );
}