const MemberDispatchFunc = ({memberDispatch, idRef, confirmName}) => {
    // 일단은 새 글 작성 시 Member 관련 테이블에 insert 로직
    const onMemberInsert = (point, mission, rank, todayDate) => {
        memberDispatch({
            type: "MEMBER_INSERT",
            data: {
                mission_name: confirmName,
                login_name: confirmName,
                rank: rank,
                point: point,
                insert_date: todayDate,
                mission: mission,
            }
        })
    }

    const onlyMemberUpdate = (point, rank) => {
        memberDispatch({
            type: "ONLY_MEMBER_UPDATE",
            data: {
                login_name: confirmName,
                point: point,
                rank: rank,
            }
        })
    }

    return { onMemberInsert, onlyMemberUpdate };
}

export default MemberDispatchFunc;