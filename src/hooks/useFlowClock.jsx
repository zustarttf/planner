import React, { useEffect } from 'react';

const useFlowClock = () => {
    useEffect(() => {
        const clockElement = document.getElementById('clock');

        if (clockElement) {  // clockElement가 존재하는지 확인
            const updateClock = () => {
                const now = new Date();
                const formattedTime = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
                clockElement.innerText = formattedTime;
            };

            updateClock(); // 처음 한 번 실행
            const interval = setInterval(updateClock, 1000); // 1초마다 업데이트

            // Cleanup 함수: 컴포넌트가 unmount될 때 interval을 정리
            return () => clearInterval(interval);
        }
    }, []);

    return <div id="clock" style={{ fontSize: '20px', color:'#5F5F5F'}}></div>; // 글자 크기 36px, 두껍게 설정
};

export default useFlowClock;
