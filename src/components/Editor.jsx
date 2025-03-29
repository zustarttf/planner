import { useState, useEffect } from "react"
import Button from "./Button"
import "./Editor.css"
import EmotionItem from "./EmotionItem"
import { useNavigate } from "react-router-dom"
import { getStringedDate } from "../util/get-stringed-date"
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
    },
]

const Editor = ({ onSubmit, initData }) => {
    // console.log("test", initData)
    const { openAlertModal = false } = UseModal() || {};
    const nav = useNavigate();
    // 날짜 선택 이벤트 위해
    const [input, setInput] = useState({
        createDate: new Date(),
        emotionId: 0,
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
    });

    const addInputBox = (gubun) => {
        if (gubun == 'do_work') {

            if (input.inputBoxCount > 9) { openAlertModal("10까지만 생성가능합니다"); return; }
            setInput({
                ...input,
                inputBoxCount: input.inputBoxCount + 1
            })
        }
        if (gubun == 'do_study') {

            if (input.inputBoxStudyCount > 9) { openAlertModal("10까지만 생성가능합니다"); return; }
            setInput({
                ...input,
                inputBoxStudyCount: input.inputBoxStudyCount + 1
            })
        }
    }

    const removeInputBox = (i, gubun) => {
        if(gubun == 'do_work'){
            const updatedInput = { ...input }; // 새로운 객체 복사
            for (let j = i; j <= updatedInput.inputBoxCount; j++) {
                let test = updatedInput[`iBox_${(j + 1)}`];
                updatedInput[`iBox_${j}`] = test // 값 이동 4
                updatedInput[`iBox_${j + 1}`] = '';
            }
            updatedInput.inputBoxCount = updatedInput.inputBoxCount - 1; // 카운트 감소 3->2 / 4->3 /5->4
            setInput(updatedInput); // 상태 업데이트
        }
        if(gubun == 'do_study'){
            const updatedInput = { ...input }; // 새로운 객체 복사
            for (let j = i; j <= updatedInput.inputBoxStudyCount; j++) {
                let test = updatedInput[`iBox_study_${(j + 1)}`];
                updatedInput[`iBox_study_${j}`] = test // 값 이동 4
                updatedInput[`iBox_study_${j + 1}`] = '';
            }
            updatedInput.inputBoxStudyCount = updatedInput.inputBoxStudyCount - 1; // 카운트 감소 3->2 / 4->3 /5->4
            setInput(updatedInput); // 상태 업데이트
        }
    }

    // + 버튼 눌러서 박스 만들기
    const getInputBox = (gubun) => {
        let workBoxes = [];
        if (gubun == 'do_work') {
            for (let i = 1; i <= input.inputBoxCount; i++) {
                workBoxes.push(
                    <div className="wrapper_add_plan_div" key={`wrapper_${i}`}>
                        <div className="add_plan_div" key={`inputBox_${i}`}>
                            <textarea type="text" name={`iBox_${i}`} className="add_plan_input" onChange={onChangeInput} value={input[`iBox_${i}`] || ""
                            } />
                        </div>
                        <div>
                            {
                                i == 1 ? <Button key={`button_${i}`} type={"addInputBox"} onClick={() => addInputBox('do_work')} text={"+"} /> : <Button key={`button_${i}`} type={"removeInputBox"} onClick={() => removeInputBox(i, 'do_work')} text={"-"} />
                            }
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
                    <div className="wrapper_add_plan_div" key={`study_wrapper_${i}`}>
                        <div className="add_plan_div" key={`inputBox_study_${i}`}>
                            <textarea type="text" name={`iBox_study_${i}`} className="add_plan_input" onChange={onChangeInput} value={input[`iBox_study_${i}`] || ""
                            } />
                        </div>
                        <div>
                            {
                                i == 1 ? <Button key={`button_study_${i}`} type={"addInputBox"} onClick={() => addInputBox('do_study')} text={"+"} /> : <Button key={`button_study_${i}`} type={"removeInputBox"} onClick={() => removeInputBox(i, 'do_study')} text={"-"} />
                            }
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
        onSubmit(input);
    }

    return (
        <div className="Editor">
            <section className="date_section">
                <h4>오늘의 일자</h4>
                <input type="date" style={{color:'#007aff'}}value={getStringedDate(input.createDate)} name="createDate" onChange={onChangeInput} />
            </section>
            <section className="emotion_section">
                <h4>주어진 환경에서 최선을 다 하셨나요?</h4>
                <div className="emotion_list_wrapper" name="emotionId">
                    {emotionList.map((item) => <EmotionItem onClick={() => onChangeInput({
                        target: {
                            name: "emotionId",
                            value: item.emotionId,
                        }
                    })} key={item.emotionId} {...item} isSelected={item.emotionId === input.emotionId} />)}
                </div>
            </section>
            <section className="add_plan_section">
                <h4>과제 플랜</h4>
                {getInputBox('do_work')}
            </section>
            <section className="add_plan_section">
                <h4>성장 플랜</h4>
                {getInputBox('do_study')}
            </section>
            <section className="content_section">
                <h4>오늘의 하루는 어떠셨나요?</h4>
                <textarea className="textarea1" value={input.content} name="content" onChange={onChangeInput}></textarea>
            </section>
            <section className="content_section2">
                <h4>메모장</h4>
                <textarea className="textarea2" value={input.content_memo} name="content_memo" onChange={onChangeInput}></textarea>
            </section>
            <section className="button_section">
                <Button onClick={() => nav(-1)} text={"취소하기"} />
                <Button onClick={onClickSubmitButton} text={"작성하기"} />
            </section>
        </div>
    )
}

export default Editor;