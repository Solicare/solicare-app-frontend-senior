import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 20px;
  box-sizing: border-box;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 28px;
  color: #333;
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary'; disabled?: boolean }>`
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  background-color: ${props => (props.variant === 'secondary' ? '#6c757d' : '#007bff')};
  color: white;
  margin-top: ${props => (props.variant === 'secondary' ? '15px' : '0')};

  &:hover {
    transform: translateY(-2px);
    background-color: ${props => (props.variant === 'secondary' ? '#5a6268' : '#0056b3')};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #e9ecef;
    color: #a0a0a0;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorText = styled.p`
  color: #e74c3c;
  font-size: 14px;
  margin-bottom: 20px;
`;

const ToggleText = styled.p`
  font-size: 16px;
  color: #555;
  margin-top: 25px;
`;

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let result;
      if (isLogin) {
        result = await login(formData.username, formData.password);
      } else {
        result = await signup(formData);
      }

      if (!result.success) {
        setError(result.error ?? '로그인 또는 회원가입 중 오류가 발생했습니다.');
      }
    } catch (err) {
      setError('오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginPageContainer>
      <LoginCard>
        <Title>{isLogin ? '로그인' : '회원가입'}</Title>

        {error && <ErrorText>{error}</ErrorText>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <Input
                type="text"
                name="name"
                placeholder="이름을 입력하세요"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <Input
                type="email"
                name="email"
                placeholder="이메일을 입력하세요"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </>
          )}

          <Input
            type="text"
            name="username"
            placeholder="아이디를 입력하세요"
            value={formData.username}
            onChange={handleInputChange}
            required
          />

          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          <Button type="submit" disabled={loading}>
            {loading ? '처리중...' : (isLogin ? '로그인' : '회원가입')}
          </Button>
        </form>

        <ToggleText>
          {isLogin ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}
        </ToggleText>
        <Button
          variant="secondary"
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setError('');
            setFormData({ username: '', password: '', name: '', email: '' });
          }}
        >
          {isLogin ? '회원가입' : '로그인'}
        </Button>
      </LoginCard>
    </LoginPageContainer>
  );
};

export default LoginPage;

