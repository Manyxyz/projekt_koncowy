import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function QuizSolvePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null); // indeks wybranej odpowiedzi
  const [feedback, setFeedback] = useState(null); // 'correct' lub 'wrong'

  useEffect(() => {
    axios.get(`http://localhost:5000/api/quiz/${id}`).then(res => setQuiz(res.data));
  }, [id]);

  if (!quiz) return <div>Ładowanie...</div>;

  const handleAnswer = idx => {
    if (selected !== null) return; // blokuj wielokrotne kliknięcia
    setSelected(idx);
    const correct = idx === quiz.questions[current].answer;
    setFeedback(correct ? 'correct' : 'wrong');

    setTimeout(() => {
      const newAnswers = [...answers, idx];
      setAnswers(newAnswers);
      setSelected(null);
      setFeedback(null);
      if (current + 1 < quiz.questions.length) {
        setCurrent(current + 1);
      } else {
        // Sprawdź wynik
        let points = 0;
        quiz.questions.forEach((q, i) => {
          if (newAnswers[i] === q.answer) points++;
        });
        setScore(points);
        setShowResult(true);

        // Zapisz wynik do bazy
        const user = JSON.parse(localStorage.getItem('user'));
        axios.post('http://localhost:5000/api/quiz/result', {
          userId: user.id,
          quizId: quiz._id,
          quizTitle: quiz.title,
          score: points,
          total: quiz.questions.length
        }).catch(() => {});
      }
    }, 700); // 0.7 sekundy na pokazanie koloru
  };

  if (showResult) {
    return (
      <div>
        <div
          style={{
            width: '100%',
            background: '#1976d2',
            color: '#fff',
            padding: '18px 0',
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '32px'
          }}
        >
          {quiz.title}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <h2>Wynik: {score} / {quiz.questions.length}</h2>
          <button
            onClick={() => navigate('/quiz')}
            style={{
              marginTop: '24px',
              background: '#1976d2',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 24px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Powrót do quizów
          </button>
        </div>
      </div>
    );
  }

  const q = quiz.questions[current];

  return (
    <div>
      {/* Pasek tytułu */}
      <div
        style={{
          width: '100%',
          background: '#1976d2',
          color: '#fff',
          padding: '18px 0',
          textAlign: 'center',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '32px'
        }}
      >
        {quiz.title}
      </div>
      {/* Pytanie w ramce */}
      <div
        style={{
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          padding: '18px 20px',
          margin: '0 auto 32px auto',
          border: '1px solid #1976d2',
          maxWidth: '500px',
          fontSize: '1.1rem',
          textAlign: 'center'
        }}
      >
        <div style={{ color: '#1976d2', fontWeight: 'bold', marginBottom: 8 }}>
          Pytanie {current + 1} z {quiz.questions.length}
        </div>
        <div>{q.question}</div>
      </div>
      {/* Odpowiedzi jako mniejsze kafelki */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          flexWrap: 'wrap'
        }}
      >
        {q.options.map((opt, idx) => {
          let borderColor = '#1976d2';
          if (selected === idx && feedback === 'correct') borderColor = 'green';
          if (selected === idx && feedback === 'wrong') borderColor = 'red';

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={selected !== null}
              style={{
                minWidth: '110px',
                maxWidth: '180px',
                background: '#f5f5f5',
                border: `2.5px solid ${borderColor}`,
                borderRadius: '12px',
                padding: '10px 8px',
                fontSize: '0.98rem',
                fontWeight: 'bold',
                cursor: selected === null ? 'pointer' : 'default',
                transition: 'background 0.2s, color 0.2s, border 0.2s',
                color: '#1976d2'
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuizSolvePage;