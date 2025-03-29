const EventLogDispatchFunc = ({ eventLogDispatch, idRef, confirmName }) => {
const onInsertEventLogData = (subject, verb, object, about) => {
        eventLogDispatch({
            type: "INSERT",
            data: {
                subject: subject,
                verb: verb,
                object: object,
                about: about,
                insert_date: new Date().getTime(),
            },
        });
    }
    return {onInsertEventLogData};
}

export default EventLogDispatchFunc;