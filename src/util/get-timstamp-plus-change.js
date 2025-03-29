export const getTimeStampPlusDate = (targetDate) => {
    const changeDate = new Date(targetDate); // 타임스탬프를 Date 객체로 변환
    const year = String(changeDate.getFullYear()); // 연도
    const month = String(changeDate.getMonth() + 1).padStart(2, '0'); // 월 (1월이 0부터 시작하므로 +1)
    const date = String(changeDate.getDate()).padStart(2, '0'); // 일
    const hours = String(changeDate.getHours()).padStart(2, '0'); // 시간
    const minutes = String(changeDate.getMinutes()).padStart(2, '0'); // 분

    return `${year}-${month}-${date} ${hours}:${minutes}`; // 시간과 분을 추가
}