import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = Cookies.get('authToken');
    if (token) {
      // In a real app, you would verify the token with the server
      // For now, we'll just check if it exists
      setIsAuthenticated(true);
      setUser({ name: '사용자', id: '1' });
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    // Mock login - in real app, this would be an API call
    if (username === 'admin' && password === 'password') {
      const mockToken = 'mock-jwt-token-' + Date.now();
      Cookies.set('authToken', mockToken, { expires: 7 }); // 7 days
      setIsAuthenticated(true);
      setUser({ name: '관리자', id: '1' });
      return { success: true };
    }
    return { success: false, error: '아이디 또는 비밀번호가 올바르지 않습니다.' };
  };

  const signup = async (userData) => {
    // Mock signup - in real app, this would be an API call
    const mockToken = 'mock-jwt-token-' + Date.now();
    Cookies.set('authToken', mockToken, { expires: 7 });
    setIsAuthenticated(true);
    setUser({ name: userData.name, id: '2' });
    return { success: true };
  };

  const logout = () => {
    Cookies.remove('authToken');
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
