import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  mockExerciseData,
  mockMedications,
  mockDietData,
  mockNotifications,
} from '../data/mockData';
import styled from 'styled-components';
import {
  GridContainer,
  NavButton,
  StatusBadge,
} from '../components/StyledComponents';

const MAX_WIDTH = 1400;

const DashboardWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f7f9fb;
  font-family: 'Pretendard', 'Roboto', 'Noto Sans KR', sans-serif;
  display: block;
  margin: 0;
  padding: 20px 0;
  box-sizing: border-box;
`;

const DashboardBody = styled.div`
  width: 100%;
  max-width: ${MAX_WIDTH}px;
  margin: 0 auto;
  padding: 0 24px 32px 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 768px) {
    padding: 0 16px 24px 16px;
    gap: 20px;
  }
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${MAX_WIDTH}px;
  background-color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  margin: 0 auto 24px auto;
  border-radius: 24px;
  overflow: hidden;

  @media (max-width: 768px) {
    margin: 0 auto 20px auto;
    border-radius: 16px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 32px 40px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 24px 20px;
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
`;

const WelcomeText = styled.h1`
  font-size: 2.2rem;
  color: #2563eb;
  margin: 0;
  font-weight: 800;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    white-space: normal;
    text-align: center;
  }
`;

const DashboardCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px 24px;
  box-shadow: 0 6px 24px rgba(37, 99, 235, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  transition: transform 0.2s ease-in-out;
  min-width: 0;
  width: 100%;
  min-height: 280px;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    padding: 24px 16px;
    min-height: 240px;
    border-radius: 16px;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: #2563eb;
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 12px;
  }
`;

const CardValue = styled.p<{ color?: string }>`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${(props) => props.color || '#007bff'};
  margin: 8px 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 16px;
  }
`;

const CardButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  width: 100%;
  padding: 14px 24px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  background-color: ${(props) =>
    props.variant === 'secondary' ? '#6c757d' : '#007bff'};
  color: white;

  &:hover {
    background-color: ${(props) =>
      props.variant === 'secondary' ? '#5a6268' : '#0056b3'};
  }
`;

const NotificationCard = styled(DashboardCard)`
  text-align: left;
  align-items: flex-start;
  margin-bottom: 24px;
  padding: 20px;
  overflow: hidden;

  @media (max-width: 768px) {
    margin-bottom: 16px;
    padding: 16px;
  }
`;

const NotificationScrollContainer = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 8px 0 12px 0;
  margin-top: 16px;
  width: 100%;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

const NotificationItem = styled.div`
  min-width: 280px;
  flex-shrink: 0;
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const NotificationTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #343a40;
`;

const NotificationMessage = styled.p`
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #6c757d;
  line-height: 1.4;
`;

const NotificationTime = styled.span`
  font-size: 12px;
  color: #adb5bd;
  font-weight: 500;
`;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  const takenMedications = mockMedications.filter((med) => med.taken).length;
  const totalMedications = mockMedications.length;

  return (
    <DashboardWrapper>
      <HeaderWrapper>
        <Header>
          <WelcomeText>안녕하세요, 사용자님!</WelcomeText>
          <NavButton onClick={logout}>로그아웃</NavButton>
        </Header>
      </HeaderWrapper>

      <DashboardBody>
        {/* 오늘의 알림 - 그리드 위에 단독 배치 */}
        <NotificationCard>
          <div
            style={{
              fontSize: '16px',
              color: '#6c757d',
              marginBottom: '8px',
              fontWeight: 500,
            }}
          >
            {today}
          </div>
          <CardTitle>🔔 오늘의 알림</CardTitle>

          <NotificationScrollContainer>
            {mockNotifications.map((notification) => (
              <NotificationItem key={notification.id}>
                <NotificationTitle>{notification.title}</NotificationTitle>
                <NotificationMessage>
                  {notification.message}
                </NotificationMessage>
                <NotificationTime>{notification.time}</NotificationTime>
              </NotificationItem>
            ))}
          </NotificationScrollContainer>
        </NotificationCard>

        <GridContainer>
          {/* 약물 복용 현황 */}
          <DashboardCard>
            <CardTitle>💊 오늘의 약 복용</CardTitle>
            <CardValue color="#007bff">
              {takenMedications} / {totalMedications}
            </CardValue>
            <CardDescription>복용 완료</CardDescription>

            {/* 복용 기록 섹션 추가 */}
            <div
              style={{
                marginTop: '20px',
                padding: '16px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
              }}
            >
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#2563eb',
                }}
              >
                📋 복용 기록
              </div>
              <div
                style={{
                  margin: '8px 0',
                  fontSize: '14px',
                  color: '#007bff',
                  fontWeight: 600,
                }}
              >
                최근 7일간 복용률:{' '}
                <span style={{ color: '#28a745', fontWeight: 700 }}>86%</span>
              </div>
              <div
                style={{
                  margin: '4px 0 12px 0',
                  fontSize: '12px',
                  color: '#ff9800',
                  fontWeight: 500,
                }}
              >
                복용 성공! 건강을 지키고 있어요 👍
              </div>
            </div>

            <CardButton
              onClick={() => navigate('/medication')}
              style={{ marginTop: '16px' }}
            >
              약 복용 확인하기
            </CardButton>
          </DashboardCard>

          {/* 식단 관리 */}
          <DashboardCard>
            <CardTitle>🍽️ 식단 관리</CardTitle>
            <CardDescription style={{ marginBottom: '20px' }}>
              간편하게 식사를 기록하고
              <br />
              건강한 식습관을 만들어보세요
            </CardDescription>

            {/* 오늘의 추천 메뉴 섹션 */}
            <div
              style={{
                marginBottom: '20px',
                padding: '16px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef',
              }}
            >
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#495057',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                🌟 오늘의 추천 메뉴
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ fontSize: '14px', color: '#6c757d' }}>
                  <span style={{ fontWeight: '600', color: '#fd7e14' }}>
                    아침:
                  </span>{' '}
                  현미밥, 된장찌개, 김치
                </div>
                <div style={{ fontSize: '14px', color: '#6c757d' }}>
                  <span style={{ fontWeight: '600', color: '#20c997' }}>
                    점심:
                  </span>{' '}
                  닭가슴살 샐러드, 방울토마토
                </div>
                <div style={{ fontSize: '14px', color: '#6c757d' }}>
                  <span style={{ fontWeight: '600', color: '#6f42c1' }}>
                    저녁:
                  </span>{' '}
                  연어구이, 브로콜리, 현미밥
                </div>
              </div>
              <div
                style={{
                  marginTop: '8px',
                  fontSize: '12px',
                  color: '#28a745',
                  fontWeight: '500',
                }}
              >
                💡 균형잡힌 영양소로 구성된 건강 메뉴입니다
              </div>
            </div>

            <CardButton onClick={() => navigate('/diet')}>
              식사 기록하기
            </CardButton>
          </DashboardCard>

          {/* 운동 현황 */}
          <DashboardCard>
            <CardTitle>🚶‍♂️ 오늘의 운동</CardTitle>
            <CardValue color="#28a745">
              {mockExerciseData.today.steps.toLocaleString()}보
            </CardValue>
            <CardDescription>
              {mockExerciseData.today.distance} •{' '}
              {mockExerciseData.today.duration}
            </CardDescription>

            {/* 이웃 비교 섹션 추가 */}
            <div
              style={{
                marginTop: '20px',
                padding: '16px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
              }}
            >
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#28a745',
                }}
              >
                👥 이웃과 비교
              </div>
              <div
                style={{
                  margin: '8px 0',
                  fontSize: '14px',
                  color: '#28a745',
                  fontWeight: 600,
                }}
              >
                이웃 평균:{' '}
                <span style={{ color: '#6c757d', fontWeight: 500 }}>
                  {mockExerciseData.neighborComparison.neighborAverage.toLocaleString()}
                  보
                </span>
              </div>
              <div
                style={{
                  margin: '4px 0 12px 0',
                  fontSize: '12px',
                  color: '#ff9800',
                  fontWeight: 500,
                }}
              >
                🏆 {mockExerciseData.neighborComparison.ranking}로 우수해요!
              </div>
            </div>

            <CardButton
              onClick={() => navigate('/exercise')}
              style={{ marginTop: '16px' }}
            >
              운동 기록 보기
            </CardButton>
          </DashboardCard>

          {/* AI 음성 채팅 */}
          <DashboardCard>
            <CardTitle>🤖 AI 음성 상담</CardTitle>
            <CardDescription style={{ marginBottom: '40px' }}>
              건강 관련 질문이나
              <br />
              궁금한 점을 물어보세요
            </CardDescription>
            <CardButton onClick={() => navigate('/chat')}>
              AI와 대화하기
            </CardButton>
          </DashboardCard>
        </GridContainer>
      </DashboardBody>
    </DashboardWrapper>
  );
};

export default Dashboard;
