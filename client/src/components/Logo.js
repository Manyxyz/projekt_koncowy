function Logo({ style = {} }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: '2rem',
        letterSpacing: '2px',
        fontFamily: "'Segoe UI', 'Arial', sans-serif",
        userSelect: 'none',
        ...style
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 54,
          height: 54,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #fff 30%, #635cf0 80%, #534bf5 100%)',
          color: '#534bf5',
          fontSize: '2.3rem',
          fontWeight: 'bold',
          marginRight: 18,
          boxShadow: '0 4px 24px 0 rgba(60,60,120,0.18)'
        }}
      >
        ?
      </span>
      <span
        style={{
          fontWeight: 900,
          fontSize: '2.1rem',
          color: '#fff',
          textShadow: '0 2px 8px #3d3b72, 0 1px 0 #534bf5',
          letterSpacing: '2px'
        }}
      >
        QuizzCamp
      </span>
    </div>
  );
}

export default Logo;