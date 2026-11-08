// "2026. 10. 24. 오후 01:58" 형태로 변환 (참고 자료의 카드 날짜 형식)
// 서버가 UTC 시각을 Z 없이 보내서(예: 2026-11-08T12:00:47) 브라우저가 한국 시간으로 오해함
// Z를 붙여 UTC임을 알려주면 toLocaleString이 한국 시간으로 올바르게 변환함
export const formatDate = (isoString: string) =>
  new Date(isoString + "Z").toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
