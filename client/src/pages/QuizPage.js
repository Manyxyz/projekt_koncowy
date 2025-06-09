import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuizzes, getUserResults, getAllResults, deleteQuiz } from '../services/api';
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
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const menuRef = useRef(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;
  const userQuizzes = quizzes.filter(q => q.author && q.author._id === userId);

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

  const handleQuizDelete = (id) => {
    setQuizzes(quizzes => quizzes.filter(q => q._id !== id));
  };

  return (
    <div
      style={{
        paddingBottom: '56px'
      }}>
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
              onClick={() => { setMenuOpen(false); navigate('/account'); }}
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
              Konto
            </button>
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
              Najlepsze wyniki użytkowników
            </button>
          </div>
        )}
      </div>
      {/* Modal z potwierdzeniem usunięcia quizu */}
      {confirmDeleteId && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200
          }}
          onClick={() => setConfirmDeleteId(null)}
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
            <h3 style={{ color: '#d32f2f', marginTop: 0 }}>Potwierdź usunięcie</h3>
            <p>Czy na pewno chcesz usunąć ten quiz?</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button
                onClick={() => setConfirmDeleteId(null)}
                style={{
                  background: '#bcb3d9',
                  color: '#262672',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 18px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Anuluj
              </button>
              <button
                onClick={async () => {
                  await deleteQuiz(confirmDeleteId);
                  setQuizzes(qs => qs.filter(q => q._id !== confirmDeleteId));
                  setConfirmDeleteId(null);
                }}
                style={{
                  background: '#d32f2f',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 18px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Usuń
              </button>
            </div>
          </div>
        </div>
      )}
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginLeft: '32px',
          marginRight: '32px',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(99,92,240,0.08)',
            padding: '12px 32px',
            border: '1px solid #534bf5',
            minWidth: 220
          }}
        >
          <h2 style={{ margin: 0, color: '#534bf5' }}>Dostępne quizy:</h2>
        </div>
        <span
          style={{
            color: '#534bf5',
            fontWeight: 'bold',
            fontSize: '1.15rem',
            marginLeft: '32px'
          }}
        >
          {username && `Cześć ${username}!`}
        </span>
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
          <QuizCard
            key={quiz._id}
            quiz={quiz}
            onDeleteRequest={setConfirmDeleteId}
          />
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: '32px',
          marginBottom: '16px',
          marginTop: '32px'
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(99,92,240,0.08)',
            padding: '12px 32px',
            border: '1px solid #534bf5',
            minWidth: 220
          }}
        >
          <h2 style={{ margin: 0, color: '#534bf5' }}>Twoje quizy:</h2>
        </div>
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
        {userQuizzes.length === 0 ? (
          <span style={{ color: '#888', marginLeft: 8 }}>Nie masz jeszcze własnych quizów.</span>
        ) : (
          userQuizzes.map(quiz => (
            <QuizCard key={quiz._id} quiz={quiz} onDeleteRequest={setConfirmDeleteId} />
          ))
        )}
      </div>
      <button
        onClick={() => navigate('/quiz/create')}
        style={{
          position: 'fixed',
          right: 36,
          bottom: 36,
          background: 'linear-gradient(90deg, #534bf5 60%, #262672 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: '50px',
          padding: '16px 32px',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          boxShadow: '0 4px 16px rgba(99,92,240,0.15)',
          cursor: 'pointer',
          zIndex: 1000,
          transition: 'background 0.2s'
        }}
      >
        Stwórz quiz
      </button>
    </div>
  );
}

export default QuizPage;