import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../components/Logo';

function EditQuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/quiz/${id}`).then(res => setQuiz(res.data));
  }, [id]);

  const handleChange = (field, value) => {
    setQuiz(prev => ({ ...prev, [field]: value }));
  };

  const handleQuestionChange = (idx, value) => {
    const updated = [...quiz.questions];
    updated[idx].question = value;
    setQuiz(prev => ({ ...prev, questions: updated }));
  };

  const handleOptionChange = (qIdx, oIdx, value) => {
    const updated = [...quiz.questions];
    updated[qIdx].options[oIdx] = value;
    setQuiz(prev => ({ ...prev, questions: updated }));
  };

  const handleAnswerChange = (qIdx, value) => {
    const updated = [...quiz.questions];
    updated[qIdx].answer = Number(value);
    setQuiz(prev => ({ ...prev, questions: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await axios.put(`http://localhost:5000/api/quiz/${id}`, { ...quiz, author: user.id });
      setSuccess(true);
      setTimeout(() => navigate('/quiz'), 1200);
    } catch (err) {
      setError(err.response?.data?.error || 'Błąd edycji quizu');
    }
  };

  if (!quiz) return <div>Ładowanie...</div>;

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
          padding: '16px 32px',
          boxSizing: 'border-box',
          marginBottom: '32px',
          position: 'relative'
        }}
      >
        <Logo style={{ fontSize: '1.4rem' }} />
      </div>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 600,
          margin: '0 auto',
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 2px 8px rgba(99,92,240,0.08)',
          padding: 32,
          border: '1px solid #534bf5'
        }}
      >
        <h2 style={{ color: '#534bf5', marginTop: 0 }}>Edytuj quiz</h2>
        <input
          type="text"
          placeholder="Tytuł quizu"
          value={quiz.title}
          onChange={e => handleChange('title', e.target.value)}
          required
          style={{ width: '100%', marginBottom: 16, padding: 8, borderRadius: 8, border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="Link do obrazka (opcjonalnie)"
          value={quiz.image}
          onChange={e => handleChange('image', e.target.value)}
          style={{ width: '100%', marginBottom: 24, padding: 8, borderRadius: 8, border: '1px solid #ccc' }}
        />
        {quiz.questions.map((q, qIdx) => (
          <div key={qIdx} style={{ marginBottom: 24, borderBottom: '1px solid #eee', paddingBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <b style={{ color: '#534bf5' }}>Pytanie {qIdx + 1}:</b>
            </div>
            <input
              type="text"
              placeholder="Treść pytania"
              value={q.question}
              onChange={e => handleQuestionChange(qIdx, e.target.value)}
              required
              style={{ width: '100%', marginBottom: 10, padding: 8, borderRadius: 8, border: '1px solid #ccc' }}
            />
            <div>
              {q.options.map((opt, oIdx) => (
                <div key={oIdx} style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
                  <input
                    type="text"
                    placeholder={`Odpowiedź ${oIdx + 1}`}
                    value={opt}
                    onChange={e => handleOptionChange(qIdx, oIdx, e.target.value)}
                    required
                    style={{ flex: 1, padding: 8, borderRadius: 8, border: '1px solid #ccc' }}
                  />
                  <label style={{ marginLeft: 8 }}>
                    <input
                      type="radio"
                      name={`answer-${qIdx}`}
                      checked={q.answer === oIdx}
                      onChange={() => handleAnswerChange(qIdx, oIdx)}
                      required
                    />{' '}
                    Poprawna
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          type="submit"
          style={{
            background: 'linear-gradient(90deg, #534bf5 60%, #262672 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 28px',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            cursor: 'pointer'
          }}
        >
          Zapisz zmiany
        </button>
        {error && <p style={{ color: 'red', marginTop: 12 }}>{error}</p>}
        {success && <p style={{ color: 'green', marginTop: 12 }}>Quiz zaktualizowany!</p>}
      </form>
    </div>
  );
}

export default EditQuizPage;