import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { NavButton } from '../components/StyledComponents';

interface MealRecord {
  id: number;
  name: string;
  time: string;
  date: string;
}

// Styled Components
const DietWrapper = styled.div`
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 40px;
  }
`;

const DietHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
  background-color: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 24px 35px;
  }
`;

const PageTitle = styled.h2`
  font-size: 24px;
  color: #343a40;
  margin: 0;
  font-weight: 700;

  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

const AddMealForm = styled.div`
  background: white;
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    padding: 20px;
  }
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 15px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 14px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  min-width: 0;

  &:focus {
    outline: none;
    border-color: #27ae60;
    box-shadow: 0 0 0 2px rgba(39, 174, 96, 0.2);
  }
`;

const Select = styled.select`
  padding: 14px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  background-color: white;

  @media (min-width: 768px) {
    min-width: 140px;
    width: auto;
    flex-shrink: 0;
  }

  &:focus {
    outline: none;
    border-color: #27ae60;
    box-shadow: 0 0 0 2px rgba(39, 174, 96, 0.2);
  }
`;

const AddButton = styled.button`
  background: #27ae60;
  color: white;
  border: none;
  padding: 14px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.2s;
  width: 100%;
  margin-top: 5px;

  @media (min-width: 768px) {
    width: auto;
    margin-top: 0;
    min-width: 100px;
    flex-shrink: 0;
  }

  &:hover {
    background: #219a52;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const MealList = styled.div`
  background: white;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    padding: 20px;
  }
`;

const MealItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 15px 0;
  border-bottom: 1px solid #ecf0f1;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const MealInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const MealName = styled.div`
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 6px;
  font-size: 16px;
  line-height: 1.3;
  word-wrap: break-word;

  @media (min-width: 768px) {
    margin-bottom: 4px;
  }
`;

const MealTime = styled.div`
  color: #7f8c8d;
  font-size: 14px;
  line-height: 1.2;
`;

const DeleteButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
  align-self: flex-start;
  white-space: nowrap;

  @media (min-width: 768px) {
    align-self: center;
    padding: 8px 16px;
  }

  &:hover {
    background: #c0392b;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #7f8c8d;
  padding: 30px 20px;
  font-size: 16px;
  line-height: 1.5;

  @media (min-width: 768px) {
    padding: 40px;
  }
`;

const DietPage: React.FC = () => {
  const navigate = useNavigate();
  
  // localStorage에서 식사 데이터 불러오기
  const [meals, setMeals] = useState<MealRecord[]>(() => {
    const savedMeals = localStorage.getItem('meals');
    return savedMeals ? JSON.parse(savedMeals) : [
      {
        id: 1,
        name: '아침: 계란후라이, 토스트',
        time: '08:00',
        date: '2024-09-14',
      },
      { id: 2, name: '점심: 김치찌개, 밥', time: '12:30', date: '2024-09-14' },
      {
        id: 3,
        name: '저녁: 연어구이, 샐러드',
        time: '18:00',
        date: '2024-09-14',
      },
    ];
  });

  // 식사 데이터가 변경될 때마다 localStorage에 저장
  React.useEffect(() => {
    localStorage.setItem('meals', JSON.stringify(meals));
  }, [meals]);

  const [newMealName, setNewMealName] = useState('');
  const [newMealTime, setNewMealTime] = useState('breakfast');

  const addMeal = () => {
    if (newMealName.trim()) {
      const now = new Date();
      const timeLabels = {
        breakfast: '08:00',
        lunch: '12:00',
        dinner: '18:00',
        snack: '15:00',
      };

      const mealTypeLabels = {
        breakfast: '아침',
        lunch: '점심',
        dinner: '저녁',
        snack: '간식',
      };

      const newMeal: MealRecord = {
        id: Date.now(),
        name: `${mealTypeLabels[newMealTime as keyof typeof mealTypeLabels]}: ${newMealName}`,
        time: timeLabels[newMealTime as keyof typeof timeLabels],
        date: now.toISOString().split('T')[0],
      };

      setMeals([...meals, newMeal]);
      setNewMealName('');
    }
  };

  const deleteMeal = (id: number) => {
    setMeals(meals.filter((meal) => meal.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addMeal();
    }
  };

  return (
    <DietWrapper>
      <DietHeader>
        <PageTitle>🍽️ 식사 기록</PageTitle>
        <NavButton onClick={() => navigate('/')}>홈으로</NavButton>
      </DietHeader>

      <AddMealForm>
        <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>새 식사 추가</h3>
        <FormRow>
          <Select
            value={newMealTime}
            onChange={(e) => setNewMealTime(e.target.value)}
          >
            <option value="breakfast">아침</option>
            <option value="lunch">점심</option>
            <option value="dinner">저녁</option>
            <option value="snack">간식</option>
          </Select>
          <Input
            type="text"
            placeholder="식사 내용을 입력하세요 (예: 김치찌개, 밥)"
            value={newMealName}
            onChange={(e) => setNewMealName(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <AddButton onClick={addMeal}>추가</AddButton>
        </FormRow>
      </AddMealForm>

      <MealList>
        <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>
          오늘의 식사 목록
        </h3>
        {meals.length === 0 ? (
          <EmptyMessage>
            아직 기록된 식사가 없습니다. 첫 식사를 추가해보세요!
          </EmptyMessage>
        ) : (
          meals.map((meal) => (
            <MealItem key={meal.id}>
              <MealInfo>
                <MealName>{meal.name}</MealName>
                <MealTime>{meal.time}</MealTime>
              </MealInfo>
              <DeleteButton onClick={() => deleteMeal(meal.id)}>
                삭제
              </DeleteButton>
            </MealItem>
          ))
        )}
      </MealList>
    </DietWrapper>
  );
};

export default DietPage;
