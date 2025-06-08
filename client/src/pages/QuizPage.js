import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuizzes, getUserResults, getAllResults } from '../services/api';
import QuizCard from '../components/QuizCard';
import ResultsModal from '../components/ResultsModal';
import AllResultsModal from '../components/AllResultsModal';
import Logo from '../components/Logo';

function QuizPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  const [showAllResults, setShowAllResults] = useState(false);
  const [allResults, setAllResults] = useState([]);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.username) setUsername(user.username);

    getQuizzes().then(res => setQuizzes(res.data));

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
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(90deg, #262672 0%, #534bf5 60%, #262672 100%)',
          color: '#fff',
          padding: '16px 32px',
          boxSizing: 'border-box',
          marginBottom: '32px',
          position: 'relative'
        }}
      >
        {/* Hamburger menu po lewej */}
        <div
          style={{
            position: 'absolute',
            left: 32,
            top: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center'
          }}
        >
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
        </div>
        {/* Logo na środku */}
        <Logo style={{ fontSize: '1.4rem' }} />
        {/* Wyloguj po prawej */}
        <button
          onClick={handleLogout}
          style={{
            position: 'absolute',
            right: 32,
            top: '50%',
            transform: 'translateY(-50%)',
            background: '#bcb3d9',
            color: '#262672',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(99,92,240,0.10)'
          }}
        >
          Wyloguj
        </button>
        {/* Rozwijane menu */}
        {menuOpen && (
          <div
          ref={menuRef}
            style={{
              position: 'absolute',
              top: '60px',
              left: '32px',
              background: '#fff',
              color: '#534bf5',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(27, 27, 29, 0.35)',
              maxWidth: '200px',
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
                color: '#534bf5',
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
                color: '#534bf5',
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
        <ResultsModal results={results} onClose={handleCloseResults} />
      )}
      {/* Modal z wynikami wszystkich użytkowników */}
      {showAllResults && (
        <AllResultsModal allResults={allResults} onClose={handleCloseAllResults} />
      )}
      <div
        style={{
          display: 'inline-block',
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 2px 8px rgba(99,92,240,0.08)',
          padding: '12px 32px',
          marginLeft: '32px',
          marginBottom: '16px',
          border: '1px solid #534bf5',
        }}
      >
        <h2 style={{ margin: 0, color: '#534bf5' }}>Dostępne quizy:</h2>
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
          <QuizCard key={quiz._id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
}

export default QuizPage;