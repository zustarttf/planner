import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App.jsx";
import { MemberStateContext } from "../App.jsx";
import Viewer from "../components/Viewer";
import { MemberDispatchContext } from "../App.jsx";
import { UseModal } from "../hooks/UseAlertModal.jsx";

const Diary = ({ loginName }) => {
    const { onUpdate, onDelete } = useContext(DiaryDispatchContext);
    const { onMemberInsert } = useContext(MemberDispatchContext);
    const memberData = useContext(MemberStateContext);
    const { openAlertModal = false } = UseModal() || {};
    // console.log(memberData);

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
        // alert('적용이 완료되었습니다.');
        nav("/", { replace: true });
    };

    return (
        <div>
            <Header title={"플래너 정보"}
                leftChild={<Button style={{color:'#007aff'}} onClick={() => nav(-1)} text={"< 뒤로 가기"} />}
                rightChild={<Button onClick={() => curDiaryItem.confirmName == loginName ? nav(`/edit/${params.id}`) : openAlertModal("사용자의 다이어리가 아닙니다.")} text={"수정하기"} type={'MODIFY'} />} />
            <Viewer onSubmit={onSubmit} initData={curDiaryItem} loginName={loginName} memberData={memberData} onMemberInsert={onMemberInsert}/>
        </div>
    )
}

export default Diary;