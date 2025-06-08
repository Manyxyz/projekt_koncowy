import React from 'react';

function QuestionBox({ quiz, current, selected, feedback, handleAnswer }) {
  const q = quiz.questions[current];

  return (
    <>
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
      {/* Odpowiedzi */}
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
    </>
  );
}

export default QuestionBox;