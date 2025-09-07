import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockMedications, mockExerciseData } from '../data/mockData';
import styled from 'styled-components';
import {
  GridContainer,
  StatusBadge,
  NavButton,
} from '../components/StyledComponents';

// New Styled Components for Dashboard
const DashboardWrapper = styled.div`
  padding: 30px;
  background-color: #f8f9fa;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  background-color: white;
  padding: 20px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const WelcomeText = styled.h1`
  font-size: 28px;
  color: #343a40;
  margin: 0;
  font-weight: 700;
`;

const DateText = styled.p`
  font-size: 18px;
  color: #6c757d;
  margin-top: -15px;
  margin-bottom: 30px;
`;

const DashboardCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardTitle = styled.h3`
  font-size: 22px;
  color: #343a40;
  margin-bottom: 20px;
  font-weight: 600;
`;

const CardValue = styled.p<{ color?: string }>`
  font-size: 36px;
  font-weight: bold;
  color: ${props => props.color || '#007bff'};
  margin: 10px 0;
`;

const CardDescription = styled.p`
  font-size: 16px;
  color: #888;
  margin-bottom: 25px;
`;

const CardButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  width: 100%;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  background-color: ${props => (props.variant === 'secondary' ? '#6c757d' : '#007bff')};
  color: white;

  &:hover {
    background-color: ${props => (props.variant === 'secondary' ? '#5a6268' : '#0056b3')};
  }
`;

const NotificationCard = styled(DashboardCard)`
  text-align: left;
  align-items: flex-start;
  margin-top: 30px;
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
  font-size: 15px;
  color: #343a40;

  &.time {
    color: #6c757d;
    font-size: 13px;
  }
`;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  const takenMedications = mockMedications.filter(med => med.taken).length;
  const totalMedications = mockMedications.length;

  return (
    <DashboardWrapper>
      <Header>
        <WelcomeText>안녕하세요, {user?.name}님!</WelcomeText>
        <NavButton onClick={logout}>로그아웃</NavButton>
      </Header>

      <DateText>{today}</DateText>

      <GridContainer>
        {/* 약물 복용 현황 */}
        <DashboardCard>
          <CardTitle>💊 오늘의 약 복용</CardTitle>
          <CardValue color="#007bff">
            {takenMedications} / {totalMedications}
          </CardValue>
          <CardDescription>복용 완료</CardDescription>
          <CardButton
            onClick={() => navigate('/medication')}
          >
            약 복용 확인하기
          </CardButton>
        </DashboardCard>

        {/* 운동 현황 */}
        <DashboardCard>
          <CardTitle>🚶‍♂️ 오늘의 운동</CardTitle>
          <CardValue color="#28a745">
            {mockExerciseData.today.steps.toLocaleString()}보
          </CardValue>
          <CardDescription>{mockExerciseData.today.distance} • {mockExerciseData.today.duration}</CardDescription>
          <CardButton
            onClick={() => navigate('/exercise')}
          >
            운동 기록 보기
          </CardButton>
        </DashboardCard>

        {/* AI 음성 채팅 */}
        <DashboardCard>
          <CardTitle>🤖 AI 음성 상담</CardTitle>
          <CardDescription>
            건강 관련 질문이나<br />궁금한 점을 물어보세요
          </CardDescription>
          <CardButton
            onClick={() => navigate('/chat')}
          >
            AI와 대화하기
          </CardButton>
        </DashboardCard>

        {/* 복용 기록 확인 */}
        <DashboardCard>
          <CardTitle>📋 복용 기록</CardTitle>
          <CardDescription>
            지난 7일간의<br />약물 복용 기록을 확인하세요
          </CardDescription>
          <CardButton
            variant="secondary"
            onClick={() => navigate('/medication/history')}
          >
            기록 확인하기
          </CardButton>
        </DashboardCard>
      </GridContainer>

      {/* 오늘의 알림 */}
      <NotificationCard>
        <CardTitle>🔔 오늘의 알림</CardTitle>
        {mockMedications.filter(med => !med.taken).map(med => (
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
    </DashboardWrapper>
  );
};

export default Dashboard;

