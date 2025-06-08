import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import QuizPage from './pages/QuizPage';
import QuizSolvePage from './pages/QuizSolvePage';
import CreateQuizPage from './pages/CreateQuizPage';
import EditQuizPage from './pages/EditQuizPage';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/auth" />;
}

function App() {
  return (
    <Router>
      <Routes>
  <Route path="/auth" element={<AuthPage />} />
  <Route
    path="/quiz"
    element={
      <ProtectedRoute>
        <QuizPage />
      </ProtectedRoute>
    }
  />
  <Route
    path="/quiz/create"
    element={
      <ProtectedRoute>
        <CreateQuizPage />
      </ProtectedRoute>
    }
  />
  <Route
    path="/quiz/edit/:id"
    element={
      <ProtectedRoute>
        <EditQuizPage />
      </ProtectedRoute>
    }
  />
  <Route
    path="/quiz/:id"
    element={
      <ProtectedRoute>
        <QuizSolvePage />
      </ProtectedRoute>
    }
  />
  <Route path="*" element={<Navigate to="/auth" />} />
</Routes>
    </Router>
  );
}

export default App;