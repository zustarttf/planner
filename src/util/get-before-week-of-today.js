export const getBeforeWeekOfToday = () => {
    const today = new Date();

    // 이번 주의 첫 번째 날 (월요일)
    const firstDayOfWeek = new Date(today);
    const day = today.getDay(); // 0(일) ~ 6(토)
    const diffToMonday = (day === 0 ? -6 : 1) - day; // 일요일은 -6, 월~토는 1 - day
    firstDayOfWeek.setDate(today.getDate() + diffToMonday - 7); // 저번 주 월요일
    firstDayOfWeek.setHours(0, 0, 0, 0);

    // 저번 주의 마지막 날 (일요일)
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
    lastDayOfWeek.setHours(23, 59, 59, 999);

    // 타임스탬프 범위
    const startBeforeWeekTime = firstDayOfWeek.getTime();
    const endBeforeWeekTime = lastDayOfWeek.getTime();

    return { startBeforeWeekTime, endBeforeWeekTime };
};
