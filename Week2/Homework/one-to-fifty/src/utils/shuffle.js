// Fisher-Yates: 원본을 복사하고 뒤에서부터 무작위 위치의 값과 교환
export const shuffle = (numbers) => {
  const shuffled = [...numbers];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
