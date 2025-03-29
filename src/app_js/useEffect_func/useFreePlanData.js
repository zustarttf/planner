import { useEffect } from "react";

async function getFreePlanData(url) {
    const custom_url = url + `/get_free_plan_data.do`;
    const response = await fetch(custom_url);

    if (!response.ok) {
        throw new Error('Receive_road_route 결과 response 실패하였습니다.');
    }

    const data = await response.json();
    // console.log('response data', data);
    return data;
}

const useFreePlanData = ({setIsLoading, freePlannerDataDispatch, confirmName, url}) => {
    // 이벤트 로그 데이터 가져오기
    useEffect(() => {
        const fetchFreePlan = async () => {
            try {
                const responseData = await getFreePlanData(url);

                freePlannerDataDispatch({
                    type: "INIT",
                    data: responseData,
                });
                setIsLoading(false);
            } catch (error) {
                console.error("데이터 로딩 실패:", error);
            }
        };
        fetchFreePlan();
    }, []);
}

export default useFreePlanData;