import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from './StyledComponents';
import Cookies from 'js-cookie';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const token = Cookies.get('accessToken') || Cookies.get('authToken');

  if (loading) {
    return <LoadingSpinner>로딩 중...</LoadingSpinner>;
  }

  // 토큰이 없으면 메인페이지로 리다이렉트
  if (!token || !isAuthenticated) {
    return <Navigate to="/start" replace />;
  }

  return children;
};

export default ProtectedRoute;
