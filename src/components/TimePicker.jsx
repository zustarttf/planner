import React, { forwardRef, useImperativeHandle, useEffect, useState } from 'react';
import './TimePicker.css';
import { UseModal } from "../hooks/UseAlertModal.jsx";
import { getWeekOfToday } from '../util/get-week-of-today.js';
import { getMonthOfToday } from '../util/get-month-of-today.js';
const TimePicker = forwardRef((props, ref) => {
    const {todayFilterWorkOutData, todayOtherFilterWorkOutData, onUpdateWorkOut, loginName, filterWorkOutData} = props;
    const [yesHours, setYesHours] = useState(0);
    const [yesMinutes, setYesMinutes] = useState(0);
    const [noHours, setNoHours] = useState(0);
    const [noMinutes, setNoMinutes] = useState(0);
    const [weight, setWeight] = useState(0);
    const [rice, setRice] = useState(0);

    const [text, setText] = useState('');

    const { openAlertModal = false } = UseModal() || {};

    TimePicker.displayName ='TimePicker';

      // 부모가 호출할 수 있도록 onSubmit 함수 노출
    useImperativeHandle(ref, () => ({
        onSubmit: () => {
            onSubmit(); // 자식 컴포넌트의 onSubmit 호출
        },
    }));

    const yesIncreaseHour = () => setYesHours((prev) => (prev + 1) % 24);
    const yesDecreaseHour = () => setYesHours((prev) => (prev - 1 + 24) % 24);

    const yesIncreaseMinute = () => setYesMinutes((prev) => (prev + 5) % 60);
    const yesDecreaseMinute = () => setYesMinutes((prev) => (prev - 5 + 60) % 60);

    const noIncreaseHour = () => setNoHours((prev) => (prev + 1) % 24);
    const noDecreaseHour = () => setNoHours((prev) => (prev - 1 + 24) % 24);

    const noIncreaseMinute = () => setNoMinutes((prev) => (prev + 5) % 60);
    const noDecreaseMinute = () => setNoMinutes((prev) => (prev - 5 + 60) % 60);
    
    const IncreaseWeight_x1 = () => setWeight((prev) => (Math.round((prev + 0.1) * 10) / 10));
    const DecreaseWeight_x1 = () => setWeight((prev) => (Math.round((prev - 0.1) * 10) / 10));
    const IncreaseWeight_x2 = () => setWeight((prev) => (Math.round((prev + 1) * 10) / 10));
    const DecreaseWeight_x2 = () => setWeight((prev) => (Math.round((prev - 1) * 10) / 10));
    const IncreaseWeight_x3 = () => setWeight((prev) => (Math.round((prev + 10) * 10) / 10));
    const DecreaseWeight_x3 = () => setWeight((prev) => (Math.round((prev - 10) * 10) / 10));
    
    const IncreaseRice = () => setRice((prev) => (Math.round((prev + 0.5) * 10) / 10));
    const DecreaseRice = () => setRice((prev) => (Math.round((prev - 0.5) * 10) / 10));

    // const IncreaseRice = () => setRice((prev) => (prev + 1));
    // const DecreaseRice = () => setRice((prev) => (prev - 1));

    useEffect(() => {
        setYesHours(todayFilterWorkOutData?.yes_oxygen_hour || 0)
        setYesMinutes(todayFilterWorkOutData?.yes_oxygen_minute || 0)
        setNoHours(todayFilterWorkOutData?.no_oxygen_hour|| 0)
        setNoMinutes(todayFilterWorkOutData?.no_oxygen_minute|| 0)
        setWeight(todayFilterWorkOutData?.weight || 0)
        setRice(todayFilterWorkOutData?.rice || 0)
    }, [todayFilterWorkOutData]);

    const onSubmit = () => {
        onUpdateWorkOut(yesHours, yesMinutes, noHours, noMinutes, weight, rice)
        openAlertModal('적용되었습니다.');
    }

    const curcWorkOut = () => {
        if (!todayFilterWorkOutData || !todayFilterWorkOutData) {
            return {
                differenceYesHour: 0,
                differenceYesMinute: 0,
                differenceNoHour: 0,
                differenceNoMinute: 0
            };
        }

        const differenceYesHour = ((todayFilterWorkOutData?.yes_oxygen_hour || 0) - (todayOtherFilterWorkOutData?.yes_oxygen_hour || 0));
        const differenceYesMinute = ((todayFilterWorkOutData?.yes_oxygen_minute || 0) - (todayOtherFilterWorkOutData?.yes_oxygen_minute || 0));
        const differenceNoHour = ((todayFilterWorkOutData?.no_oxygen_hour || 0) - (todayOtherFilterWorkOutData?.no_oxygen_hour || 0));
        const differenceNoMinute = ((todayFilterWorkOutData?.no_oxygen_minute || 0) - (todayOtherFilterWorkOutData?.no_oxygen_minute || 0));
        

        return {
            differenceYesHour,
            differenceYesMinute,
            differenceNoHour,
            differenceNoMinute
        };
    }

    const curcWorkOut2 =() => {

        const {startWeekTime, endWeekTime} = getWeekOfToday();
        const {startMonthTime, endMonthTime} = getMonthOfToday();
        // console.log(startTime, ' ', endTime)

        // console.log('이번 주 시작:', new Date(startTime));
        // console.log('이번 주 끝:', new Date(endTime));
        // console.log('이번 달 시작:', new Date(startMonthTime));
        // console.log('이번 달 끝:', new Date(endMonthTime));

        // 데이터 필터링 (주간 데이터)
        const thisWeekData = filterWorkOutData.filter(item => {
            const insertDate = item.insert_date; // 이미 timestamp라서 바로 비교 가능
            return insertDate >= startWeekTime && insertDate <= endWeekTime;
        });
        // 데이터 필터링 (월간 데이터)
        const thisMonthData = filterWorkOutData.filter(item => {
            const insertDate = item.insert_date; // 이미 timestamp라서 바로 비교 가능
            return insertDate >= startMonthTime && insertDate <= endMonthTime;
        });

        // 데이터 필터링 (주 몸무게 "평균용")
        // const thisWeekDataAvg = filterWorkOutData.filter(item => {
        //     const insertDate = item.insert_date;
        //     return insertDate >= startWeekTime && insertDate <= endWeekTime;
        // });

        const thisWeekDataAvg = thisWeekData.filter((item)=>item.weight != 0);
        // 이번주 몸무게 합계
        const weekTotalWeight = thisWeekDataAvg.reduce((sum, data) => sum + data.weight, 0);
        // 이번주 몸무게 평균 (사용)
        const weekAverageWeight = Math.trunc((weekTotalWeight / thisWeekDataAvg.length) * 10) / 10;
        
        const thisMonthDataAvg = thisMonthData.filter((item)=>item.weight != 0);
        // 이번달 몸무게 합계
        const monthTotalWeight = thisMonthDataAvg.reduce((sum, data) => sum + data.weight, 0);
        // 이번달 몸무게 평균 (사용)
        const monthAverageWeight = Math.trunc((monthTotalWeight / thisMonthDataAvg.length) * 10) / 10;

        // 이번주 식사량 합계
        const weekTotalRice = thisWeekData.reduce((sum, data) => sum + data.rice, 0);
        // 이번주 식사량 평균 (사용)
        const weekAverageRice = Math.trunc((weekTotalRice / thisWeekData.length) * 10) / 10;
        // 이번달 식사량 합계
        const monthTotalRice = thisMonthData.reduce((sum, data) => sum + data.rice, 0);
        // 이번달 식사량 평균 (사용)
        const monthAverageRice = Math.trunc((monthTotalRice / thisMonthData.length) * 10) / 10;
        // 이번주 유산소 운동량 합계 (사용)
        let weekTotalYesOxygenHour = thisWeekData.reduce((sum, data) => sum + data.yes_oxygen_hour, 0); // 시간
        let weekTotalYesOxygenMinute = thisWeekData.reduce((sum, data) => sum + data.yes_oxygen_minute, 0); // 분
        if(weekTotalYesOxygenMinute >= 60){
            const hour = Math.floor(weekTotalYesOxygenMinute / 60);
            weekTotalYesOxygenHour += hour;
            weekTotalYesOxygenMinute = weekTotalYesOxygenMinute % 60;
        }
        // 이번주 무산소 운동량 합계(사용)
        let weekTotalNoOxygenHour = thisWeekData.reduce((sum, data) => sum + data.no_oxygen_hour, 0); // 시간
        let weekTotalNoOxygenMinute = thisWeekData.reduce((sum, data) => sum + data.no_oxygen_minute, 0); // 분
        if(weekTotalNoOxygenMinute >= 60){
            const hour = Math.floor(weekTotalNoOxygenMinute / 60);
            weekTotalNoOxygenHour += hour;
            weekTotalNoOxygenMinute = weekTotalNoOxygenMinute % 60;
        }
        
        // 총 유산소 운동량 합계 (사용)
        let sumTotalYesOxygenHour = filterWorkOutData.reduce((sum, data) => sum + data.yes_oxygen_hour, 0); // 시간
        let sumTotalYesOxygenMinute = filterWorkOutData.reduce((sum, data) => sum + data.yes_oxygen_minute, 0); // 분
        if(sumTotalYesOxygenMinute >= 60){
            const hour = Math.floor(sumTotalYesOxygenMinute / 60);
            sumTotalYesOxygenHour += hour;
            sumTotalYesOxygenMinute = sumTotalYesOxygenMinute % 60;
        }

        // 총 무산소 운동량 합계 (사용)
        let sumTotalNoOxygenHour = filterWorkOutData.reduce((sum, data) => sum + data.no_oxygen_hour, 0); // 시간
        let sumTotalNoOxygenMinute = filterWorkOutData.reduce((sum, data) => sum + data.no_oxygen_minute, 0); // 분
        if(sumTotalNoOxygenMinute >= 60){
            const hour = Math.floor(sumTotalNoOxygenMinute / 60);
            sumTotalNoOxygenHour += hour;
            sumTotalNoOxygenMinute = sumTotalNoOxygenMinute % 60;
        }
        
        // 데이터 필터링 (몸무게 평균용)
        const filterWorkOutDataAvg = filterWorkOutData.filter((item)=> item.weight != 0)
        // 총 몸무게 합계
        const sumTotalWeight = filterWorkOutDataAvg.reduce((sum, data) => sum + data.weight, 0);
        // 총 몸무게 평균 (사용)
        const sumAverageWeight = Math.trunc((sumTotalWeight / filterWorkOutDataAvg.length) * 10) / 10;

        // 총 식사량 합계
        const sumTotalRice = filterWorkOutData.reduce((sum, data) => sum + data.rice, 0);
        // 총 식사량 평균 (사용)
        const sumAverageRice = Math.trunc((sumTotalRice / filterWorkOutData.length) * 10) / 10;

        return {weekAverageWeight, weekAverageRice, weekTotalYesOxygenHour, weekTotalYesOxygenMinute, weekTotalNoOxygenHour, weekTotalNoOxygenMinute,
            sumTotalYesOxygenHour, sumTotalYesOxygenMinute, sumTotalNoOxygenHour, sumTotalNoOxygenMinute, sumAverageWeight, sumAverageRice,
            monthAverageWeight, monthAverageRice
        };
    }
    //test
    const { differenceYesHour, differenceYesMinute, differenceNoHour, differenceNoMinute } = curcWorkOut();
    const {weekAverageWeight, weekAverageRice, weekTotalYesOxygenHour, weekTotalYesOxygenMinute, weekTotalNoOxygenHour, weekTotalNoOxygenMinute,
        sumTotalYesOxygenHour, sumTotalYesOxygenMinute, sumTotalNoOxygenHour, sumTotalNoOxygenMinute, sumAverageWeight, sumAverageRice,
        monthAverageWeight, monthAverageRice} = curcWorkOut2();

    
    return (
        <div className='time_picker_content'>
            {/* <div className='workOutCompleteButton' onClick={() => onSubmit()}>적용하기</div> */}
            <div className='work_out_gubun_wrapper'>
                <div>유산소 운동</div>
                <div>헬스류 운동</div>
                <div style={{marginLeft:'16px'}}>오늘의 몸무게</div>
            </div>
            <div className='work_out_time_wrapper'>
                {/* 유산소 */}
                <div className="time-container">
                    <div className="time-display">
                        <span>{String(yesHours).padStart(2, '0')}</span>:<span>{String(yesMinutes).padStart(2, '0')}</span>
                    </div>
                    <div className="buttons">
                        <div className="button-group">
                            <button onClick={yesIncreaseHour}>▲</button>
                            <button onClick={yesDecreaseHour}>▼</button>
                        </div>
                        <div className="button-group">
                            <button onClick={yesIncreaseMinute}>▲</button>
                            <button onClick={yesDecreaseMinute}>▼</button>
                        </div>
                    </div>
                </div>
                {/* 무산소 */}
                <div className="time-container">
                    <div className="time-display">
                        <span>{String(noHours).padStart(2, '0')}</span>:<span>{String(noMinutes).padStart(2, '0')}</span>
                    </div>
                    <div className="buttons">
                        <div className="button-group">
                            <button onClick={noIncreaseHour}>▲</button>
                            <button onClick={noDecreaseHour}>▼</button>
                        </div>
                        <div className="button-group">
                            <button onClick={noIncreaseMinute}>▲</button>
                            <button onClick={noDecreaseMinute}>▼</button>
                        </div>
                    </div>
                </div>
                {/* 몸무게 */}
                <div className="time-container-3">
                    <div className="time-display">
                        <span style={{fontSize:'30px'}}>{weight}<span style={{fontSize:'25px'}}></span></span>
                    </div>
                    <div className="buttons-weight">
                        <div className="button-group-weight">
                            <button onClick={IncreaseWeight_x3}>▲<br/>▲<br/>▲</button>
                            <button onClick={DecreaseWeight_x3}>▼<br/>▼<br/>▼</button>
                        </div>
                        <div className="button-group-weight">
                            <button onClick={IncreaseWeight_x2}>▲<br/>▲</button>
                            <button onClick={DecreaseWeight_x2}>▼<br/>▼</button>
                        </div>
                        <div className="button-group-weight">
                            <button onClick={IncreaseWeight_x1}>▲</button>
                            <button onClick={DecreaseWeight_x1}>▼</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* 식사량 조작 */}
            <div className='rice-wrapeer'>
                <div className="rice-title-wrapper">
                    <div className='rice-title'>식사량</div>
                    <div className='rice-value'>{rice}</div>
                </div>
                <div className='rice-button-wrapper'>
                    <div><button onClick={IncreaseRice}>▲</button></div>
                    <div ><button onClick={DecreaseRice}>▼</button></div>
                </div>
            </div>

            <div className='work_out_time_compare'>
                <div className='calculate-header-weekend'>오늘의 대결</div>
                {
                    (() => {
                        // 시간과 분을 "분"으로 변환
                        const totalYesMinutes = differenceYesHour * 60 + differenceYesMinute;
                        const totalNoMinutes = differenceNoHour * 60 + differenceNoMinute;

                        // 절대값을 사용하여 시간과 분을 다시 계산
                        const absYesMinutes = Math.abs(totalYesMinutes);
                        const absNoMinutes = Math.abs(totalNoMinutes);

                        const absYesHour = Math.floor(absYesMinutes / 60); // 시간 변환
                        const absYesMin = absYesMinutes % 60; // 남은 분

                        const absNoHour = Math.floor(absNoMinutes / 60);
                        const absNoMin = absNoMinutes % 60;

                        // 음수 값이면 "부족합니다.", 양수면 "운동하셨습니다."
                        const yesSign = totalYesMinutes < 0 ? <span className='minus_text'>더 부족해요&#128546;</span> : <span className='plus_text'>더 많이 하셨네요&#128522;</span>;
                        const noSign = totalNoMinutes < 0 ? <span className='minus_text'>더 부족해요&#128546;</span> : <span className='plus_text'>더 많이 하셨네요&#128522;</span>;

                        // 유산소 운동이 0시간 0분일 때는 유산소 관련 div를 숨기고, 무산소 운동이 0시간 0분일 때는 무산소 관련 div를 숨깁니다.
                        const showYes = !(absYesHour === 0 && absYesMin === 0);
                        const showNo = !(absNoHour === 0 && absNoMin === 0);

                        // 둘 다 0시간 0분일 때는 "장 디엘로에스님보다"도 숨김
                        const showHeader = showYes || showNo;

                        if (!showYes && !showNo) {
                            return null;
                        }

                        return loginName === '9334' ? (
                            <>
                                {showHeader && <div style={{ marginBottom: '1px' }}> &nbsp;「장선생」님보다</div>}
                        
                                {showYes && (
                                    <div style={{ marginBottom: '1px' }}>
                                        유산소 운동{' '}
                                        {absYesHour > 0 && `${absYesHour}시간 `}
                                        {absYesMin}분 {yesSign}
                                    </div>
                                )}
                                {showNo && (
                                    <div style={{ marginBottom: '10px' }}>
                                        무산소 운동{' '}
                                        {absNoHour > 0 && `${absNoHour}시간 `}
                                        {absNoMin}분 {noSign}
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                {showHeader && <div style={{ marginBottom: '5px' }}> &nbsp;「팅선생」님보다</div>}
                        
                                {showYes && (
                                    <div style={{ marginBottom: '1px' }}>
                                        유산소 운동{' '}
                                        {absYesHour > 0 && `${absYesHour}시간 `}
                                        {absYesMin}분 {yesSign}
                                    </div>
                                )}
                                {showNo && (
                                    <div style={{ marginBottom: '10px' }}>
                                        무산소 운동{' '}
                                        {absNoHour > 0 && `${absNoHour}시간 `}
                                        {absNoMin}분 {noSign}
                                    </div>
                                )}
                            </>
                        );
                    })()
                }
                {/* <div>오늘의 몸무게는 ?? 입니다.</div> */}
            </div>

            {/* Total */}
            <div className='work_out_time_compare_second'>
                <div className='calculate-weekend-wrapper'>
                    <div className='calculate-header-weekend'>운동</div>
                    <div style={{color:'green'}}>주 누적 유산소</div>
                    <div className='culCulVal'>{weekTotalYesOxygenHour}시간 {weekTotalYesOxygenMinute}분</div>
                    <div style={{color:'green'}}>주 누적 헬스</div>
                    <div className='culCulVal'>{weekTotalNoOxygenHour}시간 {weekTotalNoOxygenMinute}분</div>
                    <div style={{marginTop:'5px'}}/>
                    <div style={{color:'blue'}}>총 누적 유산소</div>
                    <div className='culCulVal'>{sumTotalYesOxygenHour}시간 {sumTotalYesOxygenMinute}분</div>
                    <div style={{color:'blue'}}>총 누적 무산소</div>
                    <div className='culCulVal'>{sumTotalNoOxygenHour}시간 {sumTotalNoOxygenMinute}분</div>
                </div>
                <div className='calculate-weekend-wrapper-1'>
                    <div className='calculate-header-total'>몸무게</div>
                    <div style={{color:'green'}}>주 평균 몸무게</div>
                    <div className='culCulVal'>{!weekAverageWeight ? 0 : weekAverageWeight}kg</div>
                    <div style={{marginTop:'5px'}}/>
                    <div style={{color:'green'}}>달 평균 몸무게</div>
                    <div className='culCulVal'>{!monthAverageWeight ? 0 : monthAverageWeight}kg</div>
                    <div style={{marginTop:'5px'}}/>
                    <div style={{color:'blue'}}>총 평균 몸무게</div>
                    <div className='culCulVal'>{sumAverageWeight}kg</div>
                </div>
                <div className='calculate-weekend-wrapper-1'>
                    <div className='calculate-header-total'>식사량</div>
                    <div style={{color:'green'}}>주 평균 식사량</div>
                    <div className='culCulVal'>{!weekAverageRice ? 0 : weekAverageRice} </div>
                    <div style={{color:'green'}}>달 평균 식사량</div>
                    <div style={{marginTop:'5px'}}/>
                    <div className='culCulVal'>{!monthAverageRice ? 0 : monthAverageRice} </div>
                    <div style={{marginTop:'5px'}}/>
                    <div style={{color:'blue'}}>총 평균 식사량</div>
                    <div className='culCulVal'>{sumAverageRice} </div>
                </div>
            </div>
        </div>
    );
});

export default TimePicker;
