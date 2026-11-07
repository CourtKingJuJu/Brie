function Notes({ notes }) {
    return (
      <section className="chart-section">
        <div className="chart-section-header">
          <div>
            <h2>Clinical Notes</h2>
            <p>Recent documentation associated with this patient.</p>
          </div>
        </div>
  
        {!notes.length ? (
          <div className="empty-inline">No notes recorded.</div>
        ) : (
          <div className="notes-list">
            {notes.map((note) => (
              <article className="note-card" key={note.note_id}>
                <div className="note-header">
                  <div>
                    <span className="note-type">{note.note_type}</span>
                    <strong>Julian McCarty, RN</strong>
                  </div>
  
                  <time>
                    {new Date(note.created_at).toLocaleString()}
                  </time>
                </div>
  
                <p>{note.content}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    );
  }
  
  export default Notes;