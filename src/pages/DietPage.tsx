import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { StatusBadge, NavButton } from '../components/StyledComponents';

interface MealItem {
  id: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  name: string;
  calories: number;
  time: string;
  completed: boolean;
  nutrients: {
    protein: number;
    carbs: number;
    fat: number;
  };
  recipe?: {
    ingredients: string[];
    instructions: string[];
    cookingTime: string;
    difficulty: string;
  };
}

// Mock data for diet
const mockMeals: MealItem[] = [
  {
    id: 1,
    mealType: 'breakfast',
    name: '현미밥, 된장찌개, 시금치나물',
    calories: 420,
    time: '08:00',
    completed: true,
    nutrients: { protein: 15, carbs: 65, fat: 8 },
    recipe: {
      ingredients: [
        '현미밥 1공기',
        '된장 2큰술',
        '시금치 100g',
        '마늘 2쪽',
        '참기름 1작은술',
      ],
      instructions: [
        '현미밥을 지어 따뜻하게 준비합니다',
        '된장찌개: 된장을 물에 풀고 끓입니다',
        '시금치를 깨끗이 씻어 데칩니다',
        '데친 시금치에 마늘, 참기름을 넣어 무칩니다',
      ],
      cookingTime: '25분',
      difficulty: '쉬움',
    },
  },
  {
    id: 2,
    mealType: 'lunch',
    name: '닭가슴살 샐러드, 고구마',
    calories: 380,
    time: '12:00',
    completed: false,
    nutrients: { protein: 35, carbs: 45, fat: 5 },
    recipe: {
      ingredients: [
        '닭가슴살 150g',
        '양상추 50g',
        '토마토 1개',
        '고구마 1개',
        '올리브오일 1큰술',
      ],
      instructions: [
        '닭가슴살을 소금, 후추로 간하여 구워줍니다',
        '고구마를 쪄서 준비합니다',
        '양상추와 토마토를 깨끗이 씻어 썹니다',
        '모든 재료를 섞어 올리브오일로 드레싱합니다',
      ],
      cookingTime: '20분',
      difficulty: '쉬움',
    },
  },
  {
    id: 3,
    mealType: 'dinner',
    name: '연어구이, 브로콜리, 현미밥',
    calories: 450,
    time: '18:00',
    completed: false,
    nutrients: { protein: 28, carbs: 40, fat: 15 },
    recipe: {
      ingredients: [
        '연어 120g',
        '브로콜리 100g',
        '현미밥 1공기',
        '레몬 1/2개',
        '올리브오일 1큰술',
      ],
      instructions: [
        '연어에 소금, 후추로 간을 합니다',
        '팬에 올리브오일을 두르고 연어를 구워줍니다',
        '브로콜리를 데쳐서 준비합니다',
        '현미밥과 함께 레몬을 곁들여 내놓습니다',
      ],
      cookingTime: '15분',
      difficulty: '보통',
    },
  },
  {
    id: 4,
    mealType: 'snack',
    name: '견과류 한줌, 사과',
    calories: 200,
    time: '15:00',
    completed: false,
    nutrients: { protein: 6, carbs: 25, fat: 12 },
    recipe: {
      ingredients: ['아몬드 10개', '호두 5개', '사과 1/2개', '꿀 1작은술'],
      instructions: [
        '견과류를 적당히 섞어 준비합니다',
        '사과를 깨끗이 씻어 먹기 좋게 썹니다',
        '원하면 꿀을 살짝 뿌려 드세요',
        '간식으로 천천히 드시면 됩니다',
      ],
      cookingTime: '5분',
      difficulty: '매우 쉬움',
    },
  },
];

// Styled Components
const DietWrapper = styled.div`
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

const DietHeader = styled.div`
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

const SectionTitle = styled.h3`
  font-size: 24px;
  color: #343a40;
  margin: 0 0 32px 0;
  font-weight: 600;
`;

const ContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const TopSummaryCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: flex-start;
  gap: 40px;
`;

const CalorieSection = styled.div`
  flex: 0.4;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const NutrientSection = styled.div`
  flex: 0.6;
`;

const CalorieText = styled.p`
  font-size: 26px;
  color: #555;
  margin-bottom: 20px;
`;

const CalorieValue = styled.p`
  font-size: 64px;
  font-weight: bold;
  color: #28a745;
  margin: 0 0 20px 0;
`;

const CalorieProgress = styled.div`
  width: 100%;
  height: 25px;
  background-color: #e9ecef;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 20px;
`;

const CalorieProgressBar = styled.div<{ progress: number }>`
  height: 100%;
  width: ${(props) => props.progress}%;
  background-color: #28a745;
  border-radius: 12px;
  transition: width 0.5s ease-in-out;
`;

const NutrientChart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const NutrientItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
`;

const NutrientInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const NutrientName = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #343a40;
`;

const NutrientAmount = styled.span`
  font-size: 14px;
  color: #666;
`;

const NutrientBar = styled.div`
  width: 200px;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
`;

const NutrientBarFill = styled.div<{ width: number; color: string }>`
  height: 100%;
  width: ${(props) => props.width}%;
  background: ${(props) => props.color};
  transition: width 0.5s ease;
`;

const MealGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const MealCard = styled.div<{ completed: boolean }>`
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  min-height: 280px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const MealHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const MealType = styled.span<{ type: string }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  background: ${(props) =>
    props.type === 'breakfast'
      ? '#ff9800'
      : props.type === 'lunch'
        ? '#2196f3'
        : props.type === 'dinner'
          ? '#9c27b0'
          : '#4caf50'};
`;

const MealTime = styled.span`
  font-size: 16px;
  color: #666;
  font-weight: 500;
`;

const MealName = styled.h4`
  font-size: 20px;
  color: #343a40;
  margin: 0 0 16px 0;
  font-weight: 600;
  line-height: 1.4;
`;

const CalorieInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const CalorieNumber = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #28a745;
`;

const CalorieUnit = styled.span`
  font-size: 16px;
  color: #666;
`;

const NutrientSummary = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
`;

const NutrientValue = styled.div`
  text-align: center;
`;

const NutrientLabel = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
`;

const NutrientNumber = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #343a40;
`;

const MealButton = styled.button<{ completed: boolean }>`
  width: 100%;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background-color: ${(props) => (props.completed ? '#6c757d' : '#28a745')};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-top: auto;

  &:hover {
    transform: translateY(-2px);
    background-color: ${(props) => (props.completed ? '#5a6268' : '#218838')};
  }

  &:active {
    transform: translateY(0);
  }
`;

const RecipeButton = styled.button`
  width: 100%;
  padding: 8px 16px;
  border: 2px solid #87ceeb;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #1e90ff;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-top: 8px;

  &:hover {
    background-color: #87ceeb;
    color: white;
    transform: translateY(-1px);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const RecipeModal = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 30px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease-out;
  position: relative;

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(-50px) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const RecipeTitle = styled.h2`
  color: #ff5722;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 700;
`;

const RecipeSection = styled.div`
  margin-bottom: 20px;
`;

const RecipeSectionTitle = styled.h3`
  color: #333;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 600;
`;

const RecipeList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const RecipeListItem = styled.li`
  background-color: #f8f9fa;
  padding: 8px 12px;
  margin-bottom: 6px;
  border-radius: 8px;
  border-left: 4px solid #ff5722;
  font-size: 14px;
`;

const RecipeInfo = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const RecipeInfoItem = styled.div`
  background-color: #e3f2fd;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #1976d2;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #333;
  }
`;

const DietPage: React.FC = () => {
  const navigate = useNavigate();
  const [meals, setMeals] = useState<MealItem[]>(mockMeals);
  const [selectedRecipe, setSelectedRecipe] = useState<MealItem | null>(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);

  const toggleMeal = (id: number) => {
    setMeals(
      meals.map((meal) =>
        meal.id === id ? { ...meal, completed: !meal.completed } : meal
      )
    );
  };

  const openRecipeModal = (meal: MealItem) => {
    setSelectedRecipe(meal);
    setShowRecipeModal(true);
  };

  const closeRecipeModal = () => {
    setShowRecipeModal(false);
    setSelectedRecipe(null);
  };

  const completedMeals = meals.filter((meal) => meal.completed).length;
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const consumedCalories = meals
    .filter((meal) => meal.completed)
    .reduce((sum, meal) => sum + meal.calories, 0);
  const targetCalories = 1800; // 목표 칼로리

  const totalNutrients = meals.reduce(
    (acc, meal) => ({
      protein: acc.protein + meal.nutrients.protein,
      carbs: acc.carbs + meal.nutrients.carbs,
      fat: acc.fat + meal.nutrients.fat,
    }),
    { protein: 0, carbs: 0, fat: 0 }
  );

  const getMealTypeLabel = (type: string) => {
    switch (type) {
      case 'breakfast':
        return '아침';
      case 'lunch':
        return '점심';
      case 'dinner':
        return '저녁';
      case 'snack':
        return '간식';
      default:
        return type;
    }
  };

  return (
    <DietWrapper>
      <DietHeader>
        <PageTitle>🍽️ 식단 관리</PageTitle>
        <NavButton onClick={() => navigate('/')}>홈으로</NavButton>
      </DietHeader>

      <SectionTitle>오늘의 식단</SectionTitle>

      <ContentLayout>
        {/* 상단 요약 카드 */}
        <TopSummaryCard>
          <CalorieSection>
            <CalorieText>섭취 칼로리</CalorieText>
            <CalorieValue>
              {consumedCalories} / {targetCalories}
            </CalorieValue>
            <CalorieProgress>
              <CalorieProgressBar
                progress={(consumedCalories / targetCalories) * 100}
              />
            </CalorieProgress>
            <div
              style={{
                marginTop: '20px',
                fontSize: '16px',
                color: '#666',
                padding: '12px',
                background: '#f8f9fa',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <span role="img" aria-label="meal">
                🍽️
              </span>
              {completedMeals}/{meals.length} 식사 완료
            </div>
          </CalorieSection>

          <NutrientSection>
            <div
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#343a40',
                marginBottom: '20px',
              }}
            >
              📊 영양소 분석
            </div>

            <NutrientChart>
              <NutrientItem>
                <NutrientInfo>
                  <NutrientName>단백질</NutrientName>
                  <NutrientAmount>
                    {totalNutrients.protein}g / 120g
                  </NutrientAmount>
                </NutrientInfo>
                <NutrientBar>
                  <NutrientBarFill
                    width={Math.min((totalNutrients.protein / 120) * 100, 100)}
                    color="#ff5722"
                  />
                </NutrientBar>
              </NutrientItem>

              <NutrientItem>
                <NutrientInfo>
                  <NutrientName>탄수화물</NutrientName>
                  <NutrientAmount>
                    {totalNutrients.carbs}g / 250g
                  </NutrientAmount>
                </NutrientInfo>
                <NutrientBar>
                  <NutrientBarFill
                    width={Math.min((totalNutrients.carbs / 250) * 100, 100)}
                    color="#2196f3"
                  />
                </NutrientBar>
              </NutrientItem>

              <NutrientItem>
                <NutrientInfo>
                  <NutrientName>지방</NutrientName>
                  <NutrientAmount>{totalNutrients.fat}g / 60g</NutrientAmount>
                </NutrientInfo>
                <NutrientBar>
                  <NutrientBarFill
                    width={Math.min((totalNutrients.fat / 60) * 100, 100)}
                    color="#ff9800"
                  />
                </NutrientBar>
              </NutrientItem>
            </NutrientChart>
          </NutrientSection>
        </TopSummaryCard>

        {/* 식사 카드들 */}
        <MealGrid>
          {meals.map((meal) => (
            <MealCard key={meal.id} completed={meal.completed}>
              <MealHeader>
                <MealType type={meal.mealType}>
                  {getMealTypeLabel(meal.mealType)}
                </MealType>
                <MealTime>{meal.time}</MealTime>
              </MealHeader>

              <MealName>{meal.name}</MealName>

              <CalorieInfo>
                <CalorieNumber>{meal.calories}</CalorieNumber>
                <CalorieUnit>kcal</CalorieUnit>
              </CalorieInfo>

              <NutrientSummary>
                <NutrientValue>
                  <NutrientLabel>단백질</NutrientLabel>
                  <NutrientNumber>{meal.nutrients.protein}g</NutrientNumber>
                </NutrientValue>
                <NutrientValue>
                  <NutrientLabel>탄수화물</NutrientLabel>
                  <NutrientNumber>{meal.nutrients.carbs}g</NutrientNumber>
                </NutrientValue>
                <NutrientValue>
                  <NutrientLabel>지방</NutrientLabel>
                  <NutrientNumber>{meal.nutrients.fat}g</NutrientNumber>
                </NutrientValue>
              </NutrientSummary>

              <div style={{ marginBottom: '16px' }}>
                <StatusBadge status={meal.completed ? 'taken' : 'not-taken'}>
                  {meal.completed ? '섭취완료' : '미섭취'}
                </StatusBadge>
              </div>

              <MealButton
                completed={meal.completed}
                onClick={() => toggleMeal(meal.id)}
              >
                {meal.completed ? '섭취 취소' : '섭취 완료'}
              </MealButton>

              {meal.recipe && (
                <RecipeButton onClick={() => openRecipeModal(meal)}>
                  📖 레시피 보기
                </RecipeButton>
              )}
            </MealCard>
          ))}
        </MealGrid>
      </ContentLayout>

      {/* 레시피 모달 */}
      {showRecipeModal && selectedRecipe && (
        <ModalOverlay onClick={closeRecipeModal}>
          <RecipeModal onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeRecipeModal}>×</CloseButton>

            <RecipeTitle>🍽️ {selectedRecipe.name}</RecipeTitle>

            <RecipeInfo>
              <RecipeInfoItem>
                ⏱️ {selectedRecipe.recipe?.cookingTime}
              </RecipeInfoItem>
              <RecipeInfoItem>
                📊 {selectedRecipe.recipe?.difficulty}
              </RecipeInfoItem>
              <RecipeInfoItem>🔥 {selectedRecipe.calories}kcal</RecipeInfoItem>
            </RecipeInfo>

            <RecipeSection>
              <RecipeSectionTitle>🥘 재료</RecipeSectionTitle>
              <RecipeList>
                {selectedRecipe.recipe?.ingredients.map((ingredient, index) => (
                  <RecipeListItem key={index}>• {ingredient}</RecipeListItem>
                ))}
              </RecipeList>
            </RecipeSection>

            <RecipeSection>
              <RecipeSectionTitle>👩‍🍳 조리법</RecipeSectionTitle>
              <RecipeList>
                {selectedRecipe.recipe?.instructions.map(
                  (instruction, index) => (
                    <RecipeListItem key={index}>
                      <strong>{index + 1}.</strong> {instruction}
                    </RecipeListItem>
                  )
                )}
              </RecipeList>
            </RecipeSection>

            <RecipeSection>
              <RecipeSectionTitle>📊 영양성분</RecipeSectionTitle>
              <RecipeInfo>
                <RecipeInfoItem>
                  단백질 {selectedRecipe.nutrients.protein}g
                </RecipeInfoItem>
                <RecipeInfoItem>
                  탄수화물 {selectedRecipe.nutrients.carbs}g
                </RecipeInfoItem>
                <RecipeInfoItem>
                  지방 {selectedRecipe.nutrients.fat}g
                </RecipeInfoItem>
              </RecipeInfo>
            </RecipeSection>
          </RecipeModal>
        </ModalOverlay>
      )}
    </DietWrapper>
  );
};

export default DietPage;
