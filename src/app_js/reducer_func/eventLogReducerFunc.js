import { url } from './../urlConfig';

export function eventLogReducer(state, action) {
    let returnState = '';
    switch (action.type) {
        case "INIT": {
            returnState = action.data;
            break;
        }
        case "INSERT": {
            returnState = [...state, action.data]
            insertEventLogData(action.data);
            break;
        }
    };
    return returnState;
}

async function insertEventLogData(returnState) {
    // console.log("확인", returnState);
    const custom_url = url + "/insert_event_log_data.do";
    const response = await fetch(custom_url,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(returnState),
        });

    if (!response.ok) {
        throw new Error('Receive_road_route 결과 response 실패하였습니다.');
    }

    const data = await response.json();
    // console.log('response data', data);
}