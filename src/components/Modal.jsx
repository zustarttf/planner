import './Modal.css';
import smile_img from './../assets/smile_img.svg'
import soso_img from './../assets/soso_img.svg'
import year_black_img from './../assets/year_black_img.svg'
import watch_black_img from './../assets/watch_black_img.svg'
import grow_img from './../assets/grow_img.svg'
import subject_img from './../assets/subject_img.svg'
import health_black_img from './../assets/health_black_img.svg'
import { getGradeImage } from './../util/get-graid-image.js';
import { getGradeObject } from './../util/graid-object.js'
// import { useState } from 'react';
// import { useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { newStringedDate } from '../util/new-stringed-date.js'
// import { getTimeStampDate } from '../util/get-timstamp-change.js'
// import TimePicker from './TimePicker';

import LankPlanModal from './LankPlanModal.jsx';
import HealthModal from './HealthModal.jsx';
import DailyModal from './DailyModal.jsx';
import MedalModal from './MedalModal.jsx';
import YearModal from './YearModal.jsx';
import FreeModal from './FreeModal.jsx';
import GraphModal from './GraphModal.jsx';
const Modal = ({ isOpen, closeModal, modalGubun, data, loginName, onMemberInsert, loginFilterData, memberData,
    memberDataOther, onlyMemberUpdate, longTermPlanFilterData, setLoginNameData, loginNameData, workOutData, onUpdateWorkOut,
    onInsertEventLogData, eventLogData, lankPlanData, onInsertLankPlanData, freePlannerData, onInsertFreePlanData, filterWorkOutData }) => {
    // const nav = useNavigate();
    // const [percentButtonState, setPercentButtonState] = useState('close');
    // const [otherMemberState, setOtherMemberState] = useState('close');
    // const [ruleState, setRuleState] = useState('close');
    // const [medalRuleState, setMedalRuleState] = useState('close');
    // const [eventLogState, setEventLogState] = useState('close');
    // const [planButtonState, setPlanButtonState] = useState('subject');

    if (!isOpen) return null;

    
    // 등급 업그레이드
    if (modalGubun == 'MEDAL') {
        return (
            <MedalModal onlyMemberUpdate={onlyMemberUpdate} data={data} loginName={loginName} memberData={memberData} onInsertEventLogData={onInsertEventLogData} 
            onMemberInsert={onMemberInsert} closeModal={closeModal} getGradeObject={getGradeObject} getGradeImage={getGradeImage} eventLogData={eventLogData} memberDataOther={memberDataOther} workOutData={workOutData}/>
        )
    }
    
    // 연간 플랜 몰아보기
    if (modalGubun == 'YEAR') {
        return (
            <YearModal closeModal={closeModal} year_black_img={year_black_img} loginNameData={loginNameData} longTermPlanFilterData={longTermPlanFilterData} smile_img={smile_img} soso_img={soso_img}/>
        )
    }
    // 일간, 성장 플랜 몰아보기
    if (modalGubun === 'DAILY') {
        return (
            <DailyModal closeModal={closeModal} watch_black_img={watch_black_img} loginFilterData={loginFilterData} grow_img={grow_img} subject_img={subject_img}/>
        );
    }
    // 운동 기록
    if (modalGubun == 'HEALTH') {
        // console.log(workOutData);
        
        return (
            <HealthModal closeModal={closeModal} health_black_img={health_black_img} workOutData={workOutData} loginName={loginName} onUpdateWorkOut={onUpdateWorkOut}/>
        )
    }
    // 우선순위플랜
    if (modalGubun == 'lankPlan') {
        return (
            <LankPlanModal lankPlanData={lankPlanData} loginName={loginName} closeModal={closeModal} onInsertLankPlanData={onInsertLankPlanData} />
        )
    }
    
    // 자유 플래너 모달일 때
    if (modalGubun == 'FREE') {
        return (
            <FreeModal onInsertFreePlanData={onInsertFreePlanData} loginName={loginName} closeModal={closeModal} freePlannerData={freePlannerData}/>
        )
    }
    
    // 마인드 기록
    if (modalGubun == 'GRAPH') {
        return (
            <GraphModal closeModal={closeModal} loginFilterData={loginFilterData} filterWorkOutData={filterWorkOutData}/>
        )
    }
    
    
}

export default Modal;