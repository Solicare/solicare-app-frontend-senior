import React from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import MedicationPage from './pages/MedicationPage';
import ExercisePage from './pages/ExercisePage';
import ChatPage from './pages/ChatPage';
import DietPage from './pages/DietPage';
import HomePage from './pages/HomePage';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Navigate to="/start" replace />} />
              <Route path="/start" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/medication"
                element={
                  <ProtectedRoute>
                    <MedicationPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/medication/history"
                element={
                  <ProtectedRoute>
                    <MedicationPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/exercise"
                element={
                  <ProtectedRoute>
                    <ExercisePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/chat"
                element={
                  <ProtectedRoute>
                    <ChatPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/diet"
                element={
                  <ProtectedRoute>
                    <DietPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/start" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
