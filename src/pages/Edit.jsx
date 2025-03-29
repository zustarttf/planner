import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import useDiary from "../hooks/useDiary";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App.jsx";

const Edit = () => {
    const { onUpdate, onDelete } = useContext(DiaryDispatchContext);
    const nav = useNavigate();
    const params = useParams();
    const curDiaryItem = useDiary(params.id);

    const onSubmit = (input) => {
        onUpdate(
            params.id,
            input.createDate.getTime(),
            input.emotionId,
            input.content,
            input.inputBoxCount,
            input.inputBoxStudyCount,
            input.content_memo,
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
            input.iBox_study_10,
            input.iBox_check_1,
            input.iBox_check_2,
            input.iBox_check_3,
            input.iBox_check_4,
            input.iBox_check_5,
            input.iBox_check_6,
            input.iBox_check_7,
            input.iBox_check_8,
            input.iBox_check_9,
            input.iBox_check_10,
            input.iBox_study_check_1,
            input.iBox_study_check_2,
            input.iBox_study_check_3,
            input.iBox_study_check_4,
            input.iBox_study_check_5,
            input.iBox_study_check_6,
            input.iBox_study_check_7,
            input.iBox_study_check_8,
            input.iBox_study_check_9,
            input.iBox_study_check_10
        );
        // nav("/", { replace: true });
        nav(-1);
    };


    const onClickDelete = () => {
        if (window.confirm("일기를 정말 삭제할까요?")) {
            onDelete(params.id);
            // alert('수정이 완료되었습니다');
            nav('/', { replace: true });
        }
    }

    // console.log(curDiaryItem)
    return (
        <div>
            <Header
                title={"플래너 수정"}
                leftChild={<Button style={{color:'#007aff'}} onClick={() => nav(-1)} text={"< 뒤로 가기"} />}
                rightChild={<Button onClick={onClickDelete} text="삭제하기" type={"NEGATIVE"} />}
            />
            <Editor onSubmit={onSubmit} initData={curDiaryItem} />
        </div>
    )
}

export default Edit;