import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MAX_WIDTH = 1000;

const Wrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  font-family:
    'Noto Sans KR', 'Pretendard', '맑은 고딕', 'Nanum Gothic', 'Roboto',
    sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopBar = styled.div`
  width: 100vw;
  max-width: ${MAX_WIDTH}px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 48px 0 48px;
  background: transparent;
`;

const Logo = styled.span`
  font-size: 2.2rem;
  font-weight: 800;
  color: #2563eb;
  letter-spacing: 1px;
`;

const TopBtnGroup = styled.div`
  display: flex;
  gap: 20px;
`;

const TopBtn = styled.button`
  background: #2563eb;
  color: #fff;
  font-size: 1.15rem;
  font-weight: 600;
  border: none;
  border-radius: 16px;
  padding: 14px 36px;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.1);
  transition: background 0.2s;
  &:hover {
    background: #1746a0;
  }
`;

const MainBody = styled.div`
  width: 100vw;
  max-width: ${MAX_WIDTH}px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainCard = styled.div`
  width: 100%;
  max-width: ${MAX_WIDTH}px;
  background: #fff;
  border-radius: 28px;
  box-shadow: 0 6px 24px rgba(37, 99, 235, 0.08);
  padding: 48px 40px 36px 40px;
  text-align: center;
  margin: 36px 0 28px 0;
`;

const MainTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 20px;
  font-family:
    'Noto Sans KR', 'Pretendard', '맑은 고딕', 'Nanum Gothic', 'Roboto',
    sans-serif;
`;

const MainDesc = styled.p`
  font-size: 1.18rem;
  color: #222;
  margin-bottom: 28px;
  line-height: 1.7;
  font-family:
    'Noto Sans KR', 'Pretendard', '맑은 고딕', 'Nanum Gothic', 'Roboto',
    sans-serif;
`;

const InfoSection = styled.div`
  width: 100%;
  max-width: ${MAX_WIDTH}px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  margin-bottom: 48px;
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const InfoCard = styled.div`
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.08);
  padding: 32px 24px;
  text-align: left;
  font-size: 1.15rem;
  color: #2563eb;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const InfoCardTitle = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1746a0;
`;

const InfoCardDesc = styled.span`
  color: #222;
  font-weight: 400;
  font-size: 1.05rem;
  margin-top: 12px;
`;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <TopBar>
        <Logo>Solicare 시니어 포탈</Logo>
        <TopBtnGroup>
          <TopBtn onClick={() => navigate('/login')}>로그인</TopBtn>
          <TopBtn onClick={() => navigate('/login')}>회원가입</TopBtn>
        </TopBtnGroup>
      </TopBar>
      <MainBody>
        <MainCard>
          <MainTitle>내 건강, 내 일상, 내 손안에</MainTitle>
          <MainDesc>
            <b>Solicare</b> 시니어 포탈은 어르신을 위한 맞춤 건강관리, 복약,
            운동, 커뮤니티 서비스를 제공합니다.
            <br />
            쉽고 편리하게 건강을 관리하고, 다양한 정보와 소통을 경험하세요.
          </MainDesc>
        </MainCard>
        <InfoSection>
          <InfoCard>
            <InfoCardTitle>실시간 건강지표</InfoCardTitle>
            <InfoCardDesc>
              심박수, 혈압, 체온 등 내 건강상태를 한눈에 확인
            </InfoCardDesc>
          </InfoCard>
          <InfoCard>
            <InfoCardTitle>복약 관리</InfoCardTitle>
            <InfoCardDesc>
              복약 알림과 기록으로 약 복용을 놓치지 않아요
            </InfoCardDesc>
          </InfoCard>
          <InfoCard>
            <InfoCardTitle>운동 기록</InfoCardTitle>
            <InfoCardDesc>매일의 운동 목표와 성취를 쉽게 관리</InfoCardDesc>
          </InfoCard>
          <InfoCard>
            <InfoCardTitle>커뮤니티</InfoCardTitle>
            <InfoCardDesc>
              다른 시니어와 소통하며 정보와 응원을 나눠요
            </InfoCardDesc>
          </InfoCard>
        </InfoSection>
      </MainBody>
    </Wrapper>
  );
};

export default HomePage;
