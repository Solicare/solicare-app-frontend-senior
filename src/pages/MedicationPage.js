import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockMedications } from '../data/mockData';
import { 
  Container, 
  LargeButton, 
  LargeText, 
  MediumText, 
  Card, 
  NavContainer, 
  NavButton,
  StatusBadge,
  RegularText
} from '../components/StyledComponents';

const MedicationPage = () => {
  const navigate = useNavigate();
  const [medications, setMedications] = useState(mockMedications);
  const [showHistory, setShowHistory] = useState(false);

  const toggleMedication = (id) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, taken: !med.taken } : med
    ));
  };

  const takenCount = medications.filter(med => med.taken).length;
  const totalCount = medications.length;

  const getTimeStatus = (time) => {
    const now = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    const medTime = new Date();
    medTime.setHours(hours, minutes, 0, 0);
    
    const diff = now - medTime;
    const diffHours = diff / (1000 * 60 * 60);
    
    if (diffHours < 0) return 'upcoming';
    if (diffHours < 1) return 'current';
    return 'overdue';
  };

  return (
    <Container>
      <NavContainer>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <MediumText style={{ margin: 0 }}>💊 약물 복용 관리</MediumText>
          <div>
            <NavButton onClick={() => setShowHistory(!showHistory)}>
              {showHistory ? '오늘 약' : '기록 보기'}
            </NavButton>
            <NavButton onClick={() => navigate('/')}>홈으로</NavButton>
          </div>
        </div>
      </NavContainer>

      {!showHistory ? (
        <>
          <LargeText>오늘의 약 복용</LargeText>
          
          {/* 복용 현황 요약 */}
          <Card>
            <div style={{ textAlign: 'center' }}>
              <LargeText style={{ color: '#007bff', margin: '10px 0' }}>
                {takenCount} / {totalCount}
              </LargeText>
              <RegularText>복용 완료</RegularText>
              <div style={{ 
                width: '100%', 
                height: '20px', 
                backgroundColor: '#e9ecef', 
                borderRadius: '10px',
                margin: '20px 0',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(takenCount / totalCount) * 100}%`,
                  height: '100%',
                  backgroundColor: '#28a745',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
          </Card>

          {/* 약물 목록 */}
          {medications.map(medication => {
            const timeStatus = getTimeStatus(medication.time);
            return (
              <Card key={medication.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <MediumText style={{ margin: '0 0 10px 0' }}>
                      {medication.name}
                    </MediumText>
                    <RegularText style={{ margin: '5px 0' }}>
                      ⏰ {medication.time} • {medication.dosage}
                    </RegularText>
                    <RegularText style={{ margin: '5px 0', color: '#666' }}>
                      {medication.note}
                    </RegularText>
                    <div style={{ marginTop: '10px' }}>
                      <StatusBadge status={medication.taken ? 'taken' : 'not-taken'}>
                        {medication.taken ? '복용완료' : '미복용'}
                      </StatusBadge>
                      {timeStatus === 'overdue' && !medication.taken && (
                        <StatusBadge status="not-taken" style={{ marginLeft: '10px' }}>
                          시간 지남
                        </StatusBadge>
                      )}
                    </div>
                  </div>
                  <LargeButton
                    variant={medication.taken ? 'secondary' : 'primary'}
                    onClick={() => toggleMedication(medication.id)}
                    style={{ 
                      width: '120px', 
                      height: '60px', 
                      fontSize: '18px',
                      marginLeft: '20px'
                    }}
                  >
                    {medication.taken ? '취소' : '복용'}
                  </LargeButton>
                </div>
              </Card>
            );
          })}
        </>
      ) : (
        <>
          <LargeText>복용 기록</LargeText>
          
          <Card>
            <MediumText>지난 7일간의 복용 기록</MediumText>
            <div style={{ margin: '20px 0' }}>
              {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => (
                <div key={day} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px',
                  backgroundColor: index === 6 ? '#e3f2fd' : '#f8f9fa',
                  borderRadius: '10px',
                  margin: '10px 0'
                }}>
                  <RegularText style={{ fontWeight: 'bold', margin: 0 }}>
                    {day}요일
                  </RegularText>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <StatusBadge status="taken">혈압약 ✓</StatusBadge>
                    <StatusBadge status="taken">당뇨약 ✓</StatusBadge>
                    <StatusBadge status={index > 3 ? 'taken' : 'not-taken'}>
                      비타민 {index > 3 ? '✓' : '✗'}
                    </StatusBadge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <MediumText>복용률 통계</MediumText>
            <div style={{ margin: '20px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0' }}>
                <RegularText>혈압약</RegularText>
                <RegularText style={{ fontWeight: 'bold' }}>100% (7/7일)</RegularText>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0' }}>
                <RegularText>당뇨약</RegularText>
                <RegularText style={{ fontWeight: 'bold' }}>100% (7/7일)</RegularText>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0' }}>
                <RegularText>비타민</RegularText>
                <RegularText style={{ fontWeight: 'bold' }}>43% (3/7일)</RegularText>
              </div>
            </div>
          </Card>
        </>
      )}
    </Container>
  );
};

export default MedicationPage;
