import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addQuiz } from '../services/api';
import Logo from '../components/Logo';
import Toast from '../components/Toast';

function CreateQuizPage() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], answer: 0 }
  ]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [toast, setToast] = useState('');

  const handleQuestionChange = (idx, value) => {
    const updated = [...questions];
    updated[idx].question = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIdx, oIdx, value) => {
    const updated = [...questions];
    updated[qIdx].options[oIdx] = value;
    setQuestions(updated);
  };

  const handleAnswerChange = (qIdx, value) => {
    const updated = [...questions];
    updated[qIdx].answer = Number(value);
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], answer: 0 }]);
  };

  const removeQuestion = (idx) => {
    if (questions.length === 1) return;
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await addQuiz({ title, image, questions, author: user.id });
      setSuccess(true);
      setToast('Quiz został dodany!');
      setTimeout(() => navigate('/quiz'), 1200);
    } catch (err) {
      setError(err.response?.data?.error || 'Błąd dodawania quizu');
    }
  };

  return (
    <div>
       <div>
        <Toast message={toast} onClose={() => setToast('')} />
      </div>
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
        <h2 style={{ color: '#534bf5', marginTop: 0 }}>Stwórz nowy quiz</h2>
        <input
          type="text"
          placeholder="Tytuł quizu"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 16, padding: 8, borderRadius: 8, border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="Link do obrazka (opcjonalnie)"
          value={image}
          onChange={e => setImage(e.target.value)}
          style={{ width: '100%', marginBottom: 24, padding: 8, borderRadius: 8, border: '1px solid #ccc' }}
        />
        {questions.map((q, qIdx) => (
          <div key={qIdx} style={{ marginBottom: 24, borderBottom: '1px solid #eee', paddingBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <b style={{ color: '#534bf5' }}>Pytanie {qIdx + 1}:</b>
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(qIdx)}
                  style={{
                    marginLeft: 12,
                    background: 'none',
                    border: 'none',
                    color: '#d32f2f',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '1.2rem'
                  }}
                  title="Usuń pytanie"
                >
                  ×
                </button>
              )}
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
          type="button"
          onClick={addQuestion}
          style={{
            background: '#bcb3d9',
            color: '#262672',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: 24
          }}
        >
          Dodaj pytanie
        </button>
        <br />
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
          Zapisz quiz
        </button>
        {error && <p style={{ color: 'red', marginTop: 12 }}>{error}</p>}
      </form>
    </div>
  );
}

export default CreateQuizPage;