const DiaryDispatchFunc = ({ dispatch, idRef, confirmName }) => {

    const onCreate = (
        createDate,
        emotionId,
        content,
        inputBoxCount,
        inputBoxStudyCount,
        content_memo,
        iBox_1,
        iBox_2,
        iBox_3,
        iBox_4,
        iBox_5,
        iBox_6,
        iBox_7,
        iBox_8,
        iBox_9,
        iBox_10,
        iBox_study_1,
        iBox_study_2,
        iBox_study_3,
        iBox_study_4,
        iBox_study_5,
        iBox_study_6,
        iBox_study_7,
        iBox_study_8,
        iBox_study_9,
        iBox_study_10,
    ) => {
        dispatch({
            type: "CREATE",
            data: {
                id: idRef.current++,
                createDate,
                emotionId,
                content,
                inputBoxCount,
                inputBoxStudyCount,
                content_memo,
                iBox_1: iBox_1,
                iBox_2: iBox_2,
                iBox_3: iBox_3,
                iBox_4: iBox_4,
                iBox_5: iBox_5,
                iBox_6: iBox_6,
                iBox_7: iBox_7,
                iBox_8: iBox_8,
                iBox_9: iBox_9,
                iBox_10: iBox_10,
                iBox_study_1: iBox_study_1,
                iBox_study_2: iBox_study_2,
                iBox_study_3: iBox_study_3,
                iBox_study_4: iBox_study_4,
                iBox_study_5: iBox_study_5,
                iBox_study_6: iBox_study_6,
                iBox_study_7: iBox_study_7,
                iBox_study_8: iBox_study_8,
                iBox_study_9: iBox_study_9,
                iBox_study_10: iBox_study_10,
                confirmName: confirmName,
            }
        });
    };

    const onUpdate = (
        id,
        createDate,
        emotionId,
        content,
        inputBoxCount,
        inputBoxStudyCount,
        content_memo,
        iBox_1,
        iBox_2,
        iBox_3,
        iBox_4,
        iBox_5,
        iBox_6,
        iBox_7,
        iBox_8,
        iBox_9,
        iBox_10,
        iBox_study_1,
        iBox_study_2,
        iBox_study_3,
        iBox_study_4,
        iBox_study_5,
        iBox_study_6,
        iBox_study_7,
        iBox_study_8,
        iBox_study_9,
        iBox_study_10,
        iBox_check_1,
        iBox_check_2,
        iBox_check_3,
        iBox_check_4,
        iBox_check_5,
        iBox_check_6,
        iBox_check_7,
        iBox_check_8,
        iBox_check_9,
        iBox_check_10,
        iBox_study_check_1,
        iBox_study_check_2,
        iBox_study_check_3,
        iBox_study_check_4,
        iBox_study_check_5,
        iBox_study_check_6,
        iBox_study_check_7,
        iBox_study_check_8,
        iBox_study_check_9,
        iBox_study_check_10,
    ) => {
        // console.log("업데이트");
        dispatch({
            type: "UPDATE",
            data: {
                id: id,
                createDate,
                emotionId,
                content,
                inputBoxCount,
                inputBoxStudyCount,
                content_memo,
                iBox_1: iBox_1,
                iBox_2: iBox_2,
                iBox_3: iBox_3,
                iBox_4: iBox_4,
                iBox_5: iBox_5,
                iBox_6: iBox_6,
                iBox_7: iBox_7,
                iBox_8: iBox_8,
                iBox_9: iBox_9,
                iBox_10: iBox_10,
                iBox_study_1: iBox_study_1,
                iBox_study_2: iBox_study_2,
                iBox_study_3: iBox_study_3,
                iBox_study_4: iBox_study_4,
                iBox_study_5: iBox_study_5,
                iBox_study_6: iBox_study_6,
                iBox_study_7: iBox_study_7,
                iBox_study_8: iBox_study_8,
                iBox_study_9: iBox_study_9,
                iBox_study_10: iBox_study_10,
                iBox_check_1: iBox_check_1,
                iBox_check_2: iBox_check_2,
                iBox_check_3: iBox_check_3,
                iBox_check_4: iBox_check_4,
                iBox_check_5: iBox_check_5,
                iBox_check_6: iBox_check_6,
                iBox_check_7: iBox_check_7,
                iBox_check_8: iBox_check_8,
                iBox_check_9: iBox_check_9,
                iBox_check_10: iBox_check_10,
                iBox_study_check_1: iBox_study_check_1,
                iBox_study_check_2: iBox_study_check_2,
                iBox_study_check_3: iBox_study_check_3,
                iBox_study_check_4: iBox_study_check_4,
                iBox_study_check_5: iBox_study_check_5,
                iBox_study_check_6: iBox_study_check_6,
                iBox_study_check_7: iBox_study_check_7,
                iBox_study_check_8: iBox_study_check_8,
                iBox_study_check_9: iBox_study_check_9,
                iBox_study_check_10: iBox_study_check_10,
                confirmName: confirmName,
            }
        });
    };

    const onDelete = (id) => {
        dispatch({
            type: "DELETE",
            id: id,
            confirmName: confirmName,
        });
    }


    return { onCreate, onUpdate, onDelete };
}

export default DiaryDispatchFunc;