import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPatients } from "../../services/patientService";

const handoffData = [
  {
    patientId: "1",
    priority: "High",
    summary:
      "SpO₂ has decreased across recent observations. CBC is currently ordered and the patient requires continued monitoring.",
    concerns: [
      "Monitor oxygen saturation",
      "Review CBC results when available",
      "Follow up on recent changes in respiratory status",
    ],
  },
  {
    patientId: "2",
    priority: "Medium",
    summary:
      "Patient refused scheduled Ramipril during the current shift. Refusal has been documented.",
    concerns: [
      "Follow up on medication refusal",
      "Review whether physician notification is required",
    ],
  },
];

function getPatient(patientList, patientId) {
  return patientList.find(
    (patient) => patient.patient_id === patientId
  );
}

export default function HandoffAssistant() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    async function loadPatients() {
      const data = await getPatients();
      setPatients(data);
    }

    loadPatients();
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Handoff Assistant</h1>
          <p>
            Review important patient information before shift handoff.
          </p>
        </div>

        <Link to="/assistance" className="secondary-button">
          ← Back to Assistance
        </Link>
      </div>

      <section className="section-card">
        <div className="section-card-header">
          <div>
            <h2>Shift Handoff</h2>
            <p>
              Outgoing nurse: <strong>Sarah Thompson, RN</strong>
              <br />
              Incoming nurse: <strong>Mike Johnson, RN</strong>
            </p>
          </div>

          <button
            className="primary-button"
            onClick={() =>
              alert("Mock handoff summary generated.")
            }
          >
            Generate Handoff Summary
          </button>
        </div>

        <div className="handoff-note">
          <strong>Handoff reminder</strong>
          <p>
            Review generated information before communicating the final handoff.
            This system does not replace clinical judgment.
          </p>
        </div>
      </section>

      <div className="handoff-patients">
        {handoffData.map((item) => {
          const patient = getPatient(patients, item.patientId);

          if (!patient) return null;

          return (
            <section className="section-card" key={item.patientId}>
              <div className="handoff-patient-header">
                <div>
                  <h2>
                    {patient.first_name} {patient.last_name}
                  </h2>
                  <span>Room {patient.room_number}</span>
                </div>

                <span
                  className={`priority-badge priority-badge-${item.priority.toLowerCase()}`}
                >
                  {item.priority} Priority
                </span>
              </div>

              <div className="handoff-summary">
                <h3>Current Summary</h3>
                <p>{item.summary}</p>
              </div>

              <div>
                <h3>Items to Communicate</h3>

                <ul className="handoff-list">
                  {item.concerns.map((concern) => (
                    <li key={concern}>{concern}</li>
                  ))}
                </ul>
              </div>

              <Link
                to={`/patients/${patient.patient_id}`}
                className="text-button"
              >
                Review Full Patient Chart →
              </Link>
            </section>
          );
        })}
      </div>
    </div>
  );
}