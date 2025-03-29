import Button from "../components/Button.jsx";
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { DiaryStateContext, DiaryDispatchContext } from "../App.jsx";
import './NewYearDiary.css';
import EditorYearDiary from "../components/EditorYearDiary.jsx";

const getCurrentMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // getMonth()는 0부터 시작하므로 1을 더함
    return `${year}-${month}`;
};


const getMonthlyData = (selectedMonth, longTermPlanData, loginName) => {
    const [year, month] = selectedMonth.split("-").map(Number);
    const modifyLongTermPlanData = longTermPlanData.filter((item) => year == item.gubun_year && loginName == item.insert_name && month == item.gubun_month);
    // console.log(modifyLongTermPlanData);
    return modifyLongTermPlanData;
}

const NewYearDiary = ({ loginName }) => {
    const { longTermPlanData, yearPlanMemoData } = useContext(DiaryStateContext);
    const { onUpdateCheckLongtermData } = useContext(DiaryDispatchContext);
    const nav = useNavigate();
    const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth()); // 초기값 설정

    // 월을 증가시키는 함수
    const incrementMonth = () => {
        const [year, month] = selectedMonth.split("-").map(Number);
        const newDate = new Date(year, month, 1); // 다음 달
        setSelectedMonth(
            `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, "0")}`
        );
    };

    // 월을 감소시키는 함수
    const decrementMonth = () => {
        const [year, month] = selectedMonth.split("-").map(Number);
        const newDate = new Date(year, month - 2, 1); // 이전 달
        setSelectedMonth(
            `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, "0")}`
        );
    };

    // 값이 직접 변경될 때
    const handleInputChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    const monthyData = getMonthlyData(selectedMonth, longTermPlanData, loginName);

    const onSubmit = (input) => {

        // console.log("monthyData", monthyData);
        // console.log("input", input);


        const changePlanCheck = input.filter((item)=>!monthyData.some((falseItem) => item.id === falseItem.id && item.plan_checked == falseItem.plan_checked))
            // console.log("changePlanCheck", changePlanCheck);

        onUpdateCheckLongtermData(changePlanCheck);
        // alert('적용되었습니다');
        // nav("/", { replace: true })
    }


    return (
        <div>
            <Header title={"연간 플랜 관리"} leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로가기"} />}
                rightChild={<Button type={`POSITIVE`}onClick={() => nav(`/newYearEdit`, { state: { monthDate: selectedMonth} })} text={"작성하기"} />} />

            <div className="daiary_wrapper_calander">
                <div style={{color:'#007aff'}} className="daiary_before_month" onClick={decrementMonth}>&lt;</div>
                <input style={{color:'#007aff'}} className="daiary_main_calander"
                    type="month"
                    value={selectedMonth}
                    onChange={handleInputChange}
                />
                <div style={{color:'#007aff'}} className="daiary_after_month" onClick={incrementMonth}>&gt;</div>
            </div>
            <EditorYearDiary onSubmit={onSubmit} initData={monthyData} loginName={loginName} selectedMonth={selectedMonth} yearPlanMemoData={yearPlanMemoData} />
        </div>
    )
}

export default NewYearDiary;