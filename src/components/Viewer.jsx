import { useState, useEffect } from "react"
import Button from "./Button"
import "./Viewer.css"
import EmotionItem from "./EmotionItem"
import { useNavigate } from "react-router-dom"
import { getTimeStampDate } from "../util/get-timstamp-change.js"
import ToggleButton from "./ToggleButton"
import { UseModal } from "../hooks/UseAlertModal.jsx";

//성취도 객체 .map() 위해
const emotionList = [
    {
        emotionId: 0,
    },
    {
        emotionId: 1,
    },
    {
        emotionId: 2,
    },
    {
        emotionId: 3,
    },
    {
        emotionId: 4,
    },
    {
        emotionId: 5,
    },
    {
        emotionId: 6,
    }
]

const Viewer = ({ onSubmit, initData, loginName, memberData, onMemberInsert }) => {
    // console.log("test", initData)
    const nav = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    const { openAlertModal = false } = UseModal() || {};
    // const [completeIsChecked, clickCompleteIbox] = useState(false);
    // 날짜 선택 이벤트 위해
    const [input, setInput] = useState({
        createDate: new Date(),
        emotionId: 2,
        content: "",
        inputBoxCount: 1,
        inputBoxStudyCount: 1,
        iBox_1: "",
        iBox_2: "",
        iBox_3: "",
        iBox_4: "",
        iBox_5: "",
        iBox_6: "",
        iBox_7: "",
        iBox_8: "",
        iBox_9: "",
        iBox_10: "",
        iBox_study_1: "",
        iBox_study_2: "",
        iBox_study_3: "",
        iBox_study_4: "",
        iBox_study_5: "",
        iBox_study_6: "",
        iBox_study_7: "",
        iBox_study_8: "",
        iBox_study_9: "",
        iBox_study_10: "",
        iBox_check_1: "",
        iBox_check_2: "",
        iBox_check_3: "",
        iBox_check_4: "",
        iBox_check_5: "",
        iBox_check_6: "",
        iBox_check_7: "",
        iBox_check_8: "",
        iBox_check_9: "",
        iBox_check_10: "",
        iBox_study_check_1: "",
        iBox_study_check_2: "",
        iBox_study_check_3: "",
        iBox_study_check_4: "",
        iBox_study_check_5: "",
        iBox_study_check_6: "",
        iBox_study_check_7: "",
        iBox_study_check_8: "",
        iBox_study_check_9: "",
        iBox_study_check_10: "",
    });

    const addInputBox = () => {
        if (input.inputBoxCount > 9) { openAlertModal("10까지만 생성가능합니다"); return; }
        setInput({
            ...input,
            inputBoxCount: input.inputBoxCount + 1
        })
    }

    const handleDivClick = (gubun) => {
        if (input.confirmName != loginName) {
            openAlertModal("사용자의 다이어리가 아닙니다.");
            return;
        }
        setInput((input) => ({
            ...input,
            [gubun]: !input[gubun],
        }))
    };

    // + 버튼 눌러서 박스 만들기
    const getInputBox = (gubun) => {
        let workBoxes = [];
        if (gubun == 'do_work') {
            for (let i = 1; i <= input.inputBoxCount; i++) {
                workBoxes.push(
                    <div className={`Viewer_add_plan_div ${input[`iBox_check_${i}`] ? 'checked' : ''}`} key={`inputBox_${i}`}>
                        <div className="Viewer_add_plan_div_input">
                            <textarea readOnly type="text" name={`iBox_${i}`} className={`Viewer_add_plan_input ${input[`iBox_check_${i}`] ? 'checked' : ''}`} onChange={onChangeInput} value={input[`iBox_${i}`] || ""
                            } />
                        </div>
                        <div className="Viewer_add_plan_div_toggle">
                            <ToggleButton isChecked={input[`iBox_check_${i}`]} onToggle={() => handleDivClick(`iBox_check_${i}`)} />
                        </div>
                    </div>
                );
            }
            return workBoxes;
        }
        let studyBoxes = [];
        if (gubun == 'do_study') {
            for (let i = 1; i <= input.inputBoxStudyCount; i++) {
                studyBoxes.push(
                    <div className={`Viewer_add_plan_div ${input[`iBox_study_check_${i}`] ? 'checked' : ''}`} key={`inputBox_study_${i}`}>
                        <div className="Viewer_add_plan_div_input">
                            <textarea readOnly type="text" name={`iBox_${i}`} className={`Viewer_add_plan_input ${input[`iBox_study_check_${i}`] ? 'checked' : ''}`} onChange={onChangeInput} value={input[`iBox_study_${i}`] || ""
                            } />
                        </div>
                        <div className="Viewer_add_plan_div_toggle">
                            <ToggleButton isChecked={input[`iBox_study_check_${i}`]} onToggle={() => handleDivClick(`iBox_study_check_${i}`)} />
                        </div>
                    </div>
                );
            }
            return studyBoxes;
        }
    }

    useEffect(() => {
        if (initData) {
            setInput({
                ...initData,
                createDate: new Date(Number(initData.createDate))
            })
        }
    }, [initData])

    const onChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === "createDate") {
            value = new Date(value);
        }
        setInput({
            ...input,
            [name]: value,
        })
    }

    const onClickSubmitButton = () => {
        if (input.confirmName != loginName) {
            openAlertModal("사용자의 다이어리가 아닙니다.");
            return;
        }
        onSubmit(input);
    }

    const friendBoardCheck = () => {
        let rank='';
        let point='';
        let boardDate = getTimeStampDate(input.createDate)
        let mission = 'thisBoardCheck'

        if(loginName == input.confirmName){
            openAlertModal('내 플래너는 확인할 수 없습니다.');
            return;
        }

        for (let i = 0; i < memberData.memberData.length; i++) {
            let item = memberData.memberData[i];
            if (loginName == item.mission_name) {
                rank = item.rank;
                point = item.point;
            }
            if (loginName == item.mission_name && item.insert_date == boardDate && item.mission == 'thisBoardCheck') {
                openAlertModal('이미 확인되었습니다.');
                // nav("/", { replace: true })
                return;
            }
        }
        // 같은 게 없다면
        let justPoint = point;
        openAlertModal('확인되었습니다');
        // console.log('랭크 ', rank, '포인트 ', point);
        // console.log("보드 데이트", boardDate);
        onMemberInsert(justPoint, mission, rank, boardDate);
        nav("/", { replace: true })
    }

    return (
        <div className="Viewer">
            <section className="Viewer_emotion_section">
                <h4>주어진 환경에서 최선을 다 하셨나요?</h4>
                <div className="Viewer_emotion_list_wrapper" name="emotionId">
                    {emotionList.map((item) => <EmotionItem componentType={'Viewer'} onClick={() => onChangeInput({
                        target: {
                            name: "emotionId",
                            value: item.emotionId,
                        }
                    })} key={item.emotionId} {...item} isSelected={item.emotionId === input.emotionId} />)}
                </div>
            </section>
            <section className="Viewer_add_plan_section">
                <div className="Viewer_complete_check_button">
                    <h4></h4><button style={{ fontSize: '15px' }} onClick={onClickSubmitButton}>적용</button>
                </div>
                <h4>과제 플랜</h4>
                {getInputBox('do_work')}
                <h4>성장 플랜</h4>
                {getInputBox('do_study')}
            </section>
            <section className="Viewer_content_section">
                <h4>오늘의 하루는 어떠셨나요?</h4>
                <textarea readOnly className="Viewer_textarea1" value={input.content} name="content" onChange={onChangeInput}></textarea>
            </section>
            <section className="Viewer_content_section2">
                <h4>메모장</h4>
                <textarea readOnly className="Viewer_textarea2" value={input.content_memo} name="content_memo" onChange={onChangeInput}></textarea>
            </section>
            <section className="Viewer_button_section">
                <Button onClick={() => nav(-1)} text={"취소하기"} />
                <Button onClick={()=>friendBoardCheck()} text={"확인하기"} />
            </section>
        </div>
    )
}

export default Viewer;