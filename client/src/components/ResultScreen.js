import React from 'react';
import Logo from './Logo';

function ResultScreen({ quiz, score, onBack }) {
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <h2>Wynik: {score} / {quiz.questions.length}</h2>
        <button
          onClick={onBack}
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

export default ResultScreen;