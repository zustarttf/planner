import { url } from './../urlConfig';

export function lankPlanReducer(state, action) {
    let returnState = '';
    switch (action.type) {
        case "INIT": {
            returnState = action.data;
            break;
        }
        case "INSERT": {
            returnState = action.data;
            insertLankData(returnState);
            break;
        }
    };
    return returnState;
}

async function insertLankData(returnState) {
    // console.log("확인", returnState);
    const temp_data = { data: returnState };
    const custom_url = url + "/insert_lank_plan_data.do";
    const response = await fetch(custom_url,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(temp_data),
        });

    if (!response.ok) {
        throw new Error('Receive_road_route 결과 response 실패하였습니다.');
    }

    const data = await response.json();
    // console.log('response data', data);
}