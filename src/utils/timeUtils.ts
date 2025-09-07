export const formatTimeRemaining = (time: string): string => {
  const now = new Date();
  const [hours, minutes] = time.split(':').map(Number);
  const targetTime = new Date();
  targetTime.setHours(hours, minutes, 0, 0);

  // 목표 시간이 현재보다 이전이면 다음날로 설정
  if (targetTime.getTime() < now.getTime()) {
    targetTime.setDate(targetTime.getDate() + 1);
  }

  const diff = targetTime.getTime() - now.getTime();
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (diffHours === 0) {
    if (diffMinutes === 0) {
      return '지금';
    }
    return `${diffMinutes}분 후`;
  } else if (diffHours < 24) {
    return `${diffHours}시간 ${diffMinutes}분 후`;
  } else {
    return '내일';
  }
};

export const getTimeStatus = (
  time: string
): 'upcoming' | 'current' | 'overdue' => {
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
