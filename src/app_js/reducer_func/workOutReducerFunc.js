import { url } from './../urlConfig';
import { getTimeStampDate } from '../../util/get-timstamp-change';

export function wokOutReducer(state, action) {
    let returnState = '';
    switch (action.type) {
        case "INIT": {
            returnState = action.data;
            break;
        }
        case "UPDATE": {
            // 같은 날짜가 있으면 filteredItems.length 1이상
            const filteredItems = state.filter((item)=>item.insert_name == action.data.insert_name && 
            getTimeStampDate(item.insert_date) == getTimeStampDate(action.data.insert_date))
            
            if(filteredItems.length == 0){ // 같은 일자인 것이 없으면 삽입
                returnState = [...state, action.data]
            }else{ // 같은 일자인 것이 있으면 해당하는 것 업데이트
                returnState = state.map((item) => getTimeStampDate(item.insert_date) == getTimeStampDate(action.data.insert_date) && item.insert_name == action.data.insert_name ? action.data : item)
            }

            updateOutWorkData(action.data);
            break;
        }
    };
    return returnState;
}

async function updateOutWorkData(returnState) {
    // console.log("확인", returnState);
    const custom_url = url + "/update_out_work_data.do";
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