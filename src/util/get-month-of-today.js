export const getMonthOfToday = () => {
    const today = new Date();

    // 이번 달의 첫 번째 날
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    firstDayOfMonth.setHours(0, 0, 0, 0);

    // 이번 달의 마지막 날
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    lastDayOfMonth.setHours(23, 59, 59, 999);

    // 타임스탬프 범위
    const startMonthTime = firstDayOfMonth.getTime();
    const endMonthTime = lastDayOfMonth.getTime();

    return { startMonthTime, endMonthTime };
};
