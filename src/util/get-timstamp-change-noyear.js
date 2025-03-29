export const getTimeStampDateNoYear = (targetDate) => {
    const changeDate = new Date(targetDate); // 타임스탬프를 Date 객체로 변환

    const year = String(changeDate.getFullYear()); // 연도
    const month = String(changeDate.getMonth() + 1).padStart(2, '0'); // 월 (1월이 0부터 시작하므로 +1)
    const date = String(changeDate.getDate()).padStart(2, '0'); // 일

    // 요일을 텍스트로 변환
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = daysOfWeek[changeDate.getDay()]; // 요일

    return `${month}-${date} (${dayOfWeek})`; // 월-일 (요일)
}
