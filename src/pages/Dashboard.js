import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockMedications, mockExerciseData } from '../data/mockData';
import { 
  Container, 
  LargeButton, 
  LargeText, 
  MediumText, 
  Card, 
  GridContainer, 
  NavContainer, 
  NavButton,
  StatusBadge,
  RegularText
} from '../components/StyledComponents';

const Dashboard = () => {
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
    <Container>
      <NavContainer>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <MediumText style={{ margin: 0 }}>안녕하세요, {user?.name}님!</MediumText>
          <NavButton onClick={logout}>로그아웃</NavButton>
        </div>
      </NavContainer>

      <LargeText>{today}</LargeText>

      <GridContainer>
        {/* 약물 복용 현황 */}
        <Card>
          <MediumText>💊 오늘의 약 복용</MediumText>
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <LargeText style={{ color: '#007bff', margin: '10px 0' }}>
              {takenMedications} / {totalMedications}
            </LargeText>
            <RegularText>복용 완료</RegularText>
          </div>
          <LargeButton 
            variant="primary" 
            onClick={() => navigate('/medication')}
          >
            약 복용 확인하기
          </LargeButton>
        </Card>

        {/* 운동 현황 */}
        <Card>
          <MediumText>🚶‍♂️ 오늘의 운동</MediumText>
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <LargeText style={{ color: '#28a745', margin: '10px 0' }}>
              {mockExerciseData.today.steps.toLocaleString()}보
            </LargeText>
            <RegularText>{mockExerciseData.today.distance} • {mockExerciseData.today.duration}</RegularText>
          </div>
          <LargeButton 
            variant="primary" 
            onClick={() => navigate('/exercise')}
          >
            운동 기록 보기
          </LargeButton>
        </Card>

        {/* AI 음성 채팅 */}
        <Card>
          <MediumText>🤖 AI 음성 상담</MediumText>
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <RegularText>건강 관련 질문이나<br/>궁금한 점을 물어보세요</RegularText>
          </div>
          <LargeButton 
            variant="primary" 
            onClick={() => navigate('/chat')}
          >
            AI와 대화하기
          </LargeButton>
        </Card>

        {/* 복용 기록 확인 */}
        <Card>
          <MediumText>📋 복용 기록</MediumText>
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <RegularText>지난 7일간의<br/>약물 복용 기록을 확인하세요</RegularText>
          </div>
          <LargeButton 
            variant="secondary" 
            onClick={() => navigate('/medication/history')}
          >
            기록 확인하기
          </LargeButton>
        </Card>
      </GridContainer>

      {/* 오늘의 알림 */}
      <Card style={{ marginTop: '30px' }}>
        <MediumText>🔔 오늘의 알림</MediumText>
        <div style={{ margin: '20px 0' }}>
          {mockMedications.filter(med => !med.taken).map(med => (
            <div key={med.id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '15px',
              backgroundColor: '#fff3cd',
              borderRadius: '10px',
              margin: '10px 0'
            }}>
              <div>
                <RegularText style={{ fontWeight: 'bold', margin: 0 }}>
                  {med.name} ({med.dosage})
                </RegularText>
                <RegularText style={{ margin: 0, color: '#856404' }}>
                  {med.time} - {med.note}
                </RegularText>
              </div>
              <StatusBadge status="not-taken">미복용</StatusBadge>
            </div>
          ))}
        </div>
      </Card>
    </Container>
  );
};

export default Dashboard;
