import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockExerciseData } from '../data/mockData';
import { 
  Container, 
  LargeButton, 
  LargeText, 
  MediumText, 
  Card, 
  NavContainer, 
  NavButton,
  RegularText,
  GridContainer
} from '../components/StyledComponents';

const ExercisePage = () => {
  const navigate = useNavigate();
  const [showWeekly, setShowWeekly] = useState(false);

  const today = mockExerciseData.today;
  const weekly = mockExerciseData.weekly;

  const getStepGoal = () => 5000; // 목표 걸음수
  const getStepPercentage = () => (today.steps / getStepGoal()) * 100;

  return (
    <Container>
      <NavContainer>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <MediumText style={{ margin: 0 }}>🚶‍♂️ 운동 기록</MediumText>
          <div>
            <NavButton onClick={() => setShowWeekly(!showWeekly)}>
              {showWeekly ? '오늘' : '주간'}
            </NavButton>
            <NavButton onClick={() => navigate('/')}>홈으로</NavButton>
          </div>
        </div>
      </NavContainer>

      {!showWeekly ? (
        <>
          <LargeText>오늘의 운동</LargeText>
          
          {/* 오늘의 운동 요약 */}
          <GridContainer>
            <Card>
              <MediumText>👟 걸음수</MediumText>
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <LargeText style={{ color: '#28a745', margin: '10px 0' }}>
                  {today.steps.toLocaleString()}
                </LargeText>
                <RegularText>보</RegularText>
                <div style={{ 
                  width: '100%', 
                  height: '15px', 
                  backgroundColor: '#e9ecef', 
                  borderRadius: '8px',
                  margin: '15px 0',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${Math.min(getStepPercentage(), 100)}%`,
                    height: '100%',
                    backgroundColor: '#28a745',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
                <RegularText style={{ fontSize: '16px', color: '#666' }}>
                  목표: {getStepGoal().toLocaleString()}보 ({Math.round(getStepPercentage())}%)
                </RegularText>
              </div>
            </Card>

            <Card>
              <MediumText>📏 거리</MediumText>
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <LargeText style={{ color: '#007bff', margin: '10px 0' }}>
                  {today.distance}
                </LargeText>
                <RegularText>이동 거리</RegularText>
              </div>
            </Card>

            <Card>
              <MediumText>⏱️ 운동 시간</MediumText>
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <LargeText style={{ color: '#ffc107', margin: '10px 0' }}>
                  {today.duration}
                </LargeText>
                <RegularText>총 운동 시간</RegularText>
              </div>
            </Card>

            <Card>
              <MediumText>🔥 소모 칼로리</MediumText>
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <LargeText style={{ color: '#dc3545', margin: '10px 0' }}>
                  {today.calories}
                </LargeText>
                <RegularText>kcal</RegularText>
              </div>
            </Card>
          </GridContainer>

          {/* 운동 기록 버튼 */}
          <Card>
            <MediumText>운동 기록하기</MediumText>
            <RegularText style={{ margin: '20px 0' }}>
              산책, 스트레칭, 기타 운동을 기록해보세요
            </RegularText>
            <LargeButton variant="primary">
              운동 시작하기
            </LargeButton>
          </Card>

          {/* 운동 팁 */}
          <Card>
            <MediumText>💡 오늘의 운동 팁</MediumText>
            <RegularText style={{ margin: '15px 0' }}>
              • 아침에 10분씩 스트레칭을 해보세요
            </RegularText>
            <RegularText style={{ margin: '15px 0' }}>
              • 계단을 이용해 다리 근육을 강화하세요
            </RegularText>
            <RegularText style={{ margin: '15px 0' }}>
              • 물을 충분히 마시며 운동하세요
            </RegularText>
          </Card>
        </>
      ) : (
        <>
          <LargeText>주간 운동 기록</LargeText>
          
          {/* 주간 요약 */}
          <Card>
            <MediumText>이번 주 운동 요약</MediumText>
            <div style={{ margin: '20px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0' }}>
                <RegularText>총 걸음수</RegularText>
                <RegularText style={{ fontWeight: 'bold' }}>
                  {weekly.reduce((sum, day) => sum + day.steps, 0).toLocaleString()}보
                </RegularText>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0' }}>
                <RegularText>평균 걸음수</RegularText>
                <RegularText style={{ fontWeight: 'bold' }}>
                  {Math.round(weekly.reduce((sum, day) => sum + day.steps, 0) / 7).toLocaleString()}보
                </RegularText>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0' }}>
                <RegularText>총 운동 시간</RegularText>
                <RegularText style={{ fontWeight: 'bold' }}>
                  {weekly.reduce((sum, day) => sum + parseInt(day.duration), 0)}분
                </RegularText>
              </div>
            </div>
          </Card>

          {/* 일별 기록 */}
          <Card>
            <MediumText>일별 운동 기록</MediumText>
            <div style={{ margin: '20px 0' }}>
              {weekly.map((day, index) => (
                <div key={day.day} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px',
                  backgroundColor: index === 6 ? '#e3f2fd' : '#f8f9fa',
                  borderRadius: '10px',
                  margin: '10px 0'
                }}>
                  <div>
                    <RegularText style={{ fontWeight: 'bold', margin: 0 }}>
                      {day.day}요일
                    </RegularText>
                    <RegularText style={{ margin: 0, color: '#666' }}>
                      {day.duration} 운동
                    </RegularText>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <RegularText style={{ fontWeight: 'bold', margin: 0 }}>
                      {day.steps.toLocaleString()}보
                    </RegularText>
                    <RegularText style={{ margin: 0, color: '#666' }}>
                      {Math.round((day.steps / getStepGoal()) * 100)}%
                    </RegularText>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* 주간 목표 달성률 */}
          <Card>
            <MediumText>주간 목표 달성률</MediumText>
            <div style={{ margin: '20px 0' }}>
              <div style={{ 
                width: '100%', 
                height: '25px', 
                backgroundColor: '#e9ecef', 
                borderRadius: '12px',
                margin: '20px 0',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '85%',
                  height: '100%',
                  backgroundColor: '#28a745',
                  transition: 'width 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  85%
                </div>
              </div>
              <RegularText style={{ textAlign: 'center', color: '#666' }}>
                이번 주 목표 달성률
              </RegularText>
            </div>
          </Card>
        </>
      )}
    </Container>
  );
};

export default ExercisePage;
