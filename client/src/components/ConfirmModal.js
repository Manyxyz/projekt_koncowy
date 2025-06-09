function ConfirmModal({ open, title, message, onCancel, onConfirm, confirmText = "Usuń", cancelText = "Anuluj" }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000
      }}
      onClick={onCancel}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '32px 40px',
          minWidth: '320px',
          boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
      >
        <h3 style={{ color: '#d32f2f', marginTop: 0 }}>{title}</h3>
        <p>{message}</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button
            onClick={onCancel}
            style={{
              background: '#bcb3d9',
              color: '#262672',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 18px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            style={{
              background: '#d32f2f',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 18px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;