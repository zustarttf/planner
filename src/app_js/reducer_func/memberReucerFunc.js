import { url } from './../urlConfig';

// 멤버 데이터 컨트롤 Reducer
export function memberReducer(state, action) {
    let returnState = '';
    switch (action.type) {
        case "INIT": {
            returnState = action.data;
            break;
        }
        case "MEMBER_INSERT": {
            // console.log("확인: ", Array.isArray(action.data));
            let tempState = state.map((item) => {
                return String(item.login_name) === String(action.data.login_name) ? { ...item, point: action.data.point } : item;
            });
            // console.log(tempState);
            returnState = [...tempState, action.data]
            insertMemberData(action.data);
            break;
        }
        case "ONLY_MEMBER_UPDATE": {
            returnState = state.map((item) => {
                return String(item.login_name) === String(action.data.login_name) ? { ...item, ...action.data } : item;
            })
            updateOnlyMemberData(action.data);
            break;
        }
    };
    return returnState;
}

async function insertMemberData(returnState) {
    // console.log("확인", returnState);
    const custom_url = url + "/insert_member_data.do";
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

async function updateOnlyMemberData(returnState) {
    // console.log("확인", returnState);
    const custom_url = url + "/update_only_member_data.do";
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