import './LankPlanModal.css'
import lank_black_img from './../assets/lank_black_img.svg'
import with_img from './../assets/with_img.svg'
import pencil_img from './../assets/pencil_img.svg'
import man_img from './../assets/man_img.svg'
import women_img from './../assets/women_img.svg'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { UseModal } from "../hooks/UseAlertModal.jsx";

const LankPlanModal = ({ closeModal, loginName, lankPlanData, onInsertLankPlanData }) => {
    const nav = useNavigate();
    const [planObject, setPlanObject] = useState([]);
    const [newPlanTitle, setNewPlanTitle] = useState();
    const [previousPlanObject, setPreviousPlanObject] = useState(planObject);
    const checkRef = useRef(0); // 상태 대신 useRef로 카운트 유지
    const { openAlertModal = false } = UseModal() || {};
    const [lankPergubun, setLankPergubun] = useState({
        id: 0,
        gubun: '',
    });

    useEffect(() => {
        if (lankPlanData) {
            setPlanObject([
                ...lankPlanData,
            ])
        }
    }, [lankPlanData])


    const planText = (e, gubun) => {
        let value = e.target.value;

        setNewPlanTitle(value)
    }

    const planUpDown = (e, gubun) => {
        // console.log(gubun);
        setPlanObject((prevState) => {
            if (gubun === 'up') {
                return prevState.map((item) => {
                    if (lankPergubun.gubun === 'percent') {
                        return item.id === lankPergubun.id
                            ? { ...item, percent: item.percent === 'With' ? 'M' : item.percent === 'M' ? 'W' : 'With' }
                            : item;
                    }
                    if (lankPergubun.gubun === 'lank') {
                        return item.id === lankPergubun.id
                            ? { ...item, lank: item.lank - 2 }
                            : item;
                    }
                    return item;
                });
            }

            if (gubun === 'down') {
                return prevState.map((item) => {
                    if (lankPergubun.gubun === 'percent') {
                        return item.id === lankPergubun.id
                            ? { ...item, percent: item.percent === 'With' ? 'M' : item.percent === 'M' ? 'W' : 'With' }
                            : item;
                    }
                    if (lankPergubun.gubun === 'lank') {
                        return item.id === lankPergubun.id
                            ? { ...item, lank: item.lank + 2 }
                            : item;
                    }
                    return item;
                });
            }
            return prevState; // 상태 변화가 없을 경우 그대로 반환
        });
        // sortFilter();
    };

    // const sortFilter = () => {
    //     let tempLank = 1;
    //     let updatedPlans = [...planObject]; // 현재 상태를 복사하여 사용
    //     updatedPlans = updatedPlans.sort((a, b) => a.lank - b.lank); // 정렬 먼저 수행
    //     updatedPlans = updatedPlans.filter((item)=> item.insert_name == loginName)

    //     // const minLank = Math.min(...updatedPlans.map(plan => plan.lank)); // 최소값 찾기

    //     // updatedPlans = updatedPlans.map(plan => ({
    //     //     ...plan,
    //     //     lank: plan.lank - minLank + 1 // 최소값을 1로 변환
    //     // }));

    //     let sortedPlans = updatedPlans.map((item, index) => {
    //         if (index > 0 && item.lank !== updatedPlans[index - 1].lank) {
    //             tempLank++;
    //         }else if(index > 0 && item.lank == updatedPlans[index - 1].lank){
    //             tempLank++;
    //         }
    //         return { ...item, lank: tempLank };
    //     });

    //     setPlanObject(sortedPlans); // 최종 정렬된 값 업데이트
    // };

    const sortFilter = () => {
        let updatedPlans = [...planObject]; // 현재 상태 복사
    
        // loginName과 같은 것과 같지 않은 것을 분리
        let matchingPlans = updatedPlans.filter(item => item.insert_name === loginName);
        let otherPlans = updatedPlans.filter(item => item.insert_name !== loginName);
    
        // 각각 정렬
        matchingPlans.sort((a, b) => a.lank - b.lank);
        otherPlans.sort((a, b) => a.lank - b.lank);
    
        // 각각의 그룹에서 순위를 재설정
        const resetRanks = (plans) => {
            let tempLank = 1;
            return plans.map((item, index) => {
                if (index > 0 && item.lank !== plans[index - 1].lank) {
                    tempLank++;
                } else if (index > 0 && item.lank === plans[index - 1].lank) {
                    tempLank++;
                }
                return { ...item, lank: tempLank };
            });
        };
    
        let sortedMatchingPlans = resetRanks(matchingPlans);
        let sortedOtherPlans = resetRanks(otherPlans);
    
        // 최종 리스트로 병합 (항상 loginName 그룹이 먼저)
        let finalSortedPlans = [...sortedMatchingPlans, ...sortedOtherPlans];
    
        setPlanObject(finalSortedPlans); // 상태 업데이트
    };

    useEffect(() => {
        // 이렇게 했을 때 무한루프 생길 일은 없지만 체크용 alert임
        if (JSON.stringify(planObject) !== JSON.stringify(previousPlanObject)) {
            sortFilter();
            checkRef.current += 1;
            if (checkRef.current > 200) {
                openAlertModal('관리자에게 꼭 문의해주세요. 무한루프현상이 발생하였습니다.');
            }
            setPreviousPlanObject(planObject); // 이전 상태를 업데이트
        }
    }, [planObject]);


    const onsubmit = () => {
        onInsertLankPlanData(planObject);
        setLankPergubun({ id: 0, gubun: '', })
        openAlertModal('적용되었습니다.');
        // closeModal();
    }

    const addNewPlan = () => {
        const filteredPlans = planObject.filter(plan => plan.insert_name === loginName);
        const maxId = planObject.length > 0 ? Math.max(...planObject.map(plan => plan.id)) : 0;

        //planObject.length > 0 ? planObject[planObject.length - 1].id + 1 : 1, 왜  8이 두 번 나왔을까 생각해보기.
        setPlanObject([
            ...planObject,
            {
                id: maxId + 1,
                title: newPlanTitle,
                percent: loginName == '9334' ? 'M' : 'With',  // 기본값
                lank: filteredPlans.length > 0 ? filteredPlans[filteredPlans.length - 1].lank + 0 : 1,     // 기본값
                insert_name: loginName,  // 로그인된 사용자명
                complete_state: ''
            }
        ])
        setNewPlanTitle('');
        setLankPergubun({ id: 0, gubun: '', })
    }

    const deletePlan = () => {
        if (confirm("삭제하시겠습니까?")) {
            const filteredPlans = planObject.filter(plan => plan.id !== lankPergubun.id);
            setPlanObject([
                ...filteredPlans,
            ])
        } else {
            return;
        }
    }

    const updatePlan = () => {
        const selectPlan = planObject.filter(plan => plan.id == lankPergubun.id);
        setNewPlanTitle(selectPlan[0].title)
        const filteredPlans = planObject.filter(plan => plan.id !== lankPergubun.id);
        setPlanObject([
            ...filteredPlans,
        ])
    }

    const completePlan = () => {
        setPlanObject((prevState) =>
            prevState.map((item) => item.id == lankPergubun.id ? { ...item, complete_state: item.complete_state == 'complete' ? '' : 'complete' } : item)

        )
    }

    return (
        <div className="modal">
            <div className="modal-content modal-content-gubun modal-enter">
                <span className="close" onClick={closeModal}>&times;</span>
                <div className="lank_plan_header">
                    {loginName == '5063' ? <img src={lank_black_img} alt="" /> : <img src={lank_black_img} alt="" />}
                    <div className='lank_plan_header_title'>{loginName == '5063' ? '커플 순위 플랜' : '커플 순위 플랜'}</div>
                    <div className='lank_plan_modal_complete'>
                        <button onClick={() => onsubmit()}>적용하기</button>
                    </div>
                    <div></div>

                </div>
                <div className="top-button-wrapper">
                    <div className='top-button-left'>
                        <button style={{
                            backgroundColor:lankPergubun.gubun == 'percent' ? 'skyblue': lankPergubun.gubun == 'lank'? 'rgb(119, 124, 111)' : '',
                            color:lankPergubun.gubun == 'percent' ? 'white': lankPergubun.gubun == 'lank'? 'white' : ''
                            }} onClick={(e) => planUpDown(e, 'up')}>▲</button>
                        <button style={{
                            backgroundColor:lankPergubun.gubun == 'percent' ? 'skyblue': lankPergubun.gubun == 'lank'? 'rgb(119, 124, 111)' : '',
                            color:lankPergubun.gubun == 'percent' ? 'white': lankPergubun.gubun == 'lank'? 'white' : ''
                            }} onClick={(e) => planUpDown(e, 'down')}>▼</button>
                    </div>
                    <div className='top-button-right'>
                        <button onClick={() => completePlan()}>체크</button>
                        <button onClick={() => updatePlan()}>수정</button>
                        <button onClick={() => deletePlan()}>삭제</button>
                    </div>
                </div>
                {/* 내용 */}
                <div className='lank_plan_modal_wrapper'>
                    {planObject
                        .filter((item) => item.insert_name == loginName)
                        .sort((a, b) => a.lank - b.lank)
                        .map((item, index) => {
                            return (
                                <div className='lank_plan_modal_content' key={index}>
                                    <div className='lank_plan_modal_left' onClick={() => { setLankPergubun({ id: item.id, gubun: 'lank' }) }}
                                        style={{
                                            backgroundColor: lankPergubun.gubun == 'lank' && lankPergubun.id == item.id ? 'rgb(119, 124, 111) ' : 'rgb(234, 238, 173)',
                                            color: lankPergubun.gubun === 'lank' && lankPergubun.id == item.id ? 'white' : ''
                                        }}>{item.lank}</div>
                                    <div className='lank_plan_modal_center' onClick={() => { setLankPergubun({ id: item.id, gubun: 'title' }) }}>
                                        <span style={{ backgroundColor: item.complete_state == 'complete' ? 'yellow' : '' }}>&nbsp;{item.title}&nbsp;</span>
                                    </div>
                                    <div className='lank_plan_modal_right' onClick={() => { setLankPergubun({ id: item.id, gubun: 'percent' }) }}
                                        style={{
                                            marginLeft: 'auto', backgroundColor: lankPergubun.gubun == 'percent' && lankPergubun.id == item.id ? 'skyblue' : 'rgb(234, 238, 173)',
                                            color: lankPergubun.gubun === 'percent' && lankPergubun.id == item.id ? 'black' : ''
                                        }}>
                                        {item.percent == 'With' ? <img src={with_img}></img> : item.percent == 'M' ? <img src={man_img} /> : item.percent == 'W' ? <img src={women_img} /> : ''}</div>
                                </div>
                            )
                        })}
                    {/* <div className='lank_plan_modal_complete'>
                        <button onClick={() => onsubmit()}>적용하기</button>
                    </div> */}

                    {/* <div className='gubun_line' /> */}

                    <div className='lank_new_plan_header'>
                        <div className='lank_new_plan_title'><img src={pencil_img}></img><div>새로운 플랜</div> </div>
                        <div className='new-plan-button-wrapper'>
                            <button onClick={() => { addNewPlan() }}>작성하기</button>
                        </div>
                    </div>
                    <div className='lank_new_plan_textarea_div'><textarea name="title" value={newPlanTitle} onChange={(e) => planText(e)}></textarea></div>
                    {/* <div className='explanation_wrapper'>
                        <div ><span>완료</span>&nbsp; - 형광펜,&nbsp;<span>적용하기</span>&nbsp; - 저장</div>
                        <div >완료한 플랜 이동 후 모아두는 기능 (업뎃예정)</div>
                        <div >순위 업다운 오동작 (수정예정)</div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default LankPlanModal;