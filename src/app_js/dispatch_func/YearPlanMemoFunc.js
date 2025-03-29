const YearPlanMemoFunc = ({ yearPlanMemoDispatch, idRef, confirmName}) => {

    // 연간 계획 메모
    const onUpdateYearPlanMemo = (input) => {
        yearPlanMemoDispatch({
            type: "UPDATE",
            data: input,
        });
    }

    return {onUpdateYearPlanMemo};
}

export default YearPlanMemoFunc;