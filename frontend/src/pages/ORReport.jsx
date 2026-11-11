import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getPatient,
  getPatientMedications,
  getPatientOrders,
  getPatientNotes,
} from "../services/patientService";

const OR_PATIENT_ID = 2;

const preparationItems = [
  { label: "NPO status confirmed", status: "Complete" },
  { label: "IV access", status: "Complete" },
  { label: "Consent", status: "Pending" },
  { label: "Required labs", status: "Complete" },
  { label: "Medication review", status: "Pending" },
  { label: "Transport", status: "Pending" },
];

export default function ORReport() {
  const [patient, setPatient] = useState(null);
  const [medications, setMedications] = useState([]);
  const [orders, setOrders] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function loadORReport() {
      const patientData = await getPatient(OR_PATIENT_ID);

      if (!patientData) {
        return;
      }

      setPatient(patientData);

      const [
        medicationData,
        orderData,
        noteData,
      ] = await Promise.all([
        getPatientMedications(OR_PATIENT_ID),
        getPatientOrders(OR_PATIENT_ID),
        getPatientNotes(OR_PATIENT_ID),
      ]);

      setMedications(medicationData);
      setOrders(orderData);
      setNotes(noteData);
    }

    loadORReport();
  }, []);

  if (!patient) {
    return (
      <div className="empty-state">
        <h2>Loading OR preparation...</h2>
      </div>
    );
  }

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
            <strong>Cholecystectomy</strong>
          </div>
        </div>
      </section>

      <div className="two-column-layout">
        <section className="section-card">
          <h2>Clinical Information</h2>

          <div className="report-section">
            <h3>Current Status</h3>
            <p>
              Patient is currently stable. Recent observations should
              be reviewed before transport.
            </p>
          </div>

          <div className="report-section">
            <h3>Relevant Medications</h3>

            {medications.length > 0 ? (
              medications.map((medication) => (
                <p key={medication.medication_id}>
                  {medication.medication_name} — {medication.status}
                </p>
              ))
            ) : (
              <p>No medications found.</p>
            )}
          </div>

          <div className="report-section">
            <h3>Active Orders</h3>

            {orders.length > 0 ? (
              orders.map((order) => (
                <p key={order.order_id}>
                  {order.order_type}: {order.description} — {order.status}
                </p>
              ))
            ) : (
              <p>No orders found.</p>
            )}
          </div>

          <div className="report-section">
            <h3>Recent Notes</h3>

            {notes.length > 0 ? (
              notes.slice(0, 3).map((note) => (
                <p key={note.note_id}>
                  {note.content}
                </p>
              ))
            ) : (
              <p>No recent notes found.</p>
            )}
          </div>
        </section>

        <section className="section-card">
          <div className="section-card-header">
            <h2>Preparation</h2>
            <span className="muted-text">OR checklist</span>
          </div>

          <div className="checklist">
            {preparationItems.map((item) => (
              <div
                className="checklist-row"
                key={item.label}
              >
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
            onClick={() =>
              alert("OR preparation summary generated.")
            }
          >
            Generate OR Prep Summary
          </button>
        </section>
      </div>
    </div>
  );
}