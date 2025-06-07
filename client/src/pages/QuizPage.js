import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function QuizPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.username) {
      setUsername(user.username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  return (
    <div>
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
          marginBottom: '32px'
        }}
      >
        <span style={{ fontSize: '1.2rem' }}>
          Witaj na stronie quizów{username ? `, ${username}` : ''}!
        </span>
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
      </div>
      {/* Tutaj możesz dodać resztę strony quizów */}
    </div>
  );
}

export default QuizPage;