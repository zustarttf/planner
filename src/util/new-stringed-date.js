export const newStringedDate = (daysToSubtract = 0) => {
    const todayDate = new Date();
    todayDate.setDate(todayDate.getDate() - daysToSubtract);
        const year = todayDate.getFullYear();
        const month = (todayDate.getMonth() + 1).toString().padStart(2, '0');
        const day = todayDate.getDate().toString().padStart(2, '0');
        const collectDate = `${year}-${month}-${day}`;
        return collectDate;
}