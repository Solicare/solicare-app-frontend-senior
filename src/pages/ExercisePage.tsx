import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockExerciseData } from '../data/mockData';
import styled from 'styled-components';
import {
  NavButton,
} from '../components/StyledComponents';

const CardTitle = styled.h3`
  font-size: 22px;
  color: #343a40;
  margin-bottom: 20px;
  font-weight: 600;
`;

// Styled Components for Exercise Page
const ExerciseWrapper = styled.div`
  padding: 40px;
  background-color: #f0f2f5;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  max-width: 1800px;
  margin: 0 auto;
  box-sizing: border-box;
  zoom: 0.9;
  transform-origin: top center;
`;

const ExerciseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background-color: white;
  padding: 20px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const PageTitle = styled.h2`
  font-size: 28px;
  color: #343a40;
  margin: 0;
  font-weight: 700;
`;

const ToggleViewButton = styled(NavButton)`
  margin-left: 15px;
`;

const SectionTitle = styled.h3`
  font-size: 24px;
  color: #343a40;
  margin-top: 40px;
  margin-bottom: 25px;
  font-weight: 600;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  margin: 40px 0;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
`;

const ExerciseCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 35px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 220px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardIcon = styled.span`
  font-size: 48px;
  margin-bottom: 20px;
`;

const CardValue = styled.p<{ color?: string }>`
  font-size: 42px;
  font-weight: bold;
  color: ${props => props.color || '#343a40'};
  margin: 0;
`;

const CardUnit = styled.p`
  font-size: 18px;
  color: #6c757d;
  margin-top: 8px;
`;

const ProgressWrapper = styled.div`
  width: 100%;
  margin-top: 15px;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 15px;
  background-color: #e9ecef;
  border-radius: 8px;
  overflow: hidden;
`;

const ProgressBar = styled.div<{ percentage: number }>`
  height: 100%;
  width: ${props => props.percentage}%;
  background-color: #28a745;
  border-radius: 8px;
  transition: width 0.5s ease-in-out;
`;

const ProgressText = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: 10px;
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const TipCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  margin-top: 30px;
`;

const TipItem = styled.p`
  font-size: 16px;
  color: #343a40;
  margin: 10px 0;
  line-height: 1.5;

  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

const WeeklySummaryCard = styled(TipCard)`
  margin-bottom: 30px;
`;

const WeeklySummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const WeeklySummaryLabel = styled.p`
  font-size: 16px;
  color: #555;
  margin: 0;
`;

const WeeklySummaryValue = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #343a40;
  margin: 0;
`;

const DailyRecordCard = styled(TipCard)`
  margin-bottom: 30px;
`;

const DailyRecordItem = styled.div<{ isToday: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: ${props => (props.isToday ? '#e3f2fd' : '#f8f9fa')};
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);

  &:last-child {
    margin-bottom: 0;
  }
`;

const DayInfo = styled.div`
  text-align: left;
`;

const DayText = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #343a40;
  margin: 0;
`;

const DurationText = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 5px 0 0 0;
`;

const StepsInfo = styled.div`
  text-align: right;
`;

const StepsText = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #343a40;
  margin: 0;
`;

const StepsPercentage = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 5px 0 0 0;
`;

const GoalProgressCard = styled(TipCard)`
  text-align: center;
`;

const GoalProgressBarWithText = styled.div<{ percentage: number }>`
  width: 100%;
  height: 30px;
  background-color: #e9ecef;
  border-radius: 15px;
  margin: 20px 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '${props => props.percentage}%';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #343a40;
    font-weight: bold;
    z-index: 2;
  }

  & > div {
    height: 100%;
    width: ${props => props.percentage}%;
    background-color: #28a745;
    border-radius: 15px;
    transition: width 0.5s ease-in-out;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
`;

const ExercisePage: React.FC = () => {
  const navigate = useNavigate();
  const [showWeekly, setShowWeekly] = useState(false);

  const today = mockExerciseData.today;
  const weekly = mockExerciseData.weekly;

  const getStepGoal = () => 5000; // 목표 걸음수
  const getStepPercentage = () => (today.steps / getStepGoal()) * 100;

  return (
    <ExerciseWrapper>
      <ExerciseHeader>
        <PageTitle>🚶‍♂️ 운동 기록</PageTitle>
        <div>
          <ToggleViewButton onClick={() => setShowWeekly(!showWeekly)}>
            {showWeekly ? '오늘' : '주간'}
          </ToggleViewButton>
          <NavButton onClick={() => navigate('/')}>홈으로</NavButton>
        </div>
      </ExerciseHeader>

      {!showWeekly ? (
        <>
          <SectionTitle>오늘의 운동</SectionTitle>

          <SummaryGrid>
            <ExerciseCard>
              <CardIcon>👟</CardIcon>
              <CardValue color="#28a745">{today.steps.toLocaleString()}</CardValue>
              <CardUnit>보</CardUnit>
              <ProgressWrapper>
                <ProgressBarContainer>
                  <ProgressBar percentage={Math.min(getStepPercentage(), 100)} />
                </ProgressBarContainer>
                <ProgressText>
                  목표: {getStepGoal().toLocaleString()}보 ({Math.round(getStepPercentage())}%)
                </ProgressText>
              </ProgressWrapper>
            </ExerciseCard>

            <ExerciseCard>
              <CardIcon>📏</CardIcon>
              <CardValue color="#007bff">{today.distance}</CardValue>
              <CardUnit>이동 거리</CardUnit>
            </ExerciseCard>

            <ExerciseCard>
              <CardIcon>⏱️</CardIcon>
              <CardValue color="#ffc107">{today.duration}</CardValue>
              <CardUnit>총 운동 시간</CardUnit>
            </ExerciseCard>

            <ExerciseCard>
              <CardIcon>🔥</CardIcon>
              <CardValue color="#dc3545">{today.calories}</CardValue>
              <CardUnit>kcal</CardUnit>
            </ExerciseCard>
          </SummaryGrid>

          <TipCard style={{ marginTop: '32px', padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '60px' }}>
              <div style={{ flex: '1.2' }}>
                <SectionTitle style={{ marginTop: 0, fontSize: '24px', marginBottom: '24px' }}>💡 오늘의 운동 팁</SectionTitle>
                <TipItem style={{ fontSize: '18px', marginBottom: '16px' }}>• 아침에 10분씩 스트레칭을 해보세요</TipItem>
                <TipItem style={{ fontSize: '18px', marginBottom: '16px' }}>• 계단을 이용해 다리 근육을 강화하세요</TipItem>
                <TipItem style={{ fontSize: '18px' }}>• 물을 충분히 마시며 운동하세요</TipItem>
              </div>
              <div style={{ flex: '0.8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ActionButton style={{ maxWidth: '320px', padding: '20px', fontSize: '20px' }}>
                  운동 시작하기
                </ActionButton>
              </div>
            </div>
          </TipCard>
        </>
      ) : (
        <>
          <SectionTitle>주간 운동 기록</SectionTitle>

          <WeeklySummaryCard>
            <CardTitle>이번 주 운동 요약</CardTitle>
            <WeeklySummaryItem>
              <WeeklySummaryLabel>총 걸음수</WeeklySummaryLabel>
              <WeeklySummaryValue>
                {weekly.reduce((sum, day) => sum + day.steps, 0).toLocaleString()}보
              </WeeklySummaryValue>
            </WeeklySummaryItem>
            <WeeklySummaryItem>
              <WeeklySummaryLabel>평균 걸음수</WeeklySummaryLabel>
              <WeeklySummaryValue>
                {Math.round(weekly.reduce((sum, day) => sum + day.steps, 0) / 7).toLocaleString()}보
              </WeeklySummaryValue>
            </WeeklySummaryItem>
            <WeeklySummaryItem>
              <WeeklySummaryLabel>총 운동 시간</WeeklySummaryLabel>
              <WeeklySummaryValue>
                {weekly.reduce((sum, day) => sum + parseInt(day.duration), 0)}분
              </WeeklySummaryValue>
            </WeeklySummaryItem>
          </WeeklySummaryCard>

          <DailyRecordCard>
            <CardTitle>일별 운동 기록</CardTitle>
            {weekly.map((day, index) => (
              <DailyRecordItem key={day.day} isToday={index === 6}>
                <DayInfo>
                  <DayText>{day.day}요일</DayText>
                  <DurationText>{day.duration} 운동</DurationText>
                </DayInfo>
                <StepsInfo>
                  <StepsText>{day.steps.toLocaleString()}보</StepsText>
                  <StepsPercentage>{Math.round((day.steps / getStepGoal()) * 100)}%</StepsPercentage>
                </StepsInfo>
              </DailyRecordItem>
            ))}
          </DailyRecordCard>

          <GoalProgressCard>
            <CardTitle>주간 목표 달성률</CardTitle>
            <GoalProgressBarWithText percentage={85}>
              <div />
            </GoalProgressBarWithText>
            <ProgressText>이번 주 목표 달성률</ProgressText>
          </GoalProgressCard>
        </>
      )}
    </ExerciseWrapper>
  );
};

export default ExercisePage;

