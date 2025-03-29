import { useState, useEffect } from "react"
import Button from "./Button"
import "./EditorYearDiary.css"
import EmotionItem from "./EmotionItem"
import { useNavigate } from "react-router-dom"
import { getStringedDate } from "../util/get-stringed-date"
import { useRef } from "react"
import smile_img from './../assets/smile_img.svg'
import soso_img from './../assets/soso_img.svg'

const EditorYearDiary = ({ onSubmit, initData, loginName, selectedMonth, yearPlanMemoData }) => {
    const nav = useNavigate();
    const [input, setInput] = useState([]);
    const idRef = useRef(0);

    useEffect(() => {
        if (initData) {
            setInput([
                ...initData,
            ])
        }
    }, [initData])

    const onChangeInput = (e, id) => {
        // console.log("e",e)
        // console.log("onChange 시점의 input 값", input)
        let name = e.target.name;
        let value = e.target.value;
        // console.log(name, " ", value)
        // console.log("name: ", name, "value: ", value)
        setInput(
            input.map((item) => item.id == id ? { ...item, [name]: value } : item)
        )
    }

    const completeObject = (id) => {
        // console.log('');
        setInput(
            input.map((item)=> item.id == id ? {...item, plan_checked: !item.plan_checked} : item)
        );
        // console.log(input);
    }

    const addArrayFunc = () => {

        let maxId = 0;
        input.forEach((item) => {
            if (Number(item.id) > maxId) {
                maxId = Number(item.id)
            }
        });

        idRef.current = maxId + 1;

        const [year, month] = selectedMonth.split("-").map(Number);

        setInput([
            ...input,
            {
                id: idRef.current,
                title: "",
                plan_checked: false,
                gubun_year: year,
                gubun_month: month,
                insert_name: loginName,
            },
        ]);
    }

    const inputBoxArray = () => {
        let inputArray = [];
        inputArray.push(
            <div className="diary_add_complete_div" key={Math.random()}>
                <button className="diary_completeButton" onClick={onClickSubmitButton}>체크 적용</button>
                {/* <button className="diary_plusButton" onClick={addArrayFunc}>+</button> */}
            </div>
        )
        Array.isArray(input) && input.map((item, index) => {
            inputArray.push(
                <section key={item.id} className={`diary_item_section ${item.plan_checked ? 'checked': ''}`}>
                    <textarea readOnly className={`diary_Year_Diary_textarea ${item.plan_checked ? 'checked' : ''}` } style={{ width: '90%' }} id="" value={item.title} name="title" onChange={(e) => onChangeInput(e, item.id)}></textarea>
                    <div onClick={() => completeObject(item.id)}>{item.plan_checked ? <img src={smile_img}></img> : <img src={soso_img}></img>}</div>
                </section>
            )
        })
        if(input.length < 1) {
            inputArray.push(<div key={Math.random()} style={{display: 'flex', justifyContent:'center', fontSize:'18px', marginTop:'5%' }}>작성하기를 선택하여 플랜을 만들어주세요</div>)
        } 
        return inputArray;
    }

    const onClickSubmitButton = () => {
        nav("/", { replace: true })
        onSubmit(input);
    }

    return (
        <>
            <div className="diary_EditorYear">

                <div>
                    {inputBoxArray()}
                </div>

                <div className="diary_yearTempWrapper">
                    <p className="diary_yearTempTitle"> 연간 계획 메모 </p>
                    <textarea readOnly className="diary_yearTempMemo" value={yearPlanMemoData.filter((item)=>item.insert_name == loginName)[0]?.title || ""}></textarea>
                </div>

            </div>
        </>
    )
}

export default EditorYearDiary;