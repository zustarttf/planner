import { useState, useEffect } from "react"
import "./EditorYear.css"
import { useRef } from "react"

const EditorYear = ({ onSubmit, initData, loginName, selectedMonth, yearPlanMemoData, onMemoSubmit }) => {
    const [input, setInput] = useState([]);
    const [MemoInput, setMemoInput] = useState([...yearPlanMemoData]);
    const idRef = useRef(0);

    useEffect(() => {
        if (initData) {
            setInput([
                ...initData,
            ])
        }
    }, [initData])

    useEffect(() => {
        if (yearPlanMemoData) {
            setMemoInput([
                ...yearPlanMemoData,
            ])
        }
    }, [yearPlanMemoData])

    const onChangeInput = (e, id) => {
        let name = e.target.name;
        let value = e.target.value;
        setInput(
            input.map((item) => item.id == id ? { ...item, [name]: value } : item)
        )
    }

    const yearTempMemoFunc = (e, loginName) => {
        let name = e.target.name;
        let value = e.target.value;
        setMemoInput(
            MemoInput.map((item) => item.insert_name == loginName ? { ...item, [name]: value } : item)
        );
    }

    const removeArrayFunc = (id) => {
        // console.log('');
        const removeAfterInput = input.filter((item) => item.id != id)
        setInput([
            ...removeAfterInput,
        ]);
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
                id: Date.now(),
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
            <div className="add_complete_div" key={Math.random()} /*키 막지음 */>
                <button className="completeButton" onClick={onClickSubmitButton}>플랜 적용</button>
                <button className="plusButton" onClick={addArrayFunc}>+</button>
            </div>
        )
        Array.isArray(input) && input.map((item, index) => {
            inputArray.push(
                <section key={item.id} className="item_section">
                    <textarea style={{ width: '80%' }} id="" value={item.title} name="title" onChange={(e) => onChangeInput(e, item.id)}></textarea>
                    <button onClick={() => removeArrayFunc(item.id)}>-</button>
                </section>
            )
        })
        if (input.length < 1) {
            inputArray.push(<div key={Math.random()} style={{ display: 'flex', justifyContent: 'center', fontSize: '18px', marginTop: '50%' }}> + 를 선택하여 플랜을 만들어주세요</div>)
        }
        return inputArray;
    }

    const onClickSubmitButton = () => {
        onSubmit(input);
    }

    return (
        <>
            <div className="EditorYear">

                <div>
                    {inputBoxArray()}
                </div>
                <div className="yearTempWrapper">
                    <div className="yearTempButtonWrapper">
                        <p className="yearTempTitle"> 연간 계획 메모 </p>
                        <button className="yearTempButton" onClick={() => onMemoSubmit(MemoInput)}> 메모 적용 </button>
                    </div>
                    <textarea className="yearTempMemo" name="title" onChange={(e) => yearTempMemoFunc(e, loginName)} value={MemoInput.filter((item) => item.insert_name == loginName)[0]?.title || ""}></textarea>
                </div>
            </div>
        </>
    )
}

export default EditorYear;