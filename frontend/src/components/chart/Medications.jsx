function Medications({ medications }) {
    return (
      <section className="chart-section">
        <div className="chart-section-header">
          <div>
            <h2>Medications</h2>
            <p>Current medication administration record.</p>
          </div>
        </div>
  
        {!medications.length ? (
          <div className="empty-inline">No medications recorded.</div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Medication</th>
                  <th>Dose</th>
                  <th>Route</th>
                  <th>Scheduled</th>
                  <th>Status</th>
                </tr>
              </thead>
  
              <tbody>
                {medications.map((medication) => (
                  <tr key={medication.medication_id}>
                    <td>
                      <strong>{medication.medication_name}</strong>
                    </td>
  
                    <td>{medication.dose}</td>
  
                    <td>{medication.route}</td>
  
                    <td>
                      {new Date(
                        medication.scheduled_time
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
  
                    <td>
                      <span
                        className={`status-badge status-${medication.status.toLowerCase()}`}
                      >
                        {medication.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    );
  }
  
  export default Medications;