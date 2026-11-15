import { useEffect, useState } from "react";
import { getHandoff } from "../services/patientService";

function getPriorityClass(priority) {
  switch (priority) {
    case "Review First":
      return "priority-high";

    case "Procedure":
      return "priority-medium";

    default:
      return "priority-stable";
  }
}

function Handoff() {
  const [handoff, setHandoff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadHandoff() {
      try {
        setLoading(true);
        setError(null);

        const data = await getHandoff(1);

        setHandoff(data);
      } catch (error) {
        console.error("Handoff request failed:", error);
        setError("Unable to generate handoff briefing.");
      } finally {
        setLoading(false);
      }
    }

    loadHandoff();
  }, []);

  if (loading) {
    return (
      <div className="page-content">
        <div className="page-header">
          <h1>Shift Handoff</h1>
          <p>Preparing patient handoff...</p>
        </div>

        <div className="empty-state">
          <h3>Generating briefing</h3>
          <p>
            Reviewing assigned patients and preparing the shift handoff.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-content">
        <div className="page-header">
          <h1>Shift Handoff</h1>
          <p>Unable to generate the current handoff.</p>
        </div>

        <div className="empty-state">
          <h3>Handoff unavailable</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!handoff) {
    return null;
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1>Shift Handoff</h1>
          <p>AI-assisted briefing for assigned patients</p>
        </div>
      </div>

      <div className="handoff-summary">
        <div className="generated-summary">
          <div className="summary-label">Shift Overview</div>
          <p>{handoff.shift_summary}</p>
        </div>
      </div>

      <div className="handoff-patients">
        <h3>Assigned Patients</h3>

        {handoff.patients.map((patient) => {
          const priorityClass = getPriorityClass(
            patient.priority.priority
          );

          return (
            <div
              className={`context-card ${priorityClass}`}
              key={patient.patient_id}
            >
              <div className="handoff-patient-header">
                <div>
                  <h2>Patient {patient.patient_id}</h2>
                  <span>Suggested review priority</span>
                </div>

                <span
                  className={`priority-badge priority-badge-${priorityClass.replace(
                    "priority-",
                    ""
                  )}`}
                >
                  {patient.priority.priority}
                </span>
              </div>

              <div className="handoff-summary">
                <h3>Summary</h3>
                <p>{patient.summary}</p>
              </div>

              <div className="handoff-note">
                <strong>Why this priority?</strong>
                <p>{patient.priority.rationale}</p>
              </div>

              <div className="context-evidence">
                <h3>Important Context</h3>

                {patient.important_context.map((item, index) => (
                  <div
                    className="context-finding"
                    key={index}
                  >
                    <p className="context-finding-text">
                      {item.text}
                    </p>

                    <div className="context-evidence-list">
                      {item.evidence.map(
                        (evidence, evidenceIndex) => (
                          <span
                            className="evidence-tag"
                            key={evidenceIndex}
                          >
                            {evidence.source_type} #{evidence.source_id}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="context-evidence">
                <h3>Priority Evidence</h3>

                <div className="context-evidence-list">
                  {patient.priority.evidence.map(
                    (evidence, index) => (
                      <span
                        className="evidence-tag"
                        key={index}
                      >
                        {evidence.source_type} #{evidence.source_id}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Handoff;