const WorkOutDispatchFunc = ({ workOutDispatch, idRef, confirmName }) => {
    // 연간 계획 메모
    const onUpdateWorkOut = (yesHours, yesMinutes, noHours, noMinutes, weight, rice) => {
        workOutDispatch({
            type: "UPDATE",
            data: {
                insert_name: confirmName,
                yes_oxygen_hour: yesHours,
                yes_oxygen_minute: yesMinutes,
                no_oxygen_hour: noHours,
                no_oxygen_minute: noMinutes,
                weight : weight,
                rice : rice,
                insert_date: new Date().getTime()
                // insert_date: 1741737600000
            },
        });
    }
    return { onUpdateWorkOut }
}

export default WorkOutDispatchFunc;