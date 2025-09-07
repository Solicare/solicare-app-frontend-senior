import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Container, LargeButton, LargeInput, LargeText, Card, FlexContainer, RegularText } from '../components/StyledComponents';

const LoginPage = () => {
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
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
        setError(result.error);
      }
    } catch (err) {
      setError('오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FlexContainer>
        <Card>
          <LargeText>
            {isLogin ? '로그인' : '회원가입'}
          </LargeText>
          
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <LargeInput
                  type="text"
                  name="name"
                  placeholder="이름을 입력하세요"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <LargeInput
                  type="email"
                  name="email"
                  placeholder="이메일을 입력하세요"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </>
            )}
            
            <LargeInput
              type="text"
              name="username"
              placeholder="아이디를 입력하세요"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            
            <LargeInput
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            {error && (
              <RegularText style={{ color: 'red', textAlign: 'center', margin: '20px 0' }}>
                {error}
              </RegularText>
            )}

            <LargeButton
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? '처리중...' : (isLogin ? '로그인' : '회원가입')}
            </LargeButton>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <RegularText>
              {isLogin ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}
            </RegularText>
            <LargeButton
              type="button"
              variant="secondary"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setFormData({ username: '', password: '', name: '', email: '' });
              }}
            >
              {isLogin ? '회원가입' : '로그인'}
            </LargeButton>
          </div>

          {isLogin && (
            <div style={{ textAlign: 'center', marginTop: '30px', padding: '20px', backgroundColor: '#e9ecef', borderRadius: '10px' }}>
              <RegularText style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                테스트용 계정
              </RegularText>
              <RegularText>아이디: admin</RegularText>
              <RegularText>비밀번호: password</RegularText>
            </div>
          )}
        </Card>
      </FlexContainer>
    </Container>
  );
};

export default LoginPage;
