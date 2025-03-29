import { useEffect } from "react";

// 멤버 정보 가져오기
async function getMemberData(confirmName, url) {
    const custom_url = url + `/get_member_data.do`;
    const response = await fetch(custom_url);

    if (!response.ok) {
        throw new Error('Receive_road_route 결과 response 실패하였습니다.');
    }

    const data = await response.json();
    // console.log('response data', data);
    return data;
}

const useGetMemberData = ({ setIsLoading, memberDispatch, confirmName, url}) => {

    // 멤버 데이터 초기 데이터 마운트
    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const memberData = await getMemberData(confirmName, url);

                memberDispatch({
                    type: "INIT",
                    data: memberData.mission_list,
                });
                setIsLoading(false);
            } catch (error) {
                console.error("데이터 로딩 실패:", error);
            }
        };
        fetchMemberData();
    }, []);

}

export default useGetMemberData;