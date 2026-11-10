import { useState } from "react";
import { patients } from "../data/mockData";

const patient = patients[0];

export default function Phone() {
  const [showSummary, setShowSummary] = useState(false);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Phone</h1>
          <p>Incoming clinical communication.</p>
        </div>
      </div>

      <div className="two-column-layout">
        <section className="section-card">
          <div className="phone-header">
            <div className="phone-avatar">☎</div>

            <div>
              <span className="phone-label">Incoming Call</span>
              <h2>Dr. Sarah Chen</h2>
              <p>Internal Medicine · Patient: {patient.first_name} {patient.last_name}</p>
            </div>
          </div>

          <div className="phone-recording">
            <div className="recording-icon">▶</div>

            <div>
              <strong>Doctor Call Recording</strong>
              <span>00:42 · Mock audio</span>
            </div>

            <audio controls>
              <source src="/mock-doctor-call.mp3" type="audio/mpeg" />
              Your browser does not support audio playback.
            </audio>
          </div>

          <div className="call-transcript">
            <h3>Transcript</h3>

            <p>
              "Hi, this is Dr. Chen calling regarding {patient.first_name}{" "}
              {patient.last_name}. I'd like the CBC repeated and would like
              oxygen saturation monitored more frequently. Please let me know
              if there are any significant changes."
            </p>
          </div>
        </section>

        <section className="section-card">
          <div className="section-card-header">
            <div>
              <h2>Communication Summary</h2>
              <p>Review before documenting.</p>
            </div>
          </div>

          {!showSummary ? (
            <div className="empty-state">
              <p>
                Generate a concise summary of the call and identify any
                potential documentation requirements.
              </p>

              <button
                className="primary-button"
                onClick={() => setShowSummary(true)}
              >
                Generate Call Summary
              </button>
            </div>
          ) : (
            <div className="generated-summary">
              <div className="summary-label">Generated Summary</div>

              <p>
                Dr. Sarah Chen requested a repeat CBC and increased monitoring
                of the patient's oxygen saturation. Nurse should notify the
                physician of any significant changes.
              </p>

              <div className="summary-actions">
                <button
                  className="primary-button"
                  onClick={() =>
                    alert("Mock communication documented.")
                  }
                >
                  Confirm & Document
                </button>

                <button
                  className="secondary-button"
                  onClick={() => setShowSummary(false)}
                >
                  Review Again
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}