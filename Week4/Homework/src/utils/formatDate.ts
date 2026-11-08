// "2026. 10. 24. 오후 01:58" 형태로 변환 (참고 자료의 카드 날짜 형식)
export const formatDate = (isoString: string) =>
  new Date(isoString).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
