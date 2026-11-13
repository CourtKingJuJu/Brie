import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PatientHeader from "../components/chart/PatientHeader";
import Overview from "../components/chart/Overview";
import Observations from "../components/chart/Observations";
import Medications from "../components/chart/Medications";
import Orders from "../components/chart/Orders";
import Notes from "../components/chart/Notes";

import {
  getPatient,
  getPatientObservations,
  getPatientMedications,
  getPatientOrders,
  getPatientNotes,
  getPatientContext,
} from "../services/patientService";

function PatientChart() {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [observations, setObservations] = useState([]);
  const [medications, setMedications] = useState([]);
  const [orders, setOrders] = useState([]);
  const [notes, setNotes] = useState([]);

  const [context, setContext] = useState(null);
  const [contextLoading, setContextLoading] = useState(true);
  const [contextError, setContextError] = useState(false);
  const [showEvidence, setShowEvidence] = useState(false);

  useEffect(() => {
    async function loadChart() {
      setContextLoading(true);
      setContextError(false);
      setShowEvidence(false);

      try {
        const patientData = await getPatient(patientId);

        if (!patientData) {
          setPatient(null);
          return;
        }

        setPatient(patientData);

        const [
          observationData,
          medicationData,
          orderData,
          noteData,
          contextData,
        ] = await Promise.all([
          getPatientObservations(patientId),
          getPatientMedications(patientId),
          getPatientOrders(patientId),
          getPatientNotes(patientId),
          getPatientContext(patientId),
        ]);

        setObservations(observationData);
        setMedications(medicationData);
        setOrders(orderData);
        setNotes(noteData);
        setContext(contextData);
      } catch (error) {
        console.error("Failed to load patient chart:", error);
        setContextError(true);
      } finally {
        setContextLoading(false);
      }
    }

    loadChart();
  }, [patientId]);

  if (!patient) {
    return (
      <div className="empty-state">
        <h2>Patient not found</h2>

        <button
          className="secondary-button"
          onClick={() => navigate("/patients")}
        >
          Return to patients
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        className="back-button"
        onClick={() => navigate("/patients")}
      >
        ← Back to My Patients
      </button>

      <PatientHeader patient={patient} />

      {/* AI Patient Context */}
      <section className="context-card">
        <div className="context-card-header">
          <div>
            <div className="context-card-title">
              <span className="context-icon">✦</span>
              <h2>Patient Context</h2>
              <span className="context-badge">AI Assist</span>
            </div>

            <p className="context-card-subtitle">
              Relevant documented context identified from the patient record.
            </p>
          </div>

          {context && (
            <button
              className="secondary-button"
              onClick={() => setShowEvidence((current) => !current)}
            >
              {showEvidence ? "Hide Evidence" : "View Evidence"}
            </button>
          )}
        </div>

        {contextLoading && (
          <div className="context-loading">
            Generating patient context...
          </div>
        )}

        {contextError && !contextLoading && (
          <div className="context-error">
            Unable to generate patient context.
          </div>
        )}

        {context && !contextLoading && !contextError && (
          <>
            <p className="context-summary">{context.summary}</p>

            {showEvidence && (
              <div className="context-evidence">
                <h3>Supporting Evidence</h3>

                {context.important_context.map((item, index) => (
                  <div className="context-finding" key={index}>
                    <p className="context-finding-text">
                      {item.text}
                    </p>

                    <div className="context-evidence-list">
                      {item.evidence.map((evidence, evidenceIndex) => (
                        <span
                          className="evidence-tag"
                          key={`${evidence.source_type}-${evidence.source_id}-${evidenceIndex}`}
                        >
                          {evidence.source_type} #{evidence.source_id}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <div className="chart-tabs">
        <a href="#overview">Overview</a>
        <a href="#observations">Observations</a>
        <a href="#medications">Medications</a>
        <a href="#orders">Orders</a>
        <a href="#notes">Notes</a>
        <a href="#handoff">Handoff / Shift Plan</a>
      </div>

      <div className="chart-content">
        <div id="overview">
          <Overview patient={patient} />
        </div>

        <div id="observations">
          <Observations observations={observations} />
        </div>

        <div id="medications">
          <Medications medications={medications} />
        </div>

        <div id="orders">
          <Orders orders={orders} />
        </div>

        <div id="notes">
          <Notes notes={notes} />
        </div>

        <section className="section-card" id="handoff">
          <div className="section-card-header">
            <div>
              <h2>Handoff / Shift Plan</h2>
              <p>Information for the next shift.</p>
            </div>
          </div>

          <div className="report-section">
            <h3>Current Status</h3>
            <p>
              Patient currently stable. Continue routine monitoring
              and review recent observations.
            </p>
          </div>

          <div className="report-section">
            <h3>Key Concerns</h3>
            <p>
              Monitor recent changes in oxygen saturation and
              medication status.
            </p>
          </div>

          <div className="report-section">
            <h3>Pending / Follow-up</h3>
            <p>
              Review active orders and follow up on outstanding
              clinical information.
            </p>
          </div>

          <div className="report-section">
            <h3>Next Shift Notes</h3>
            <textarea
              className="chart-textarea"
              placeholder="Enter information for the next shift..."
              rows={4}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default PatientChart;