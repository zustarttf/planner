export const getTimeStampDate = (targetDate) => {
    const changeDate = new Date(targetDate); // 타임스탬프를 Date 객체로 변환
    const year = String(changeDate.getFullYear()); // 연도를 두 자리로 변환
    const month = String(changeDate.getMonth() + 1).padStart(2, '0'); // 월 (1월이 0부터 시작하므로 +1)
    const date = String(changeDate.getDate()).padStart(2, '0'); // 일

    return `${year}-${month}-${date}`;
}
