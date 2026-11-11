function Observations({ observations }) {
    return (
      <section className="chart-section">
        <div className="chart-section-header">
          <div>
            <h2>Recent Observations</h2>
            <p>Latest recorded patient observations.</p>
          </div>
        </div>
  
        {!observations.length ? (
          <div className="empty-inline">No observations recorded.</div>
        ) : (
          <div className="observations-grid">
            {observations.map((observation) => (
              <div className="observation-card" key={observation.observation_id}>
                <span>{observation.observation_type}</span>
  
                <strong>
                  {observation.value}
                  <small>{observation.unit}</small>
                </strong>
  
                <small>
                  Recorded{" "}
                  {new Date(observation.recorded_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </small>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }
  
  export default Observations;