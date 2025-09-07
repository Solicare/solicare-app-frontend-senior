import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockExerciseData, mockMedications } from '../data/mockData';
import styled from 'styled-components';
import {
  GridContainer,
  NavButton,
  StatusBadge,
} from '../components/StyledComponents';

const MAX_WIDTH = 1280;

// New Styled Components for Dashboard
const TopBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f8f9fa;
  font-size: 14px;
  color: #343a40;
`;

const DashboardWrapper = styled.div`
  min-height: 100vh;
  background-color: #f7f9fb;
  font-family: 'Pretendard', 'Roboto', 'Noto Sans KR', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;

const DashboardBody = styled.div`
  width: 100vw;
  max-width: ${MAX_WIDTH}px;
  margin: 0 auto;
  padding: 0 32px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
`;

const HeaderWrapper = styled.div`
  width: 100vw;
  max-width: ${MAX_WIDTH}px;
  background-color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  margin: 32px auto 32px auto;
  border-radius: 24px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: ${MAX_WIDTH}px;
  margin: 0 auto;
  padding: 32px 48px;
  box-sizing: border-box;
`;

const WelcomeText = styled.h1`
  font-size: 2.4rem;
  color: #2563eb;
  margin: 0;
  font-weight: 800;
  margin-bottom: 0;
`;

const DashboardCard = styled.div`
  background: white;
  border-radius: 24px;
  padding: 48px 40px;
  box-shadow: 0 8px 32px rgba(37, 99, 235, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  transition: transform 0.2s ease-in-out;
  min-width: 0;
  width: 100%;
  min-height: 320px;
  box-sizing: border-box;
  margin-bottom: 32px;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardTitle = styled.h3`
  font-size: 2rem;
  color: #2563eb;
  font-weight: 700;
  margin-bottom: 18px;
`;

const CardValue = styled.p<{ color?: string }>`
  font-size: 44px;
  font-weight: bold;
  color: ${(props) => props.color || '#007bff'};
  margin: 10px 0;
`;

const CardDescription = styled.p`
  font-size: 18px;
  color: #888;
  margin-bottom: 25px;
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
  margin-top: 15px;
  margin-bottom: 15px;
`;

const NotificationItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:last-child {
    margin-bottom: 0;
  }
`;

const NotificationText = styled.p`
  margin: 0;
  font-size: 17px;
  color: #343a40;

  &.time {
    color: #6c757d;
    font-size: 15px;
  }
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
      <TopBar>
        <div>안녕하세요, 사용자님!</div>
        <a href="#" style={{ color: '#007bff', textDecoration: 'none' }}>
          로그아웃
        </a>
      </TopBar>
      <HeaderWrapper>
        <Header>
          <WelcomeText>안녕하세요, {user?.name}님!</WelcomeText>
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
          {mockMedications
            .filter((med) => !med.taken)
            .map((med) => (
              <NotificationItem key={med.id}>
                <div>
                  <NotificationText style={{ fontWeight: 'bold' }}>
                    {med.name} ({med.dosage})
                  </NotificationText>
                  <NotificationText className="time">
                    {med.time} - {med.note}
                  </NotificationText>
                </div>
                <StatusBadge status="not-taken">미복용</StatusBadge>
              </NotificationItem>
            ))}
        </NotificationCard>

        <GridContainer>
          {/* 약물 복용 현황 */}
          <DashboardCard>
            <CardTitle>💊 오늘의 약 복용</CardTitle>
            <CardValue color="#007bff">
              {takenMedications} / {totalMedications}
            </CardValue>
            <CardDescription>복용 완료</CardDescription>
            <CardButton onClick={() => navigate('/medication')}>
              약 복용 확인하기
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
            <CardButton onClick={() => navigate('/exercise')}>
              운동 기록 보기
            </CardButton>
          </DashboardCard>

          {/* 이웃과 활동량 비교 */}
          <DashboardCard>
            <CardTitle>🏆 이웃과 활동량 비교</CardTitle>
            <CardDescription>
              <>
                내가 속한 동네 평균 걸음 수<br />
                <span
                  style={{
                    fontWeight: 700,
                    color: '#007bff',
                    fontSize: '22px',
                  }}
                >
                  4,200보
                </span>
                <br />내 걸음 수<br />
                <span
                  style={{
                    fontWeight: 700,
                    color: '#28a745',
                    fontSize: '22px',
                  }}
                >
                  {mockExerciseData.today.steps.toLocaleString()}보
                </span>
              </>
            </CardDescription>
            <div
              style={{
                margin: '16px 0',
                fontWeight: 600,
                color: '#ff9800',
                fontSize: '18px',
              }}
            >
              상위 35%입니다! 👏
            </div>
            <CardButton
              onClick={() => alert('상세 비교 페이지는 준비 중입니다.')}
            >
              자세히 보기
            </CardButton>
          </DashboardCard>

          {/* 복용 기록 확인 */}
          <DashboardCard>
            <CardTitle>📋 복용 기록</CardTitle>
            <CardDescription>
              <>
                지난 7일간의
                <br />
                약물 복용 기록을 확인하세요
              </>
            </CardDescription>
            <div
              style={{
                margin: '12px 0',
                fontSize: '18px',
                color: '#007bff',
                fontWeight: 600,
              }}
            >
              최근 7일간 복용률:{' '}
              <span style={{ color: '#28a745', fontWeight: 700 }}>86%</span>
            </div>
            <div
              style={{
                margin: '8px 0',
                fontSize: '16px',
                color: '#ff9800',
                fontWeight: 500,
              }}
            >
              복용 성공! 건강을 지키고 있어요 👍
            </div>
            <CardButton
              style={{ marginBottom: '8px' }}
              onClick={() => navigate('/medication/history')}
            >
              기록 확인하기
            </CardButton>
            <CardButton
              variant="secondary"
              onClick={() => alert('복용 알림 설정 기능은 준비 중입니다.')}
            >
              복용 알림 설정하기
            </CardButton>
            <div style={{ marginTop: '10px', fontSize: '14px', color: '#888' }}>
              복용 기록을 달력으로 볼 수 있어요
            </div>
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
