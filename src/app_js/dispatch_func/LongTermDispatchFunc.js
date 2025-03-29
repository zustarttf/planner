const LongTermDispatchFunc = ({ longTermPlanDispatch, idRef, confirmName }) => {

    const onInsertLontermData = (input) => {
        longTermPlanDispatch({
            type: "INSERT",
            data: input,
        });
    }

    const onRemoveLontermData = (input) => {
        longTermPlanDispatch({
            type: "DELETE",
            data: input,
            loginName: confirmName,
        });
    }

    const onUpdateLontermData = (input) => {
        longTermPlanDispatch({
            type: "UPDATE",
            data: input,
            loginName: confirmName,
        });
    }

    const onUpdateCheckLongtermData = (input) => {
        longTermPlanDispatch({
            type: "UPDATE_CHECKED",
            data: input,
        });
    }

    return { onInsertLontermData, onRemoveLontermData, onUpdateLontermData, onUpdateCheckLongtermData };
}

export default LongTermDispatchFunc;