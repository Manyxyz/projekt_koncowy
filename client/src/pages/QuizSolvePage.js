import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import QuestionBox from '../components/QuestionBox';
import ResultScreen from '../components/ResultScreen';
import Logo from '../components/Logo';

function QuizSolvePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/quiz/${id}`).then(res => setQuiz(res.data));
  }, [id]);

  if (!quiz) return null;

  const handleAnswer = idx => {
    if (selected !== null) return;
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
        let points = 0;
        quiz.questions.forEach((q, i) => {
          if (newAnswers[i] === q.answer) points++;
        });
        setScore(points);
        setShowResult(true);

        const user = JSON.parse(localStorage.getItem('user'));
        axios.post('http://localhost:5000/api/quiz/result', {
          userId: user.id,
          quizId: quiz._id,
          quizTitle: quiz.title,
          score: points,
          total: quiz.questions.length
        }).catch(() => {});
      }
    }, 700);
  };

  if (showResult) {
    return (
      <ResultScreen
        quiz={quiz}
        score={score}
        onBack={() => navigate('/quiz')}
      />
    );
  }

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
          marginBottom: '12px',
          position: 'relative'
        }}
      >
        <Logo style={{ fontSize: '1.4rem' }} />
      </div>
      <QuestionBox
        quiz={quiz}
        current={current}
        selected={selected}
        feedback={feedback}
        handleAnswer={handleAnswer}
      />
    </div>
  );
}

export default QuizSolvePage;