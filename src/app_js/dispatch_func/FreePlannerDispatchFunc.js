const FreePlannerDispatchFunc = ({ freePlannerDataDispatch, idRef, confirmName }) => {
    
const onInsertFreePlanData = (input, loginName) => {
        freePlannerDataDispatch({
            type: "INSERT",
            data: input,
            loginName : loginName
        });
    }
    return {onInsertFreePlanData};
}

export default FreePlannerDispatchFunc;