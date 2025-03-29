const LankPlanDispatchFunc = ({ lankPlanDispatch, idRef, confirmName }) => {
    
const onInsertLankPlanData = (input) => {
        lankPlanDispatch({
            type: "INSERT",
            data: input,
        });
    }
    return {onInsertLankPlanData};
}

export default LankPlanDispatchFunc;