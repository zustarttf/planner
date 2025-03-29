import Header from "../components/Header";
import Button from "../components/Button";
import riding from './../assets/riding.png';
import information from './../assets/information_img.svg';
import money_img from './../assets/money_img.png';
import medal_img from './../assets/medal_img.svg';
import watch_img from './../assets/watch_img.svg';
import year_img from './../assets/year_img.svg';
import health_img from './../assets/health_img.svg';
import dday_img from './../assets/dday_img.svg';
import lank_img from './../assets/lank_img.svg';
import grow_img from './../assets/grow_img.svg';
import mind_img from './../assets/mind_img.svg';
import free_menu_img from './../assets/free_menu_img.svg';
import graph_img from './../assets/graph_img.svg';

import { useState, useContext } from "react";
import DailyList from './../components/DailyList';
import { DiaryStateContext, MemberStateContext } from "../App.jsx";
import { useRef, useEffect } from "react";
import Modal from "./../components/Modal";
import './Home.css';
import { MemberDispatchContext } from "../App.jsx";
import { DiaryDispatchContext } from "../App.jsx";

const getMonthlyData = (pivotDate, data) => {
    // 현재 날짜를 비교하기 위해 타임스탬프로 만듦
    const beginTime = new Date(pivotDate.getFullYear(),
        pivotDate.getMonth(), 1, 0, 0, 0).getTime();

    const endTime = new Date(pivotDate.getFullYear(),
        pivotDate.getMonth() + 1, 0, 23, 59, 59).getTime();

    // 날짜에 의거 상태변수 데이터 조작
    return data.filter((item) => (beginTime <= item.createDate && item.createDate <= endTime))
}

// 로그인 코드와 게시물 코드가 같은 것만 필터링
const getLoginFilterData = (data, loginName) => {
    // console.log(data);
    // console.log(loginName);
    const loginFilterDataArray = []
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (item.confirmName == loginName) {
            loginFilterDataArray.push(item);
        }
    }
    loginFilterDataArray.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
    // console.log(loginFilterDataArray)
    return loginFilterDataArray;
}

const sortEventLogData = (sortEventLogData) => {
    const tempData = sortEventLogData.sort((a, b) => new Date(b.insert_date) - new Date(a.insert_date));
    return tempData;
}



const Home = ({ loginName }) => {
    const [pivotDate, setPivotDate] = useState(new Date());
    const { data, longTermPlanData, lankPlanData, freePlannerData } = useContext(DiaryStateContext);
    const { memberData, workOutData, eventLogData } = useContext(MemberStateContext);
    const { onInsertLankPlanData, onInsertFreePlanData } = useContext(DiaryDispatchContext);
    const { onlyMemberUpdate, onMemberInsert, onUpdateWorkOut, onInsertEventLogData } = useContext(MemberDispatchContext);
    //console.log("확인해보자2", onInsertLankPlanData);
    const [loginNameData, setLoginNameData] = useState(loginName)

    // 공지사항 모달
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // 메달 업그레이드 모달
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const openModal2 = () => setIsModalOpen2(true);
    const closeModal2 = () => setIsModalOpen2(false);

    // 연간 몰아보기 모달
    const [isModalOpen3, setIsModalOpen3] = useState(false);
    const openModal3 = () => setIsModalOpen3(true);
    const closeModal3 = () => setIsModalOpen3(false);

    // 데일리 몰아보기 모달
    const [isModalOpen4, setIsModalOpen4] = useState(false);
    const openModal4 = () => setIsModalOpen4(true);
    const closeModal4 = () => setIsModalOpen4(false);

    // 운동 대결 모달
    const [isModalOpen5, setIsModalOpen5] = useState(false);
    const openModal5 = () => setIsModalOpen5(true);
    const closeModal5 = () => setIsModalOpen5(false);

    // 디데이 체크하기
    const [isModalOpen6, setIsModalOpen6] = useState(false);
    const openModal6 = () => setIsModalOpen6(true);
    const closeModal6 = () => setIsModalOpen6(false);

    // 마인드, 마음가짐, 철학학
    const [isModalOpen7, setIsModalOpen7] = useState(false);
    const openModal7 = () => setIsModalOpen7(true);
    const closeModal7 = () => setIsModalOpen7(false);

    //현재 달에 해당하는 데이터만 필터링
    const monthyData = getMonthlyData(pivotDate, data);
    // console.log(monthyData);506

    //현재 접속자에 해당하는 데이터만 필터링
    const loginFilterData = getLoginFilterData(data, loginName);
    // console.log("현재 접속자", loginFilterData);

    const completeSortEventLogData = sortEventLogData(eventLogData)
    // 월 이동
    const onIncreaseMonth = () => {
        setPivotDate(
            new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1)
        );
    };
    const onDecreaseMonth = () => {
        setPivotDate(
            new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1)
        );
    };

    const getlongTermPlanFilterData = (longTermPlanData, loginName) => {
        // console.log("longTermPlanData", longTermPlanData);
        const longTermPlanDataArray = longTermPlanData.filter((item) => item.insert_name == loginNameData)
        // console.log("longTermPlanDataArray", longTermPlanDataArray)
        longTermPlanDataArray.sort((a, b) => new Date(b.gubun_month) - new Date(a.gubun_month));
        return longTermPlanDataArray;
    }

    const longTermPlanFilterData = getlongTermPlanFilterData(longTermPlanData, loginName);

    // let onlyMemberData1 = onlyMemberData.filter((item)=>item.login_name == loginName)

    return (
        <div>
            <Header riding={riding} title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
                leftChild={<Button onClick={onDecreaseMonth} text={"<"} />} rightChild={<Button onClick={onIncreaseMonth} text={">"} />} />
            <div className="menuModal">

                <div className="Alrim" onClick={openModal2} style={{ backgroundColor: '#1C1C1C' }}>
                    <img src={medal_img} />
                </div>
                <Modal isOpen={isModalOpen2} closeModal={closeModal2} workOutData={workOutData} eventLogData={completeSortEventLogData} data={data} onInsertEventLogData={onInsertEventLogData} modalGubun={'MEDAL'} onMemberInsert={onMemberInsert} onlyMemberUpdate={onlyMemberUpdate} loginName={loginName} memberData={memberData.filter((item) => item.login_name == loginName)} memberDataOther={memberData.filter((item) => item.login_name != loginName)} />

                <div className="Alrim" onClick={openModal3} style={{ backgroundColor: 'rgb(83, 171, 208)' }}>
                    <img src={year_img} />
                </div>
                <Modal isOpen={isModalOpen3} closeModal={closeModal3} modalGubun={'YEAR'} loginNameData={loginNameData} longTermPlanFilterData={longTermPlanFilterData} setLoginNameData={setLoginNameData} />

                <div className="Alrim" onClick={openModal4} style={{ backgroundColor: 'rgb(89, 196, 125)' }}>
                    <img src={watch_img} />
                </div>
                <Modal isOpen={isModalOpen4} closeModal={closeModal4} modalGubun={'DAILY'} loginFilterData={loginFilterData} />

                <div className="Alrim" onClick={openModal6} style={{ backgroundColor: '#A989B7' }}>
                    <img src={lank_img} />
                </div>
                <Modal isOpen={isModalOpen6} closeModal={closeModal6} onInsertLankPlanData={onInsertLankPlanData} modalGubun={'lankPlan'} loginName={loginName} lankPlanData={lankPlanData} />

                <div className="Alrim" onClick={openModal5} style={{ backgroundColor: 'rgb(20, 60, 120)' }}>
                    <img src={health_img} />
                </div>
                <Modal isOpen={isModalOpen5} closeModal={closeModal5} onUpdateWorkOut={onUpdateWorkOut} modalGubun={'HEALTH'} loginName={loginName} workOutData={workOutData} />

                <div className="Alrim" onClick={openModal} style={{ backgroundColor: '#0080ff' }}>
                    <img src={free_menu_img} />
                </div>
                <Modal onInsertFreePlanData={onInsertFreePlanData} loginName={loginName} freePlannerData={freePlannerData} isOpen={isModalOpen} closeModal={closeModal} modalGubun={'FREE'} />

                <div className="Alrim" onClick={openModal7} style={{ backgroundColor: '#5D4037' }}>{/*#B4A7D6 */}
                    <img src={graph_img} />
                </div>
                <Modal isOpen={isModalOpen7} closeModal={closeModal7} modalGubun={'GRAPH'} loginFilterData={loginFilterData} filterWorkOutData={workOutData.filter((item)=>item.insert_name == loginName)} />
                


            </div>
            <DailyList data={monthyData} loginName={loginName} />
        </div>
    )
}

export default Home;
