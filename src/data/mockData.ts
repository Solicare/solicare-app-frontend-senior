// Mock data for the application
export const mockMedications = [
  {
    id: 1,
    name: '혈압약',
    time: '08:00',
    taken: true,
    dosage: '1정',
    note: '식전 복용',
  },
  {
    id: 2,
    name: '당뇨약',
    time: '12:00',
    taken: false,
    dosage: '1정',
    note: '식후 복용',
  },
  {
    id: 3,
    name: '비타민',
    time: '18:00',
    taken: false,
    dosage: '1정',
    note: '식후 복용',
  },
  {
    id: 4,
    name: '수면보조제',
    time: '21:00',
    taken: false,
    dosage: '1정',
    note: '취침 30분 전 복용',
  },
];

export const mockExerciseData = {
  today: {
    steps: 3240,
    distance: '2.1km',
    calories: 156,
    duration: '25분',
  },
  neighborComparison: {
    mySteps: 3240,
    neighborAverage: 2850,
    percentile: 72, // 상위 28%
    ranking: '상위 28%',
  },
  weekly: [
    { day: '월', steps: 2800, duration: '20분' },
    { day: '화', steps: 3200, duration: '25분' },
    { day: '수', steps: 2900, duration: '22분' },
    { day: '목', steps: 3500, duration: '28분' },
    { day: '금', steps: 3100, duration: '24분' },
    { day: '토', steps: 2800, duration: '20분' },
    { day: '일', steps: 3240, duration: '25분' },
  ],
};

interface Message {
  id: number;
  type: 'user' | 'ai';
  message: string;
  timestamp: string;
}

export const mockChatHistory: Message[] = [
  {
    id: 1,
    type: 'user',
    message: '오늘 약을 먹었는지 확인해주세요',
    timestamp: '2024-01-15 10:30',
  },
  {
    id: 2,
    type: 'ai',
    message:
      '네, 확인해드리겠습니다. 오늘 아침 혈압약은 복용하셨고, 점심 당뇨약과 저녁 비타민은 아직 복용하지 않으셨습니다.',
    timestamp: '2024-01-15 10:31',
  },
  {
    id: 3,
    type: 'user',
    message: '운동은 얼마나 했나요?',
    timestamp: '2024-01-15 10:32',
  },
  {
    id: 4,
    type: 'ai',
    message:
      '오늘은 3,240보를 걸으셨고, 2.1km를 이동하셨습니다. 총 25분간 운동하셨네요. 정말 좋습니다!',
    timestamp: '2024-01-15 10:33',
  },
];

export const mockDietData = {
  today: {
    consumedCalories: 420,
    targetCalories: 1800,
    mealsCompleted: 1,
    totalMeals: 4,
  },
  nutrients: {
    protein: 15,
    carbs: 65,
    fat: 8,
    targetProtein: 120,
    targetCarbs: 250,
    targetFat: 60,
  },
};

export const mockNotifications = [
  {
    id: 1,
    title: '💊 약 복용 알림',
    message: '고혈압약 복용 시간입니다',
    time: '15:00',
    type: 'medication',
  },
  {
    id: 2,
    title: '🚶‍♂️ 운동 추천',
    message: '오늘 걸음 수가 목표에 가까워요!',
    time: '16:30',
    type: 'exercise',
  },
  {
    id: 3,
    title: '🍽️ 식단 알림',
    message: '저녁 식사 시간이 다가왔어요',
    time: '18:00',
    type: 'diet',
  },
  {
    id: 4,
    title: '💧 수분 섭취',
    message: '물 마실 시간이에요',
    time: '19:00',
    type: 'water',
  },
  {
    id: 5,
    title: '🌙 수면 준비',
    message: '숙면을 위해 준비하세요',
    time: '21:30',
    type: 'sleep',
  },
];
