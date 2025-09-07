import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import Cookies from 'js-cookie';

interface User {
  name: string;
  id: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (
    username: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (userData: {
    username: string;
    password: string;
    name: string;
    email: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

  const login = async (username: string, password: string) => {
    // Mock login - in real app, this would be an API call
    console.log('Attempting to log in with:', { username, password });
    const mockToken = 'mock-jwt-token-' + Date.now();
    Cookies.set('authToken', mockToken, { expires: 7 }); // 7 days
    setIsAuthenticated(true);
    setUser({ name: '테스트 사용자', id: '1' }); // Set a default user for always successful login
    return { success: true };
  };

  const signup = async (userData: {
    username: string;
    password: string;
    name: string;
    email: string;
  }) => {
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
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
