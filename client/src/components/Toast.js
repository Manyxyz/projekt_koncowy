import { useEffect } from 'react';

function Toast({ message, onClose, duration = 2000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, onClose, duration]);

  if (!message) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        background: '#534bf5',
        color: '#fff',
        padding: '16px 32px',
        borderRadius: '12px',
        boxShadow: '0 2px 16px rgba(99,92,240,0.18)',
        fontSize: '1.1rem',
        zIndex: 2000,
        minWidth: 180,
        textAlign: 'center'
      }}
    >
      {message}
    </div>
  );
}

export default Toast;