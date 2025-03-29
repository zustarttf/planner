import "./HealthModal.css"
import TimePicker from './TimePicker';
import { useState } from 'react';
import { getTimeStampDate } from "../util/get-timstamp-change";
import { useRef } from "react";
import HealthModalRecord from "./HealthModalRecord";

const filterWorkOutFunc = (workOutData, loginName) => {
    return workOutData.filter((item) => item.insert_name == loginName).sort((b, a) => a.insert_date - b.insert_date);
}

const HealthModal = (props) => {
    const {closeModal, health_black_img, workOutData, loginName, onUpdateWorkOut} = props;
    const [ruleState, setRuleState] = useState('close');
    const [workOutView, setWorkOutView] = useState('battle');
    const HealthChildRef = useRef();

    const handleClick = () => {
        HealthChildRef.current.onSubmit(); // 자식 컴포넌트의 함수 호출
    };

    const filterWorkOutData = filterWorkOutFunc(workOutData, loginName);

    return (
            <div className="modal">
                <div className="modal-content modal-enter">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <div className="health-header">
                        <div className="health-header-title">
                            <div><img src={health_black_img}></img></div>
                            <div>운동 대결</div>
                        </div>
                        <div className="workout-record-div" >
                            <button onClick={()=>workOutView=='battle' ? setWorkOutView('record'):setWorkOutView('battle')} className="workout-record-div-button">{workOutView=='battle' ? '운동 기록 보기' : '대결 화면 이동'}</button>
                            <button style={{display: workOutView=='battle'?'block':'none', marginRight:'10px'}} onClick={handleClick} className="workout-complete-button">적용하기</button>
                        </div>
                    </div>
                    {/* 대결화면 */}
                    <div style={{ display: workOutView == 'battle' ? 'flex' : 'none', gap: '40px'}}>
                        <TimePicker type={'yesOxygen'} 
                        todayFilterWorkOutData={workOutData.find((item) => item.insert_name == loginName && getTimeStampDate(new Date().getTime()) == getTimeStampDate(item.insert_date))} 
                        todayOtherFilterWorkOutData={workOutData.find((item) => item.insert_name != loginName && getTimeStampDate(new Date().getTime()) == getTimeStampDate(item.insert_date))} 
                        filterWorkOutData={workOutData.filter((item) => item.insert_name == loginName)} 
                        ref={HealthChildRef}
                        // otherFilterWorkOutData={workOutData.filter((item) => item.insert_name != loginName)}
                        onUpdateWorkOut={onUpdateWorkOut} loginName={loginName}></TimePicker>
                    </div>
                    {/* 레코드화면 */}
                    <div style={{ display: 'flex', gap: '40px', opacity: workOutView == 'record' ? 1 : 0}}>
                        <HealthModalRecord filterWorkOutData={filterWorkOutData}/>
                    </div>
                    {/* <button className="health-rule" onClick={() => { setRuleState(ruleState === 'close' ? 'open' : 'close') }}>
                        Rule ▼
                    </button> */}
                    <div style={{ display: ruleState == 'close' ? 'none' : 'block', marginLeft: '12px' }}>
                        <div style={{ marginBottom: '10px' }}>(스크롤을 아래로 내리세요)</div>
                        <div style={{ marginBottom: '7px' }}>1. 매일 운동한만큼 카운트 누적하여 올려주세요.</div>
                        <div style={{ marginBottom: '7px' }}>2. 각 잡고 운동하는 것만 카운트 가능합니다.</div>
                        <div style={{ marginBottom: '7px', color: 'blue' }}>(ex. 퇴근 후 각 잡고 산책(o))</div>
                        <div style={{ marginBottom: '7px', color: 'red' }}>(ex. 퇴근하고 어차피 집 가는 길(x) or 마트 가는 길(x))</div>
                        <div style={{ marginBottom: '7px', color: 'blue' }}>(ex. 유산소하며 걷기는 유산소 포함)</div>
                        <div style={{ marginBottom: '7px', color: 'red' }}>(ex. 무산소하며 걷는 시간은 무산소 미포함)</div>
                        <div style={{ marginBottom: '7px' }}>(ex. 농구, 달리기는 유산소, 헬스류만이 무산소)</div>
                        <div style={{ marginBottom: '7px' }}>4. 플래너는 1시간 적더라도 카운트는 쉬는시간 제외하세요.</div>
                        <div style={{ marginBottom: '7px' }}>5. 한계 시 1분 내외의 휴식은 제외하지 않아도 됩니다</div>
                    </div>
                </div>
            </div>
    )
}

export default HealthModal;