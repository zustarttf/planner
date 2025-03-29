import "./MedalModal.css";
import { newStringedDate } from '../util/new-stringed-date.js'
import { getTimeStampDate } from '../util/get-timstamp-change.js'
import { useState } from 'react';
import { UseModal } from "../hooks/UseAlertModal.jsx"; //포인트
import { getWeekOfToday } from "../util/get-week-of-today.js";
import { getBeforeWeekOfToday } from "../util/get-before-week-of-today.js";
const MedalModal = ({onlyMemberUpdate, data, loginName, memberData, onInsertEventLogData, onMemberInsert, closeModal, 
    getGradeObject, getGradeImage, eventLogData, memberDataOther, workOutData}) => {
    const [otherMemberState, setOtherMemberState] = useState('close');
    const [percentButtonState, setPercentButtonState] = useState('close');
    const [medalRuleState, setMedalRuleState] = useState('close');
    const [eventLogState, setEventLogState] = useState('close');
    const { openAlertModal = false } = UseModal() || {}; //포인트
    
    const gradTest = (point, rank) => {
        if (point <= 0) {
            openAlertModal('토큰이 부족합니다'); //포인트

            return;
        }
        if (rank == 53) {
            openAlertModal('축하합니다. 마스터에 도달하셨습니다.');
            return;
        }
        let upGradePercent;
        let downGradePercent;
        if (rank <= 8) {
            upGradePercent = Math.random() < 0.35;
        } else if (rank <= 17) {
            upGradePercent = Math.random() < 0.30;
        } else if (rank <= 26) {
            upGradePercent = Math.random() < 0.25;
        } else if (rank <= 35) {
            upGradePercent = Math.random() < 0.15;
        } else if (rank <= 44) {
            upGradePercent = Math.random() < 0.1;
        } else if (rank <= 47) {
            upGradePercent = Math.random() < 0.05;
        } else if (rank <= 53) {
            upGradePercent = Math.random() < 0.05;
        }

        if (rank <= 17) {
            downGradePercent = Math.random() < 0.01;
        } else if (rank <= 60) {
            downGradePercent = Math.random() < 0.01;
        }
        point = (point - 2);
        if (upGradePercent) { // 성공 시
            if (Math.random() < 0.01) {
                openAlertModal('특별 진급에 성공하셨습니다. 2 랭크 진급합니다.');
                rank = (rank + 1)
            } else {
                openAlertModal('진급에 성공하셨습니다.');
                rank = (rank + 1)
            }
        } else {
            openAlertModal('진급에 실패하셨습니다.');
            if (Math.random() < 0.0001) { //true 일시 강등
                openAlertModal('10 랭크 강등되었습니다.');
                rank = (rank - 10)
            } else {
                if (downGradePercent) { //true 일시 강등
                    openAlertModal('강등되었습니다.');
                    rank = (rank - 1)
                }
            }
        }

        if (rank <= 0) { rank = 1; openAlertModal('진급에 실패하셨습니다. 더 이상 강등 불가합니다.') }
        onlyMemberUpdate(point, rank);
    }
    // 출석하기
    const newContentFunc = () => {
        const todayDate = newStringedDate();
        const yesterDayDate = newStringedDate(1);

        let point = '';
        const mission = 'newContent';
        let rank;

        //어제 자 글
        const filterDataTest = data.filter((item) => {
            const changeDate = getTimeStampDate(item.createDate);
            return item.confirmName != loginName && changeDate == yesterDayDate;
        });

        //만약 어제 자 글이 있다면
        if (filterDataTest.length >= 1) {
            let temp = memberData.filter((item) => loginName == item.mission_name && item.insert_date == yesterDayDate && item.mission == 'thisBoardCheck')
            if (temp.length == 0) {
                openAlertModal('어제 자 친구의 글을 확인하세요.\n (친구의 어제 게시글 우측 하단에 확인하기 버튼)');
                return;
            }
        }

        //오늘 자 글이 있는지 필터
        const filterData = data.filter((item) => {
            const changeDate = getTimeStampDate(item.createDate);
            return item.confirmName == loginName && changeDate == todayDate;
        });
        // console.log(filterData);

        if (filterData.length == 0) {
            openAlertModal('오늘 자 새 플래너를 작성해주세요');
            return;
        }

        for (let i = 0; i < memberData.length; i++) {
            let item = memberData[i];
            if (loginName == item.mission_name) {
                rank = item.rank;
                point = item.point;
            }
            // 같은게 있으면
            if (loginName == item.mission_name && item.insert_date == todayDate && item.mission == 'newContent') {
                openAlertModal('이미 출석되었습니다.');
                // nav("/", { replace: true })
                return;
            }
        }

        // 같은 게 없다면
        let plusPoint = point + 10;
        openAlertModal('출석체크가 완료되었습니다.\n +10 토큰 적립되었습니다.');
        onInsertEventLogData(loginName, '적립', '+10', '출석');
        onMemberInsert(plusPoint, mission, rank, todayDate);
    }

    // 정산하기
    const adjustment = () => {
        const now = new Date();
        const day = now.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
        const hour = now.getHours(); // 0 ~ 23
        const minute = now.getMinutes(); // 0 ~ 59
        // 이번 주 시작과 끝
        const {startBeforeWeekTime, endBeforeWeekTime} = getBeforeWeekOfToday()
        // const {startWeekTime, endWeekTime} = getWeekOfToday()
    
        // 월요일 (1), 0시 1분부터 23시 59분까지
        if (day === 1 && (hour > 0 || (hour === 0 && minute >= 1)) && hour < 24) {
            /***** 멤버 정보 세팅 *****/
            const already_complete = eventLogData.filter((item)=> item.subject == loginName && getTimeStampDate(item.insert_date) == getTimeStampDate(new Date().getTime()))
            if(already_complete.length > 0){
                openAlertModal('이미 정산을 하셨습니다.');
                return;
            }

            let myCurrentPoint = memberData[0].point; // 현재 내 포인트
            let myCurrentRank = memberData[0].rank; // 현재 내 단계
            
            // let otherCurrentPoint = memberData[0].point; // 아더 아님
            // let otherCurrentRank = memberData[0].rank; // 아더 아님
            const otherLoginName = loginName == '9334' ? "5063" : "9334";
            
            /***** 플랜 데이터 세팅 *****/
            const filterBeforeWeekData = data.filter((item)=>item.createDate >= startBeforeWeekTime && item.createDate <= endBeforeWeekTime)// 주 플랜 데이터
            const filterMyData = filterBeforeWeekData.filter((item)=>item.confirmName == loginName) // 내 것
            const filterOtherData = filterBeforeWeekData.filter((item)=>item.confirmName != loginName) // 너의 것
            console.log(filterMyData);
            console.log(filterOtherData);
            /***** 주 평균 퍼센트 이벤트 정산 *****/
            const mySumPercent = filterMyData.reduce((total, item) => total + item.emotionId, 0); // 내 퍼센트 합계
            const otherSumPercent = filterOtherData.reduce((total, item) => total + item.emotionId, 0); // 너의 퍼센트 합계
            const winName = (mySumPercent - otherSumPercent) > 0 ? loginName : otherLoginName;
            if(mySumPercent - otherSumPercent != 0){ // 무승부 시 정산 안함
                if(winName == loginName){
                    myCurrentPoint += 10
                    // onlyMemberUpdate(myCurrentPoint, myCurrentRank);
                    onInsertEventLogData(winName, '적립', '+10', '주 평균 퍼센트 대결'); //이벤트 로그 등록
                }else{
                    // otherCurrentPoint += 10
                    // onlyMemberUpdate(myCurrentPoint, otherCurrentRank);
                }
            }
            /***** 주 평균 퍼센트 이벤트 정산 끝 *****/
            
            /***** 운동 데이터 세팅 *****/
            const filterBeforeWeekWorkData = workOutData.filter((item)=>item.insert_date >= startBeforeWeekTime && item.insert_date <= endBeforeWeekTime)
            console.log("전체 운동 데이터 ", workOutData)
            console.log("필터 운동 데이터 ", filterBeforeWeekWorkData)
            const filterMyWorkData = filterBeforeWeekWorkData.filter((item)=>item.insert_name == loginName) //나의 것
            const filterOtherWorkData = filterBeforeWeekWorkData.filter((item)=>item.insert_name != loginName) // 너의 것
            // console.log("나의 운동데이터 ", filterMyWorkData);
            const total_yes_hour = filterMyWorkData.reduce((total, item) => total + item.yes_oxygen_hour, 0); // 시간 합계
            const total_yes_min = filterMyWorkData.reduce((total, item) => total + item.yes_oxygen_minute, 0); // 분 합계
            const my_total_yes_work = (total_yes_hour * 60) + total_yes_min // 나의 "유산소" 운동 총 시간(분)
            console.log("나의 유산소 운동 총 시간 :", my_total_yes_work);
            const total_no_hour = filterMyWorkData.reduce((total, item) => total + item.no_oxygen_hour, 0); // 시간 합계
            const total_no_min = filterMyWorkData.reduce((total, item) => total + item.no_oxygen_minute, 0); // 분 합계
            const my_total_no_work = (total_no_hour * 60) + total_no_min // "나의 무산소" 운동 총 시간(분)
            console.log("나의 무산소 운동 총 시간 :", my_total_no_work);
            // console.log("너의 운동데이터 ", filterOtherWorkData);
            const other_total_yes_hour = filterOtherWorkData.reduce((total, item) => total + item.yes_oxygen_hour, 0); // 시간 합계
            const other_total_yes_min = filterOtherWorkData.reduce((total, item) => total + item.yes_oxygen_minute, 0); // 분 합계
            const other_total_yes_work = (other_total_yes_hour * 60) + other_total_yes_min // 너의 "유산소" 운동 총 시간(분)
            console.log("너의 유산소 운동 총 시간 :", other_total_yes_work);
            const other_total_no_hour = filterOtherWorkData.reduce((total, item) => total + item.no_oxygen_hour, 0); // 시간 합계
            const other_total_no_min = filterOtherWorkData.reduce((total, item) => total + item.no_oxygen_minute, 0); // 분 합계
            const other_total_no_work = (other_total_no_hour * 60) + other_total_no_min // 너의 "무산소" 운동 총 시간(분)
            console.log("너의 무산소 운동 총 시간 :", other_total_no_work);
            
            const yesWorkWinName = my_total_yes_work - other_total_yes_work > 0 ? loginName : otherLoginName
            if(my_total_yes_work - other_total_yes_work != 0){
                if(yesWorkWinName == loginName){
                    myCurrentPoint += 15
                    onInsertEventLogData(yesWorkWinName, '적립', '+15', '운동 대결(유산소)'); //이벤트 로그 등록
                }else{
                    // otherCurrentPoint += 15
                }
            }
            
            const noWorkWinName = my_total_no_work - other_total_no_work > 0 ? loginName : otherLoginName
            if(my_total_no_work - other_total_no_work != 0){
                if(noWorkWinName == loginName){
                    myCurrentPoint += 15
                    onInsertEventLogData(noWorkWinName, '적립', '+15', '운동 대결(무산소)'); //이벤트 로그 등록
                }else{
                    // otherCurrentPoint += 15
                }
            }
            console.log("이벤트로그데이터", eventLogData)
            onlyMemberUpdate(myCurrentPoint, myCurrentRank); // 서버에 정산 저장
            onInsertEventLogData(loginName, '완료하였습니다', '0', '정산'); //이벤트 로그 등록
            openAlertModal('정산을 완료하였습니다.!');
        } else {
            openAlertModal('정산은 매주 월요일(00:01 ~ 23:59)에 가능합니다!');
        }
    }

    return (
        <div className="modal">
            <div className="modal-content modal-enter">
                <span className="close" onClick={closeModal}>&times;</span>
                <p>유저 : {memberData[0].login_name == '5063' ? '「장선생」' : '「팅선생」'}</p>
                {/* {memberDataOther[0].login_name == '5063' ?
                    <p>「Owl(부엉이)와 Astro(우주)에서 유래된 별호 <br></br> 부엉이의 통찰력을 바탕으로 계획을 예측하는 존재」</p>
                    :
                    <p>「Diligence(근면)과 Estimate(추정)에서 유래된 별호<br></br>목표를 향한 끈기와 정확한 계획과 예측을 추구하는 존재」</p>} */}
                <p>토큰 : {memberData[0].point}</p>
                <p>진급 단계 : {memberData[0].rank} / 53</p>
                <p>계급 : {getGradeObject(memberData[0].rank)}</p>

                <div className="medal-promotion-div">
                    <img className="medal-promotion-image" src={getGradeImage(memberData[0].rank)} alt="" />
                    <button className="medal-promotion-button" onClick={() => gradTest(memberData[0].point, memberData[0].rank)}>진급하기</button>
                </div>
                <div className="medal-line"></div>
                <div className="medal-menu-middle-line">
                    <button className="medal-attendance-button1" onClick={() => newContentFunc()}>출석하기</button>
                    <button className="medal-attendance-button2" onClick={() => adjustment() }>정산하기</button>
                </div>
                <br />
                <div className="medal-line"></div>
                <br />
                <div className="medal-menu-first-line">
                    <button className="medal-menu-first-line-button" onClick={() => { setPercentButtonState(percentButtonState === 'close' ? 'open' : 'close');
                    setOtherMemberState('close'); setMedalRuleState('close'); setEventLogState('close'); }}>확률 정보 ▼</button>
                    <button className="medal-menu-first-line-friend-info-button" onClick={() => { setOtherMemberState(otherMemberState === 'close' ? 'open' : 'close'); 
                    setPercentButtonState('close'); setMedalRuleState('close'); setEventLogState('close'); }}>친구 정보 ▼</button>
                </div>
                <div className="medal-menu-second-line">
                    <button className="medal-menu-second-line-event-list-button" onClick={() => { setMedalRuleState(medalRuleState === 'close' ? 'open' : 'close'); 
                    setEventLogState('close'); setOtherMemberState('close'); setPercentButtonState('close'); }}>이벤트 목록 ▼</button>
                    <button className="medal-menu-second-line-event-log-button" onClick={() => { setEventLogState(eventLogState === 'close' ? 'open' : 'close'); 
                    setOtherMemberState('close'); setMedalRuleState('close'); setPercentButtonState('close'); }}>이벤트 일지 ▼</button>
                </div>

                <div style={{ display: eventLogState == 'close' ? 'none' : 'block', maxHeight: '200px', overflow: 'auto', padding: '10px 10px' }} >
                    <div>
                        {eventLogData.map((item, index) => {
                            if (item.about == '정산') {
                                {
                                    return item.subject == '9334' ?
                                        <div key={index} style={{ marginBottom: '7px' }}>[{getTimeStampDate(item.insert_date)}] <br /><span style={{ color: '#00008B' }}>「팅선생」</span> 님이 {item.about}을 {item.verb}</div>
                                        :
                                        <div key={index} style={{ marginBottom: '7px' }}>[{getTimeStampDate(item.insert_date)}] <br /><span style={{ color: '#006400' }}>「장선생」</span> 님이 {item.about}을 {item.verb}</div>
                                }
                            }

                            if (item.about == '출석') {
                                {
                                    return item.subject == '9334' ?
                                        <div key={index} style={{ marginBottom: '7px' }}>[{getTimeStampDate(item.insert_date)}] <br /><span style={{ color: '#00008B' }}>「팅선생」</span> 님이 {item.about}으로 {item.object} 토큰 {item.verb}</div>
                                        :
                                        <div key={index} style={{ marginBottom: '7px' }}>[{getTimeStampDate(item.insert_date)}] <br /><span style={{ color: '#006400' }}>「장선생」</span> 님이 {item.about}으로 {item.object} 토큰 {item.verb}</div>
                                }
                            }
                            if (item.about == '주 평균 퍼센트 대결') {
                                {
                                    return item.subject == '9334' ?
                                        <div key={index} style={{ marginBottom: '7px' }}>[{getTimeStampDate(item.insert_date)}] <br /><span style={{ color: '#00008B' }}>「팅선생」</span> 님이 {item.about}으로 {item.object} 토큰 {item.verb}</div>
                                        :
                                        <div key={index} style={{ marginBottom: '7px' }}>[{getTimeStampDate(item.insert_date)}] <br /><span style={{ color: '#006400' }}>「장선생」</span> 님이 {item.about}으로 {item.object} 토큰 {item.verb}</div>
                                }
                            }
                            if (item.about == '운동 대결(유산소)') {
                                {
                                    return item.subject == '9334' ?
                                        <div key={index} style={{ marginBottom: '7px' }}>[{getTimeStampDate(item.insert_date)}] <br /><span style={{ color: '#00008B' }}>「팅선생」</span> 님이 {item.about}으로 {item.object} 토큰 {item.verb}</div>
                                        :
                                        <div key={index} style={{ marginBottom: '7px' }}>[{getTimeStampDate(item.insert_date)}] <br /><span style={{ color: '#006400' }}>「장선생」</span> 님이 {item.about}으로 {item.object} 토큰 {item.verb}</div>
                                }
                            }
                            if (item.about == '운동 대결(무산소)') {
                                {
                                    return item.subject == '9334' ?
                                        <div key={index} style={{ marginBottom: '7px' }}>[{getTimeStampDate(item.insert_date)}] <br /><span style={{ color: '#00008B' }}>「팅선생」</span> 님이 {item.about}으로 {item.object} 토큰 {item.verb}</div>
                                        :
                                        <div key={index} style={{ marginBottom: '7px' }}>[{getTimeStampDate(item.insert_date)}] <br /><span style={{ color: '#006400' }}>「장선생」</span> 님이 {item.about}으로 {item.object} 토큰 {item.verb}</div>
                                }
                            }
                            if (item.about == '강등 조건') {
                                {
                                    return item.subject == '9334' ?
                                        <div key={index} style={{ marginBottom: '7px' }}>[{getTimeStampDate(item.insert_date)}] <br /><span style={{ color: '#00008B' }}>「팅선생」</span> 님이 {item.about}으로 {item.object} 단계 {item.verb}</div>
                                        :
                                        <div key={index} style={{ marginBottom: '7px' }}>[{getTimeStampDate(item.insert_date)}] <br /><span style={{ color: '#006400' }}>「장선생」</span> 님이 {item.about}으로 {item.object} 단계 {item.verb}</div>
                                }
                            }
                        })}
                    </div>
                </div>

                <div style={{ display: otherMemberState == 'close' ? 'none' : 'block', padding: '5px 10px' }}>
                    <p>유저 : {memberDataOther[0].login_name == '5063' ? '「장선생」' : '「팅선생'}</p>
                    {/* {memberDataOther[0].login_name != '5063' ?
                        <p>「Owl(부엉이)와 Astro(우주)에서 유래된 별호 <br></br> 부엉이의 통찰력을 바탕으로 계획을 예측하는 존재」</p>
                        :
                        <p>「Diligence(근면)과 Estimate(추정)에서 유래된 별호<br></br>목표를 향한 끈기와 정확한 계획과 예측을 추구하는 존재」</p>} */}
                    <p>토큰 : {memberDataOther[0].point}</p>
                    <p>진급 단계 : {memberDataOther[0].rank} / 53</p>
                    <p>계급 : {getGradeObject(memberDataOther[0].rank)}</p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                        <img className="medal-promotion-image" src={getGradeImage(memberDataOther[0].rank)} alt="" />
                    </div>
                </div>

                <div className="medal-grade-info-content"style={{ display: percentButtonState == 'close' ? 'none' : 'block', padding: '5px 10px' }}>
                    <p style={{ marginBottom: '0px' }}> 이등병(동) ~ 상병(금) : 35% </p>
                    <p style={{ margin: '3px' }}> 상병(금) ~ 상사(금)   : 30% </p>
                    <p style={{ margin: '3px' }}> 상사(금) ~ 대위(금)   : 25% </p>
                    <p style={{ margin: '3px' }}> 대위(금) ~ 대령(금)   : 15% </p>
                    <p style={{ margin: '3px' }}> 대령(금) ~ 중장(금)   : 10% </p>
                    <p style={{ margin: '3px' }}> 중장(금) ~ 제1대 플래니아 대통령  : 5%</p>
                    <p style={{ marginBottom: '0px' }}> 실패 시 0.1% 강등</p>
                    <p style={{ margin: '3px' }}> 실패 시 0.01% 10 단계 강등</p>
                </div>

                <div style={{ display: medalRuleState == 'close' ? 'none' : 'block', padding: '5px 10px' }}>
                    <p style={{ marginBottom: '0px', fontWeight: 'bold' }}> 출석 체크 : </p>
                    <p style={{ margin: '3px' }}> 1. 친구의 어제 자 플랜 확인한다</p>
                    <p style={{ margin: '3px' }}> 2. 나의 오늘 자 플랜이 존재한다</p>
                    <p style={{ margin: '3px' }}> 3. 출석 체크 시 10 토큰이 적립된다</p>
                    <p style={{ marginBottom: '10px', fontWeight: 'bold' }}> 운동 대결 :  </p>
                    <p style={{ margin: '3px' }}> 1. 무산소, 유산소 각 15 토큰씩 적립된다</p>
                    <p style={{ margin: '3px' }}> 2. 일요일 24시에 정산된다</p>
                    <p style={{ marginBottom: '10px', fontWeight: 'bold' }}> 플랜 평균 퍼센트 대결 :  </p>
                    <p style={{ margin: '3px' }}> 1. 일주일 평균 플랜 퍼센트가 더 높으면 10 토큰 적립된다</p>
                    <p style={{ margin: '3px' }}> 2. 일요일 24시에 정산된다</p>
                    <p style={{ marginBottom: '10px', fontWeight: 'bold' }}> 운동 대결 등록 :  </p>
                    <p style={{ margin: '3px' }}> 1. 등록 시 5 토큰 적립된다</p>
                    {/* <p style={{ marginBottom: '10px', fontWeight: 'bold' }}> 강등 조건 :  </p>
                    <p style={{ margin: '3px' }}> 1. 출석 체크를 하지 않으면 3단계 강등된다</p>
                    <p style={{ margin: '3px' }}> 2. (준장 미만)플랜 50% 미만 시 3단계 강등된다</p>
                    <p style={{ margin: '3px' }}> 3. (준장 이상)플랜 70% 미만 시 3단계 강등된다</p>
                    <p style={{ margin: '3px' }}> 4. 일요일 24시에 정산된다a</p> */}
                </div>
            </div>
        </div>
    )
}

export default MedalModal;