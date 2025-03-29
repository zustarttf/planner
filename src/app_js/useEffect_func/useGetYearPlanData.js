import { useEffect } from "react"

// 연간 플랜 데이터 가져오기
async function getLongTermData(confirmName, url) {
    const custom_url = url + `/get_long_term_data.do`;
    const response = await fetch(custom_url);

    if (!response.ok) {
        throw new Error('Receive_road_route 결과 response 실패하였습니다.');
    }

    const data = await response.json();
    // console.log('response data', data);
    return data;
}

// 연간 플랜 데이터 가져오기
async function getYearPlanMemo(confirmName, url) {
    const custom_url = url + `/get_year_plan_memo.do`;
    const response = await fetch(custom_url);

    if (!response.ok) {
        throw new Error('Receive_road_route 결과 response 실패하였습니다.');
    }

    const data = await response.json();
    // console.log('response data', data);
    return data;
}


const useGetYearPlanData = ({setIsLoading, longTermPlanDispatch, yearPlanMemoDispatch, confirmName, url}) => {

    // 연간 플랜 데이터 가져오기기
    useEffect(() => {
        const fetchLongTermPlanData = async () => {
            try {
                const LongTermData = await getLongTermData(confirmName, url);

                longTermPlanDispatch({
                    type: "INIT",
                    data: LongTermData,
                });
                setIsLoading(false);
            } catch (error) {
                console.error("데이터 로딩 실패:", error);
            }
        };
        fetchLongTermPlanData();
    }, []);

    // 연간 플랜 임시 메모 가져오기
    useEffect(() => {
        const fetchYearPlanMemo = async () => {
            try {
                const yearPlanMemoData = await getYearPlanMemo(confirmName, url);

                yearPlanMemoDispatch({
                    type: "INIT",
                    data: yearPlanMemoData,
                });
                setIsLoading(false);
            } catch (error) {
                console.error("데이터 로딩 실패:", error);
            }
        };
        fetchYearPlanMemo();
    }, []);


}

export default useGetYearPlanData