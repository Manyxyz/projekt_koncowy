import { useState } from 'react';
import { registerUser } from '../services/api';

function RegisterForm({ onSuccess }) {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      await registerUser(form);
      setSuccess(true);
      onSuccess(); // np. przełącza na logowanie
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.errors?.[0]?.msg || // wyświetl walidacyjny błąd z backendu
        err.response?.data?.details ||          // wyświetl szczegóły błędu z backendu
        'Rejestracja nie powiodła się'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Rejestracja</h2>
      <input
        name="username"
        type="text"
        placeholder="Nazwa użytkownika"
        value={form.username}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Hasło"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Zarejestruj się</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Rejestracja udana! Możesz się zalogować.</p>}
    </form>
  );
}

export default RegisterForm;