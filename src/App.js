import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import MedicationPage from './pages/MedicationPage';
import ExercisePage from './pages/ExercisePage';
import ChatPage from './pages/ChatPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/" 
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
