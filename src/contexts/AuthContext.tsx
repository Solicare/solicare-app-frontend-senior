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
    const accessToken = Cookies.get('accessToken') || Cookies.get('authToken');
    if (accessToken) {
      // In a real app, you would verify the token with the server
      // For now, we'll just check if it exists and validate basic JWT structure
      try {
        // Basic JWT structure validation (header.payload.signature)
        const tokenParts = accessToken.split('.');
        if (
          tokenParts.length === 3 ||
          accessToken.startsWith('mock-jwt-token-')
        ) {
          setIsAuthenticated(true);
          setUser({ name: '테스트 사용자', id: '1' });
        }
      } catch (error) {
        console.error('Invalid token format:', error);
        Cookies.remove('accessToken');
        Cookies.remove('authToken');
      }
    }
    setLoading(false);
  }, []);

  const generateMockJWT = (userId: string, username: string) => {
    // Mock JWT structure: header.payload.signature
    const header = { alg: 'HS256', typ: 'JWT' };
    const payload = {
      sub: userId,
      username: username,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
    };

    // Base64 encode (for demo purposes only - real JWT needs proper signing)
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));
    const signature = btoa('mock-signature-' + Date.now());

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  };

  const login = async (username: string, password: string) => {
    try {
      // Mock login - in real app, this would be an API call
      console.log('Attempting to log in with:', { username, password });

      // Generate mock JWT token
      const accessToken = generateMockJWT('1', username);

      // Store token in cookie
      Cookies.set('accessToken', accessToken, {
        expires: 7, // 7 days
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      // Remove old authToken if exists
      Cookies.remove('authToken');

      setIsAuthenticated(true);
      setUser({ name: '테스트 사용자', id: '1' });

      return { success: true };
    } catch (error) {
      return { success: false, error: '로그인에 실패했습니다.' };
    }
  };

  const signup = async (userData: {
    username: string;
    password: string;
    name: string;
    email: string;
  }) => {
    try {
      // Mock signup - in real app, this would be an API call
      console.log('Attempting to sign up with:', userData);

      // Generate mock JWT token
      const accessToken = generateMockJWT('2', userData.username);

      // Store token in cookie
      Cookies.set('accessToken', accessToken, {
        expires: 7, // 7 days
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      // Remove old authToken if exists
      Cookies.remove('authToken');

      setIsAuthenticated(true);
      setUser({ name: userData.name, id: '2' });

      return { success: true };
    } catch (error) {
      return { success: false, error: '회원가입에 실패했습니다.' };
    }
  };

  const logout = () => {
    Cookies.remove('accessToken');
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
