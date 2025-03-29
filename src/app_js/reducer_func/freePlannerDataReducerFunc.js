import { url } from '../urlConfig';

export function freePlannerDataReducer(state, action) {
    let returnState = '';
    switch (action.type) {
        case "INIT": {
            returnState = action.data;
            break;
        }
        case "INSERT": {
            returnState = action.data;
            insertFreePlanData(returnState, action.loginName);
            break;
        }
    };
    return returnState;
}

async function insertFreePlanData(returnState, loginName) {
    // console.log("확인", returnState);
    const temp_data = { data: returnState, login_name: loginName};
    const custom_url = url + "/insert_free_plan_data.do";
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