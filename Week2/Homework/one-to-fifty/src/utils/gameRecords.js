export const readGameRecords = () => {
  try {
    const records = JSON.parse(localStorage.getItem("gameRecords"));
    if (!Array.isArray(records)) return [];
    return records.filter((record) =>
      record && [1, 2, 3].includes(record.level) &&
      Number.isFinite(record.time) && record.time >= 0 &&
      typeof record.date === "string",
    );
  } catch {
    return [];
  }
};

export const saveGameRecord = (record) => {
  try {
    const records = readGameRecords();
    localStorage.setItem("gameRecords", JSON.stringify([...records, record]));
    return true;
  } catch {
    return false;
  }
};

export const formatRecordDate = (date) => {
  // 기존 한국어 날짜 기록은 그대로 표시하고 새 ISO 날짜만 변환
  if (!/^\d{4}-\d{2}-\d{2}T/.test(date)) return date;
  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime()) ? date : parsedDate.toLocaleString("ko-KR");
};
