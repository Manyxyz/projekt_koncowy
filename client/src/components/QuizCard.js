import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';

function QuizCard({ quiz }) {
  const titleRef = useRef(null);
  const [fontSize, setFontSize] = useState(18);

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
    // Przelicz przy zmianie tytułu
  }, [quiz.title]);

  return (
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
  );
}

export default QuizCard;