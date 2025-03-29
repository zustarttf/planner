import Button from "../components/Button.jsx";
import Editor from "../components/Editor.jsx";
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext, MemberDispatchContext, MemberStateContext } from "../App.jsx";
import { useContext } from "react";
// import { getStringedDate } from '../util/new-stringed-date.js'

const NewDaily = ({ loginName }) => {
    const { onCreate } = useContext(DiaryDispatchContext);
    const { memberData } = useContext(MemberStateContext);
    const { onMemberInsert } = useContext(MemberDispatchContext);
    const nav = useNavigate();

    const onSubmit = (input) => {
        // console.log(input);
        onCreate(input.createDate.getTime(), input.emotionId, input.content, input.inputBoxCount, input.inputBoxStudyCount, input.content_memo,
            input.iBox_1,
            input.iBox_2,
            input.iBox_3,
            input.iBox_4,
            input.iBox_5,
            input.iBox_6,
            input.iBox_7,
            input.iBox_8,
            input.iBox_9,
            input.iBox_10,
            input.iBox_study_1,
            input.iBox_study_2,
            input.iBox_study_3,
            input.iBox_study_4,
            input.iBox_study_5,
            input.iBox_study_6,
            input.iBox_study_7,
            input.iBox_study_8,
            input.iBox_study_9,
            input.iBox_study_10
        );

        nav("/", { replace: true })
    }

    return (
        <div>
            <Header title={"일간 플랜 작성"} leftChild={<Button onClick={() => nav(-1)} text={"<뒤로가기"} />} />
            <Editor onSubmit={onSubmit} />
        </div>
    )
}

export default NewDaily;