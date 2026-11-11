import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { currentNurse } from "../data/mockData";
import { getPatients } from "../services/patientService";

const priorityPatients = [
  {
    patientId: 1,
    priority: "High",
    reason: "SpO₂ has decreased across recent observations.",
    action: "Check oxygen status and review recent observations.",
  },
  {
    patientId: 2,
    priority: "Medium",
    reason: "Medication was refused during the current shift.",
    action: "Follow up on medication refusal.",
  },
  {
    patientId: 3,
    priority: "Stable",
    reason: "No significant changes in recent observations.",
    action: "Continue routine monitoring.",
  },
  {
    patientId: 4,
    priority: "Stable",
    reason: "No immediate concerns identified.",
    action: "Continue routine monitoring.",
  },
];

function getPatient(patientList, patientId) {
  return patientList.find(
    (patient) => patient.patient_id === patientId
  );
}

export default function Assistance() {

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
          <h1>Assistance</h1>
          <p>
            Support tools based on information currently available in the
            Hospital EHR.
          </p>
        </div>
      </div>

      <div className="assistance-actions">
        <Link to="/assistance/handoff" className="assistance-card">
          <div className="assistance-card-icon">↗</div>
          <div>
            <h3>Handoff Assistant</h3>
            <p>
              Prepare a concise shift handoff using recent patient information.
            </p>
          </div>
        </Link>

        <div className="assistance-card disabled-card">
          <div className="assistance-card-icon">✎</div>
          <div>
            <h3>Documentation Assistant</h3>
            <p>
              Assist with preparing documentation from existing chart
              information.
            </p>
            <span>Coming with MAS</span>
          </div>
        </div>
      </div>

      <section className="section-card">
        <div className="section-card-header">
          <div>
            <h2>Priority Overview</h2>
            <p>
              Current patients assigned to {currentNurse.first_name}{" "}
              {currentNurse.last_name}.
            </p>
          </div>

          <button className="secondary-button">
            Generate Priority Summary
          </button>
        </div>

        <div className="priority-list">
          {priorityPatients.map((item) => {
            const patient = getPatient(patients, item.patientId);

            if (!patient) return null;

            return (
              <div
                key={item.patientId}
                className={`priority-row priority-${item.priority.toLowerCase()}`}
              >
                <div className="priority-indicator" />

                <div className="priority-patient">
                  <strong>
                    {patient.first_name} {patient.last_name}
                  </strong>
                  <span>Room {patient.room_number}</span>
                </div>

                <div className="priority-level">
                  {item.priority}
                </div>

                <div className="priority-reason">
                  <strong>{item.reason}</strong>
                  <span>{item.action}</span>
                </div>

                <Link
                  to={`/patients/${patient.patient_id}`}
                  className="text-button"
                >
                  View Chart →
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}