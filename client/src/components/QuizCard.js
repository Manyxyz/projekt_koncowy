import { Link, useNavigate } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { deleteQuiz } from '../services/api';

function QuizCard({ quiz, onDeleteRequest }) {
  const titleRef = useRef(null);
  const [fontSize, setFontSize] = useState(18);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  

  useEffect(() => {
    // Automatyczne dopasowanie wielkości czcionki do wysokości tytułu (max 2 linie)
    const resizeFont = () => {
      if (!titleRef.current) return;
      let size = 18;
      titleRef.current.style.fontSize = size + 'px';
      while (
        (titleRef.current.scrollHeight > titleRef.current.offsetHeight || titleRef.current.scrollWidth > titleRef.current.offsetWidth)
        && size > 12
      ) {
        size -= 1;
        titleRef.current.style.fontSize = size + 'px';
      }
      setFontSize(size);
    };
    resizeFont();
  }, [quiz.title]);

  return (
    <div style={{ position: 'relative' }}>
      <Link
        to={`/quiz/${quiz._id}`}
        style={{
          textDecoration: 'none',
          color: 'inherit'
        }}
      >
        <div
          style={{
            width: '220px',
            height: '200px',
            background: '#f5f5f5',
            borderRadius: '14px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.27)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'box-shadow 0.2s',
            cursor: 'pointer'
          }}
        >
          <img
            src={quiz.image || 'https://via.placeholder.com/220x120?text=Quiz'}
            alt={quiz.title}
            style={{
              width: '100%',
              height: '120px',
              objectFit: 'cover'
            }}
          />
          <div
            ref={titleRef}
            style={{
              padding: '12px 10px 0 10px',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: fontSize + 'px',
              width: '100%',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              lineHeight: '1.15'
            }}
            title={quiz.title}
          >
            {quiz.title}
          </div>
        </div>
      </Link>
      {quiz.author && user && quiz.author._id === user.id && (
        <>
          <button
            onClick={() => navigate(`/quiz/edit/${quiz._id}`)}
            style={{
              position: 'absolute',
              top: 8,
              right: 61, 
              background: '#fff',
              color: '#534bf5',
              border: '1px solid #534bf5',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '0.95rem',
              cursor: 'pointer',
              zIndex: 2,
              marginRight: '4px' 
            }}
          >
            Edytuj
          </button>
          <button
            onClick={() => onDeleteRequest(quiz._id)}
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              background: '#fff',
              color: '#d32f2f',
              border: '1px solid #d32f2f',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '0.95rem',
              cursor: 'pointer',
              zIndex: 2
            }}
          >
            Usuń
          </button>
        </>
      )}
    </div>
  );
}

export default QuizCard;