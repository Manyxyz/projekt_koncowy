function AllResultsModal({ allResults, onClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '32px 40px',
          minWidth: '340px',
          boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
          position: 'relative',
          maxHeight: '80vh',
          overflowY: 'auto'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 10,
            right: 16,
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            color: '#1976d2',
            cursor: 'pointer'
          }}
          aria-label="Zamknij"
        >
          ×
        </button>
        <h3 style={{ color: '#1976d2', marginTop: 0 }}>Najlepsze wyniki użytkowników</h3>
        {allResults.length === 0 ? (
          <p>Brak wyników.</p>
        ) : (
          <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
            {allResults.map((res, idx) => (
              <li key={idx} style={{ marginBottom: 10 }}>
                <b>{res.quizTitle}</b> — {res.score} / {res.total} &nbsp;
                <span style={{ color: '#888', fontSize: '0.95em' }}>
                  ({new Date(res.date).toLocaleString()})
                </span>
                <br />
                <span style={{ color: '#1976d2', fontSize: '0.98em' }}>
                  Użytkownik: {res.userId?.username || 'nieznany'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AllResultsModal;