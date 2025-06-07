import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

function AuthPage() {
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = (user) => {
    navigate('/quiz');
  };

  const handleRegisterSuccess = () => {
    setShowRegister(false);
  };

  // ...existing code...
return (
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
);
// ...existing code...
}

export default AuthPage;