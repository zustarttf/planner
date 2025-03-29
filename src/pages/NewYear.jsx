import Button from "../components/Button.jsx";
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import EditorYear from "../components/EditorYear.jsx";
import { DiaryStateContext, DiaryDispatchContext } from "../App.jsx";
import './NewYear.css';
import { useLocation } from "react-router-dom";
import { UseModal } from "../hooks/UseAlertModal.jsx";


const getMonthlyData = (selectedMonth, longTermPlanData, loginName) => {
    const [year, month] = selectedMonth.split("-").map(Number);
    const modifyLongTermPlanData = longTermPlanData.filter((item) => year == item.gubun_year && loginName == item.insert_name && month == item.gubun_month);
    // console.log(modifyLongTermPlanData);
    return modifyLongTermPlanData;
}


const NewYear = ({ loginName }) => {

    const location = useLocation();
    const { monthDate } = location.state || {};

    const { longTermPlanData, yearPlanMemoData } = useContext(DiaryStateContext);
    const { onInsertLontermData, onRemoveLontermData, onUpdateLontermData, onUpdateYearPlanMemo } = useContext(DiaryDispatchContext);
    const nav = useNavigate();
    const [selectedMonth, setSelectedMonth] = useState(monthDate); // 초기값 설정
    const { openAlertModal = false } = UseModal() || {};

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
        const addDataFilter = input.filter((item) => !monthyData.some((falseItem) => item.id == falseItem.id))
        const removeDataFilter = monthyData.filter((item) => !input.some((falseItem) => item.id == falseItem.id));
        const updateDailyFilter = input.filter((item) => !monthyData.some((falseItem) => item.id == falseItem.id && item.title == falseItem.title));
        onInsertLontermData(addDataFilter);
        onRemoveLontermData(removeDataFilter);
        onUpdateLontermData(updateDailyFilter)

        // console.log("updateDailyFilter: ", updateDailyFilter);
        openAlertModal('적용되었습니다');
        // nav("/", { replace: true })
    }

    const onYearMemoSubmit = (input) => {
        onUpdateYearPlanMemo(input);
        openAlertModal('메모 적용되었습니다.');
    }

    return (
        <div>
            <Header title={"연간 플랜 작성"} leftChild={<Button onClick={() => nav(-1)} text={"<뒤로가기"} />}/>

            {/* <div className="calander_title">월간 플랜</div> */}
            <div className="wrapper_calander">
                <button style={{color:'#007aff'}} className="before_month" onClick={decrementMonth}>◀</button>
                <input style={{color:'#007aff'}} className="main_calander"
                    type="month"
                    value={selectedMonth}
                    onChange={handleInputChange}
                />
                <button style={{color:'#007aff'}} className="after_month" onClick={incrementMonth}>▶</button>
            </div>
            <EditorYear onSubmit={onSubmit} onMemoSubmit={onYearMemoSubmit} initData={monthyData} loginName={loginName} selectedMonth={selectedMonth} yearPlanMemoData={yearPlanMemoData}/>
        </div>
    )
}

export default NewYear;