import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import Logo from '../components/Logo';

function AuthPage() {
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = (user) => {
    navigate('/quiz');
  };

  const handleRegisterSuccess = () => {
    setShowRegister(false);
  };

  return (
    <div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(90deg, #262672 0%, #534bf5 60%, #262672 100%)',
          color: '#fff',
          padding: '18px 0',
          marginBottom: '36px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          position: 'relative'
        }}
      >
        <Logo style={{ fontSize: '2rem' }} />
      </div>
      <div className="auth-container">
        {showRegister ? (
          <>
            <RegisterForm onSuccess={handleRegisterSuccess} />
            <p>
              Masz już konto?{' '}
              <button type="button" onClick={() => setShowRegister(false)}>
                Zaloguj się
              </button>
            </p>
          </>
        ) : (
          <>
            <LoginForm onSuccess={handleLoginSuccess} />
            <p>
              Nie masz konta?{' '}
              <button type="button" onClick={() => setShowRegister(true)}>
                Zarejestruj się
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthPage;