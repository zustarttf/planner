import {useEffect } from 'react';

async function getData(confirmName, url) {
    const custom_url = url + `/get_planner_data.do`;
    const response = await fetch(custom_url);

    if (!response.ok) {
        throw new Error('Receive_road_route 결과 response 실패하였습니다.');
    }

    const data = await response.json();
    // console.log('response data', data);
    return data;
}

const useGetPlannerData = ({dispatch, todayDateRef, confirmName, login_gubun, idRef, url, setIsLoading, setConfirmName}) => {

    // 플래너 데이터 초기 데이터 마운트
    useEffect(() => {
        const fetchData = async () => {
            try {
                //   //로그인
                if (login_gubun == 'dev') {

                    const name = prompt("코드를 입력하세요");
                    if (name === '5063' || name === '9334') {
                        setConfirmName(name);
                    } else {
                        while (true) {
                            const name = prompt("코드를 입력하세요");
                            if (name == '5063') {
                                setConfirmName(name);
                                break;
                            } else if (name == '9334') {
                                setConfirmName(name);
                                break;
                            } else {
                                alert('코드의 유효기간이 지났습니다')
                            }
                        }
                    }
                } else {
                    setConfirmName('9334');
                }


                // console.log("완료", confirmName);

                // 컴포넌트에서 재사용하기 위한 현재 날짜
                const todayDate = new Date();
                const year = todayDate.getFullYear();
                const month = (todayDate.getMonth() + 1).toString().padStart(2, '0');
                const day = todayDate.getDate().toString().padStart(2, '0');
                const collectDate = `${year}-${month}-${day}`;
                todayDateRef.current = collectDate;
                // console.log('현재날짜', todayDateRef.current);


                const dbData = await getData(confirmName, url);
                // console.log("dbData", dbData);
                let maxId = 0;

                dbData.forEach((item) => {
                    if (Number(item.id) > maxId) {
                        maxId = Number(item.id)
                    }
                });

                idRef.current = maxId + 1;

                dispatch({
                    type: "INIT",
                    data: dbData,
                });
                setIsLoading(false);
            } catch (error) {
                console.error("데이터 로딩 실패:", error);
            }
        };
        // console.log("몇번 실행");
        fetchData();

    }, []);
};

export default useGetPlannerData;