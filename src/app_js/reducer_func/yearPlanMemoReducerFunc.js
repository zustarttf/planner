import { url } from './../urlConfig';

export function yearPlanMemoReducer(state, action) {
    let returnState = '';
    switch (action.type) {
        case "INIT": {
            returnState = action.data;
            break;
        }
        case "UPDATE": {
            returnState = action.data;
            updateYearPlanMemo(action.data);
            // updateData(action.data);
            break;
        }
    };

    return returnState;
}

async function updateYearPlanMemo(returnState) {
    const memo_data = { data: returnState };
    // console.log("확인", returnState);
    const custom_url = url + "/update_year_plan_memo.do";
    const response = await fetch(custom_url,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(memo_data),
        });

    if (!response.ok) {
        throw new Error('Receive_road_route 결과 response 실패하였습니다.');
    }

    const data = await response.json();
    // console.log('response data', data);
}