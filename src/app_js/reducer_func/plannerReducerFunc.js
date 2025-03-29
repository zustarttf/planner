import { url } from './../urlConfig';

export function reducer(state, action) {
    let returnState = '';
    switch (action.type) {
        case "INIT": {
            returnState = action.data;
            break;
        }
        case "CREATE": {
            returnState = [action.data, ...state]
            insertData(action.data);
            break;
        }
        case "UPDATE": {
            returnState = state.map((item) => {
                return String(item.id) === String(action.data.id) ? action.data : item;
            })
            updateData(action.data);
            break;
        }
        case "DELETE": {
            returnState = state.filter((item) => String(item.id) !== String(action.id))
            deleteData(action.id, action.confirmName);
            break;
        }
    };

    return returnState;
}

async function insertData(returnState) {
    // console.log("확인", returnState);
    const custom_url = url + "/set_planner_data.do";
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

//플래너 리스트 업데이트
async function updateData(returnState) {
    const custom_url = url + "/update_planner_data.do";
    const response = await fetch(custom_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(returnState),
    })

    if (!response.ok) {
        throw new Error('update_planner_data 결과 response 실패하였습니다)');
    }
}

// 플래너 리스트 삭제
async function deleteData(id, confirmName) {
    const custom_url = url + `/delete_planner_data.do?id=${id}&confirmName=${confirmName}`;
    const response = await fetch(custom_url)

    if (!response.ok) {
        throw new Error('update_planner_data 결과 response 실패하였습니다)');
    }
}