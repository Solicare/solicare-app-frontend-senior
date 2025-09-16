import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginPageContainer = styled.div`
  min-height: 100vh;
  background-color: #f7f9fb;
  font-family: 'Pretendard', 'Roboto', 'Noto Sans KR', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginCard = styled.div<{ isSignup?: boolean }>`
  background: #fff;
  border-radius: 32px;
  box-shadow: 0 8px 32px rgba(37, 99, 235, 0.1);
  width: 100vw;
  max-width: ${(props) => props.isSignup ? '800px' : '520px'};
  padding: 64px 48px 48px 48px;
  text-align: center;
  margin: 0 auto;
  transition: max-width 0.3s ease;
`;

const Title = styled.h2`
  font-size: 2.4rem;
  font-weight: 800;
  color: #2563eb;
  margin-bottom: 32px;
`;

const Input = styled.input`
  width: 100%;
  padding: 22px;
  margin-bottom: 24px;
  border: 1.5px solid #e0e0e0;
  border-radius: 14px;
  font-size: 1.25rem;
  background: #f7f9fb;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #2563eb;
    outline: none;
  }
`;

const Button = styled.button<{
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}>`
  width: 100%;
  padding: 22px;
  border: none;
  border-radius: 14px;
  font-size: 1.25rem;
  font-weight: 700;
  background-color: ${(props) =>
    props.variant === 'secondary' ? '#e0e0e0' : '#2563eb'};
  color: ${(props) => (props.variant === 'secondary' ? '#222' : '#fff')};
  margin-top: ${(props) => (props.variant === 'secondary' ? '18px' : '0')};
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.08);
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.variant === 'secondary' ? '#d1d5db' : '#1746a0'};
  }

  &:disabled {
    background-color: #e9ecef;
    color: #a0a0a0;
    cursor: not-allowed;
    transform: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 22px;
  margin-bottom: 24px;
  border: 1.5px solid #e0e0e0;
  border-radius: 14px;
  font-size: 1.25rem;
  background: #f7f9fb;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #2563eb;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 22px;
  margin-bottom: 24px;
  border: 1.5px solid #e0e0e0;
  border-radius: 14px;
  font-size: 1.25rem;
  background: #f7f9fb;
  transition: border-color 0.3s ease;
  resize: vertical;
  min-height: 80px;

  &:focus {
    border-color: #2563eb;
    outline: none;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

const FormRow = styled.div`
  grid-column: 1 / -1;
  
  &.half {
    grid-column: span 1;
    
    @media (max-width: 768px) {
      grid-column: 1 / -1;
    }
  }
`;

const ErrorText = styled.p`
  color: #e74c3c;
  font-size: 1.1rem;
  margin-bottom: 20px;
`;

const ToggleText = styled.p`
  font-size: 1.15rem;
  color: #555;
  margin-top: 28px;
`;

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    gender: '',
    age: '',
    phone: '',
    address: '',
    notes: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await login(formData.username, formData.password);
      if (res.success) {
        navigate('/dashboard', { replace: true });
      } else {
        setError(res.error || '로그인 실패');
      }
    } catch {
      setError('로그인 중 오류 발생');
    }
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
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
        setError(
          result.error ?? '로그인 또는 회원가입 중 오류가 발생했습니다.'
        );
      }
    } catch {
      setError('오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginPageContainer>
      <LoginCard isSignup={!isLogin}>
        <Title>{isLogin ? '로그인' : '회원가입'}</Title>

        {error && <ErrorText>{error}</ErrorText>}

        <form onSubmit={isLogin ? handleLogin : handleSignup}>
          {!isLogin ? (
            <FormGrid>
              <FormRow className="half">
                <Input
                  type="text"
                  name="name"
                  placeholder="이름"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </FormRow>

              <FormRow className="half">
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">성별 선택</option>
                  <option value="남성">남성</option>
                  <option value="여성">여성</option>
                </Select>
              </FormRow>

              <FormRow className="half">
                <Input
                  type="text"
                  name="username"
                  placeholder="ID"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </FormRow>

              <FormRow className="half">
                <Input
                  type="password"
                  name="password"
                  placeholder="PW"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </FormRow>

              <FormRow className="half">
                <Input
                  type="number"
                  name="age"
                  placeholder="나이"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                  min="0"
                  max="120"
                />
              </FormRow>

              <FormRow className="half">
                <Input
                  type="tel"
                  name="phone"
                  placeholder="전화번호"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </FormRow>

              <FormRow>
                <Input
                  type="text"
                  name="address"
                  placeholder="주소"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </FormRow>

              <FormRow>
                <TextArea
                  name="notes"
                  placeholder="특이사항"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                />
              </FormRow>
            </FormGrid>
          ) : (
            <>
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
            </>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? '처리중...' : isLogin ? '로그인' : '회원가입'}
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
            setFormData({ 
              username: '', 
              password: '', 
              name: '', 
              gender: '', 
              age: '', 
              phone: '', 
              address: '', 
              notes: '' 
            });
          }}
        >
          {isLogin ? '회원가입' : '로그인'}
        </Button>
      </LoginCard>
    </LoginPageContainer>
  );
};

export default LoginPage;
