import { url } from './../urlConfig';

export function longTermPlanReducer(state, action) {
    let returnState = '';
    switch (action.type) {
        case "INIT": {
            returnState = action.data;
            break;
        }
        case "INSERT": {
            returnState = [...state, ...action.data];
            fetchLongTermData([...action.data]);
            break;
        }
        case "UPDATE_CHECKED": {
            returnState = state.map((item) => {
                const matchingData = action.data.find((data) => data.id == item.id && data.insert_name == item.insert_name);
                if (matchingData) {
                    return { ...item, plan_checked: matchingData.plan_checked };
                }
                return item;
            })
            fetchUpdateLongTermCheckData([...action.data]);
            // console.log("returnState", returnState);
            break;
        }
        case "UPDATE": {
            // console.log("업데이트라구요", action.data);
            // returnState = state.map((item)=>{item.id == action.data.id && item.insert_name == action.data.loginName ? {...item, title: action.data.title} : item})
            // console.log("action.data ", action.data);
            // console.log("state ", state);

            returnState = state.map((item) => {
                const matchingData = action.data.find((data) => data.id == item.id && data.insert_name == item.insert_name);
                if (matchingData) {
                    return { ...item, title: matchingData.title };
                }
                return item;
            })
            fetchUpdateLongTermData([...action.data]);
            break;
        }
        case "DELETE": {
            returnState = state.filter((item) => !action.data.some((actionData) => item.id == actionData.id && item.insert_name == actionData.insert_name))
            fetchDeleteLongTermData([...action.data]);
            break;
        }
    };

    return returnState;
}

async function fetchLongTermData(returnState) {
    // console.log("확인", returnState);
    const returnStateObject = { data: returnState };
    const custom_url = url + "/fetch_long_term_data.do";
    const response = await fetch(custom_url,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(returnStateObject),
        });

    if (!response.ok) {
        throw new Error('Receive_road_route 결과 response 실패하였습니다.');
    }

    const data = await response.json();
    // console.log('response data', data);
}

//플래너 리스트 업데이트
async function fetchUpdateLongTermCheckData(returnState) {
    const actionObject = { data: returnState };
    const custom_url = url + "/update_long_term_check_data.do";
    const response = await fetch(custom_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(actionObject),
    })

    if (!response.ok) {
        throw new Error('update_planner_data 결과 response 실패하였습니다)');
    }
}

async function fetchUpdateLongTermData(returnState) {
    const actionObject = { data: returnState };
    // console.log("확인", returnState);
    const custom_url = url + "/update_long_term_data.do";
    const response = await fetch(custom_url,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(actionObject),
        });

    if (!response.ok) {
        throw new Error('Receive_road_route 결과 response 실패하였습니다.');
    }

    const data = await response.json();
    // console.log('response data', data);
}

async function fetchDeleteLongTermData(returnState) {
    const actionObject = { data: returnState };
    // console.log("확인", returnState);
    const custom_url = url + "/delete_long_term_data.do";
    const response = await fetch(custom_url,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(actionObject),
        });

    if (!response.ok) {
        throw new Error('Receive_road_route 결과 response 실패하였습니다.');
    }

    const data = await response.json();
    // console.log('response data', data);
}