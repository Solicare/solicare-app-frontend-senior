import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockMedications } from '../data/mockData';
import styled from 'styled-components';
import {
  StatusBadge,
  NavButton,
} from '../components/StyledComponents';

interface MedicationItemProps {
  taken: boolean;
}

// Styled Components for Medication Page
const MedicationWrapper = styled.div`
  padding: 40px;
  background-color: #f0f2f5;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  max-width: 1800px;
  margin: 0 auto;
  box-sizing: border-box;
  zoom: 0.8;
  transform-origin: top center;
`;

const MedicationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background-color: white;
  padding: 24px 35px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const PageTitle = styled.h2`
  font-size: 32px;
  color: #343a40;
  margin: 0;
  font-weight: 700;
`;

const ToggleHistoryButton = styled(NavButton)`
  margin-left: 15px;
  font-size: 18px;
`;

const MediumText = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin: 15px 0;
`;

const MedicationSectionTitle = styled.h3`
  font-size: 24px;
  color: #343a40;
  margin: 0 0 32px 0;
  font-weight: 600;
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 32px;
  align-items: start;
`;

const MedicationSummaryCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  text-align: center;
`;

const SummaryText = styled.p`
  font-size: 26px;
  color: #555;
  margin-bottom: 20px;
`;

const SummaryValue = styled.p`
  font-size: 64px;
  font-weight: bold;
  color: #007bff;
  margin: 0 0 20px 0;
`;

const MedicationProgress = styled.div`
  width: 100%;
  height: 25px;
  background-color: #e9ecef;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 20px;
`;

const MedicationProgressBar = styled.div<{ progress: number }>`
  height: 100%;
  width: ${props => props.progress}%;
  background-color: #28a745;
  border-radius: 12px;
  transition: width 0.5s ease-in-out;
`;

const MedicationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
`;

const MedicationCard = styled.div<{ taken: boolean }>`
  background: white;
  border-radius: 16px;
  padding: 35px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  min-height: 240px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const MedicationContent = styled.div`
  margin-bottom: 24px;
`;

const MedicationName = styled.h4`
  font-size: 28px;
  color: #343a40;
  margin: 0 0 12px 0;
  font-weight: 600;
`;

const MedicationTimeDosage = styled.p`
  font-size: 20px;
  color: #6c757d;
  margin: 0 0 8px 0;
`;

const MedicationNote = styled.p`
  font-size: 18px;
  color: #888;
  margin: 0;
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
`;

const MedicationButton = styled.button<{ taken: boolean }>`
  width: 100%;
  padding: 16px 24px;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  color: white;
  background-color: ${props => props.taken ? '#6c757d' : '#007bff'};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    background-color: ${props => props.taken ? '#5a6268' : '#0056b3'};
  }

  &:active {
    transform: translateY(0);
  }
`;

const HistoryCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 35px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  margin-bottom: 32px;
`;

const HistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const HistoryDay = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #343a40;
  margin: 0;
  width: 80px;
`;

const HistoryMedList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex: 1;
  justify-content: flex-end;
`;

const HistoryStatusBadge = styled(StatusBadge)<{ status: 'taken' | 'not-taken' }>`
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 16px;
`;

const StatisticsCard = styled(HistoryCard)`
  margin-top: 32px;
`;

const StatisticItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const StatisticLabel = styled.p`
  font-size: 18px;
  color: #555;
  margin: 0;
`;

const StatisticValue = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #343a40;
  margin: 0;
`;

const MedicationPage: React.FC = () => {
  const navigate = useNavigate();
  const [medications, setMedications] = useState(mockMedications);
  const [showHistory, setShowHistory] = useState(false);

  const toggleMedication = (id: number) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, taken: !med.taken } : med
    ));
  };

  const takenCount = medications.filter(med => med.taken).length;
  const totalCount = medications.length;

  const getTimeStatus = (time: string) => {
    const now = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    const medTime = new Date();
    medTime.setHours(hours, minutes, 0, 0);
    
    const diff = now.getTime() - medTime.getTime();
    const diffHours = diff / (1000 * 60 * 60);
    
    if (diffHours < 0) return 'upcoming';
    if (diffHours < 1) return 'current';
    return 'overdue';
  };

  return (
    <MedicationWrapper>
      <MedicationHeader>
        <PageTitle>💊 약물 복용 관리</PageTitle>
        <div>
          <ToggleHistoryButton onClick={() => setShowHistory(!showHistory)}>
            {showHistory ? '오늘 약' : '기록 보기'}
          </ToggleHistoryButton>
          <NavButton onClick={() => navigate('/')}>홈으로</NavButton>
        </div>
      </MedicationHeader>

      {!showHistory ? (
        <>
          <MedicationSectionTitle>오늘의 약 복용</MedicationSectionTitle>

          <ContentLayout>
            {/* 복용 현황 요약 */}
            <MedicationSummaryCard>
              <SummaryText>복용 완료</SummaryText>
              <SummaryValue>
                {takenCount} / {totalCount}
              </SummaryValue>
              <MedicationProgress>
                <MedicationProgressBar progress={(takenCount / totalCount) * 100} />
              </MedicationProgress>
              <div style={{ 
                marginTop: '20px',
                fontSize: '16px',
                color: '#666',
                padding: '12px',
                background: '#f8f9fa',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                <span role="img" aria-label="reminder">⏰</span>
                다음 복용 시간까지 {totalCount - takenCount}개 남았습니다
              </div>
            </MedicationSummaryCard>

            {/* 약물 목록 */}
            <MedicationGrid>
              {medications.map(medication => {
                const timeStatus = getTimeStatus(medication.time);
                return (
                  <MedicationCard key={medication.id} taken={medication.taken}>
                    <MedicationContent>
                      <MedicationName>{medication.name}</MedicationName>
                      <MedicationTimeDosage>⏰ {medication.time} • {medication.dosage}</MedicationTimeDosage>
                      <MedicationNote>{medication.note}</MedicationNote>
                    </MedicationContent>
                    <div style={{ marginTop: 'auto' }}>
                      <BadgeContainer>
                        <StatusBadge status={medication.taken ? 'taken' : 'not-taken'}>
                          {medication.taken ? '복용완료' : '미복용'}
                        </StatusBadge>
                        {timeStatus === 'overdue' && !medication.taken && (
                          <StatusBadge status="not-taken">
                            시간 지남
                          </StatusBadge>
                        )}
                      </BadgeContainer>
                      <MedicationButton
                        taken={medication.taken}
                        onClick={() => toggleMedication(medication.id)}
                      >
                        {medication.taken ? '복용 취소' : '복용하기'}
                      </MedicationButton>
                    </div>
                  </MedicationCard>
                );
              })}
            </MedicationGrid>
          </ContentLayout>
        </>
      ) : (
        <>
          <MedicationSectionTitle>복용 기록</MedicationSectionTitle>
          <HistoryCard style={{ marginTop: '20px' }}>
            <MediumText>이번 주 복용 현황</MediumText>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '12px', marginBottom: '20px' }}>
              {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => (
                <div key={day} style={{ textAlign: 'center' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    background: index <= 3 ? '#e3f2fd' : '#bbdefb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 8px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#1976d2'
                  }}>
                    {day}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: index <= 3 ? '#4caf50' : '#2196f3',
                    fontWeight: 'bold'
                  }}>
                    {index <= 3 ? '100%' : '66%'}
                  </div>
                </div>
              ))}
            </div>
            {['혈압약', '당뇨약', '비타민'].map((med, index) => (
              <HistoryItem key={med}>
                <HistoryDay style={{ width: 'auto', marginRight: '15px' }}>{med}</HistoryDay>
                <HistoryMedList>
                  {[...Array(7)].map((_, i) => (
                    <HistoryStatusBadge 
                      key={i} 
                      status={index === 2 && i < 3 ? 'not-taken' : 'taken'}
                      style={{ minWidth: '30px', textAlign: 'center' }}
                    >
                      {index === 2 && i < 3 ? '✗' : '✓'}
                    </HistoryStatusBadge>
                  ))}
                </HistoryMedList>
              </HistoryItem>
            ))}
          </HistoryCard>

          <StatisticsCard>
            <MediumText>월간 복용 통계</MediumText>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ 
                background: '#f5f5f5', 
                padding: '20px', 
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#2196f3', marginBottom: '8px' }}>
                  89%
                </div>
                <div style={{ color: '#666' }}>이번 달 평균 복용률</div>
              </div>
              <div style={{ 
                background: '#f5f5f5', 
                padding: '20px', 
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#4caf50', marginBottom: '8px' }}>
                  15일
                </div>
                <div style={{ color: '#666' }}>연속 복용 달성</div>
              </div>
              <StatisticItem style={{ gridColumn: '1 / -1', background: '#fff', padding: '15px', borderRadius: '8px' }}>
                <div>
                  <StatisticLabel style={{ marginBottom: '5px', color: '#333', fontWeight: 'bold' }}>복용 성공률 추이</StatisticLabel>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {[85, 92, 88, 95, 89].map((value, i) => (
                      <div key={i} style={{ 
                        height: `${value}px`, 
                        width: '30px', 
                        background: value >= 90 ? '#4caf50' : '#2196f3',
                        borderRadius: '4px',
                        position: 'relative'
                      }}>
                        <div style={{ 
                          position: 'absolute', 
                          top: '-20px', 
                          width: '100%', 
                          textAlign: 'center',
                          fontSize: '12px'
                        }}>{value}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </StatisticItem>
            </div>
          </StatisticsCard>
        </>
      )}
    </MedicationWrapper>
  );
};

export default MedicationPage;
