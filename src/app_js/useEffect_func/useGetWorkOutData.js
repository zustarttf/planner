import { useEffect } from "react";

async function getWorkOut(confirmName, url) {
    const custom_url = url + `/get_work_out.do`;
    const response = await fetch(custom_url);

    if (!response.ok) {
        throw new Error('Receive_road_route 결과 response 실패하였습니다.');
    }

    const data = await response.json();
    // console.log('response data', data);
    return data;
}

const useGetWorkOutData = ({setIsLoading, workOutDispatch, confirmName, url}) => {
    // 운동 대결 데이터 가져오기
    useEffect(() => {
        const fetchWorkOut = async () => {
            try {
                const responseData = await getWorkOut(confirmName, url);

                workOutDispatch({
                    type: "INIT",
                    data: responseData,
                });
                setIsLoading(false);
            } catch (error) {
                console.error("데이터 로딩 실패:", error);
            }
        };
        fetchWorkOut();
    }, []);

}

export default useGetWorkOutData;