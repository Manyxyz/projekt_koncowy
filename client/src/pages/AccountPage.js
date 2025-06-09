import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Toast from '../components/Toast';
import { changeUsername, changePassword, deleteAccount } from '../services/api';

function AccountPage() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [username, setUsername] = useState(user?.username || '');
  const [newUsername, setNewUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await changeUsername(user.id, newUsername);
      setUsername(res.data.username);
      setToast('Nazwa użytkownika zmieniona!');
      localStorage.setItem('user', JSON.stringify({ ...user, username: res.data.username }));
      setNewUsername('');
    } catch (err) {
      setError(err.response?.data?.error || 'Błąd zmiany nazwy użytkownika');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await changePassword(user.id, oldPassword, newPassword);
      setToast('Hasło zmienione!');
      setOldPassword('');
      setNewPassword('');
    } catch (err) {
      setError(err.response?.data?.error || 'Błąd zmiany hasła');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAccount(user.id);
      setToast('Konto zostało usunięte!');
      setShowDeleteModal(false);
      setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/auth');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Błąd usuwania konta');
    }
  };

  return (
    <div>
      {/* Pasek górny z logo */}
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
        <Logo style={{ fontSize: '1.4rem' }} />
      </div>
      <div style={{ maxWidth: 400, margin: '0 auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(99,92,240,0.08)', padding: 32, border: '1px solid #534bf5' }}>
        <h2 style={{ color: '#534bf5', marginTop: 0 }}>Konto</h2>
        <div style={{ marginBottom: 24 }}>
          <b>Aktualna nazwa użytkownika:</b> <span style={{ color: '#534bf5' }}>{username}</span>
        </div>
        <form onSubmit={handleUsernameChange} style={{ marginBottom: 24 }}>
          <input
            type="text"
            placeholder="Nowa nazwa użytkownika"
            value={newUsername}
            onChange={e => setNewUsername(e.target.value)}
            style={{ width: '100%', marginBottom: 8, padding: 8, borderRadius: 8, border: '1px solid #ccc' }}
            required
          />
          <button
            type="submit"
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
            Zmień nazwę użytkownika
          </button>
        </form>
        <form onSubmit={handlePasswordChange} style={{ marginBottom: 24 }}>
          <input
            type="password"
            placeholder="Stare hasło"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            style={{ width: '100%', marginBottom: 8, padding: 8, borderRadius: 8, border: '1px solid #ccc' }}
            required
          />
          <input
            type="password"
            placeholder="Nowe hasło"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            style={{ width: '100%', marginBottom: 8, padding: 8, borderRadius: 8, border: '1px solid #ccc' }}
            required
          />
          <button
            type="submit"
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
            Zmień hasło
          </button>
        </form>
        <button
          onClick={() => setShowDeleteModal(true)}
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
          Usuń konto
        </button>
        {error && <p style={{ color: 'red', marginTop: 12 }}>{error}</p>}
      </div>
      <Toast message={toast} onClose={() => setToast('')} />
        {showDeleteModal && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000
          }}
          onClick={() => setShowDeleteModal(false)}
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
            <h3 style={{ color: '#d32f2f', marginTop: 0 }}>Potwierdź usunięcie konta</h3>
            <p>Czy na pewno chcesz usunąć swoje konto? Tej operacji nie można cofnąć!</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button
                onClick={() => setShowDeleteModal(false)}
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
                onClick={handleDelete}
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
                Usuń konto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountPage;