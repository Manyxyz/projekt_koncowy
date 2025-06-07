import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getQuizzes, getUserResults, getAllResults } from '../services/api';

function QuizPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  const [showAllResults, setShowAllResults] = useState(false);
  const [allResults, setAllResults] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.username) setUsername(user.username);

    getQuizzes().then(res => setQuizzes(res.data));

    // Pobierz wyniki z bazy
    if (user && user.id) {
      getUserResults(user.id).then(res => setResults(res.data));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  const handleShowResults = () => {
    setShowResults(true);
    setMenuOpen(false);
  };

  const handleCloseResults = () => {
    setShowResults(false);
  };

  const handleShowAllResults = () => {
    setShowAllResults(true);
    setMenuOpen(false);
    getAllResults().then(res => setAllResults(res.data));
  };

  const handleCloseAllResults = () => {
    setShowAllResults(false);
  };

  return (
    <div>
      {/* Pasek górny */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#1976d2',
          color: '#fff',
          padding: '16px 32px',
          boxSizing: 'border-box',
          marginBottom: '32px',
          position: 'relative'
        }}
      >
        {/* Hamburger menu */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              marginRight: '18px',
              padding: 0
            }}
            aria-label="menu"
          >
            <div style={{ width: 28, height: 22, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ height: 4, background: '#fff', borderRadius: 2 }} />
              <div style={{ height: 4, background: '#fff', borderRadius: 2 }} />
              <div style={{ height: 4, background: '#fff', borderRadius: 2 }} />
            </div>
          </button>
          <span style={{ fontSize: '1.2rem' }}>
            Witaj na stronie quizów{username ? `, ${username}` : ''}!
          </span>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: '#fff',
            color: '#1976d2',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 18px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Wyloguj
        </button>
        {/* Rozwijane menu */}
        {menuOpen && (
          <div
            style={{
              position: 'absolute',
              top: '60px',
              left: '32px',
              background: '#fff',
              color: '#1976d2',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              minWidth: '200px',
              zIndex: 10,
              padding: '10px 0'
            }}
          >
            <button
              onClick={handleShowResults}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                color: '#1976d2',
                fontSize: '1rem',
                padding: '12px 24px',
                textAlign: 'left',
                cursor: 'pointer'
              }}
            >
              Zobacz swoje wyniki
            </button>
            <button
              onClick={handleShowAllResults}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                color: '#1976d2',
                fontSize: '1rem',
                padding: '12px 24px',
                textAlign: 'left',
                cursor: 'pointer'
              }}
            >
              Wyniki wszystkich użytkowników
            </button>
          </div>
        )}
      </div>
      {/* Modal z wynikami użytkownika */}
      {showResults && (
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
          onClick={handleCloseResults}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '32px 40px',
              minWidth: '320px',
              boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
              position: 'relative'
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={handleCloseResults}
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
            <h3 style={{ color: '#1976d2', marginTop: 0 }}>Twoje wyniki</h3>
            {results.length === 0 ? (
              <p>Brak zapisanych wyników.</p>
            ) : (
              <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
                {results.map((res, idx) => (
                  <li key={idx} style={{ marginBottom: 10 }}>
                    <b>{res.quizTitle}</b> — {res.score} / {res.total} &nbsp;
                    <span style={{ color: '#888', fontSize: '0.95em' }}>
                      ({new Date(res.date).toLocaleString()})
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      {/* Modal z wynikami wszystkich użytkowników */}
      {showAllResults && (
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
          onClick={handleCloseAllResults}
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
              onClick={handleCloseAllResults}
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
            <h3 style={{ color: '#1976d2', marginTop: 0 }}>Wyniki wszystkich użytkowników</h3>
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
      )}
      {/* ...reszta kodu QuizPage (nagłówek, kafelki quizów)... */}
      <div
        style={{
          display: 'inline-block',
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          padding: '12px 32px',
          marginLeft: '32px',
          marginBottom: '16px',
          border: '1px solid #1976d2',
        }}
      >
        <h2 style={{ margin: 0, color: '#1976d2' }}>Dostępne quizy:</h2>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          marginTop: '24px',
          marginLeft: '32px'
        }}
      >
        {quizzes.map(quiz => (
          <Link
            to={`/quiz/${quiz._id}`}
            key={quiz._id}
            style={{
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <div
              style={{
                width: '220px',
                background: '#f5f5f5',
                borderRadius: '14px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'box-shadow 0.2s',
                cursor: 'pointer'
              }}
            >
              <img
                src={quiz.image || 'https://via.placeholder.com/220x120?text=Quiz'}
                alt={quiz.title}
                style={{
                  width: '100%',
                  height: '120px',
                  objectFit: 'cover'
                }}
              />
              <div
                style={{
                  padding: '16px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '1.1rem'
                }}
              >
                {quiz.title}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default QuizPage;