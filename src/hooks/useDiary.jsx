import { useContext, useState, useEffect } from "react";
import { DiaryStateContext } from "../App.jsx";
import { useNavigate } from "react-router-dom";
const useDiary = (id) => {
    const {data} = useContext(DiaryStateContext);
    const [curDiaryItem, setCurDiaryItem] = useState();
    const nav = useNavigate();

    // console.log("테에스트", data);

    useEffect(() => {
        const currentDiaryItem = data.find((item) => String(item.id) === String(id))

        if (!currentDiaryItem) {
            nav("/", { replace: true })
        }
        setCurDiaryItem(currentDiaryItem);

    }, [id]);

    return curDiaryItem;
}

export default useDiary;
