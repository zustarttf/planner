import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./DailyModal.css"

const DailyModal = ({closeModal, watch_black_img, loginFilterData, grow_img, subject_img}) => {
    const [planButtonState, setPlanButtonState] = useState('subject');
    const nav = useNavigate();
    const calculateDDay = (timeStamp) => {
            // 입력된 날짜를 00:00:00으로 설정
            const date1 = new Date(timeStamp);
            date1.setHours(0, 0, 0, 0);

            // 현재 날짜를 00:00:00으로 설정
            const date2 = new Date();
            date2.setHours(0, 0, 0, 0);

            // 밀리초 차이 계산
            const diffInMilliseconds = date2 - date1;
            const diffInDays = diffInMilliseconds / (1000 * 3600 * 24);

            return diffInDays > 0 ? `+${diffInDays}` : diffInDays.toString();
        };

    return(
        <div className="modal">
        <div className="modal-content modal-enter">
            <span className="close" onClick={closeModal}>&times;</span>
            {/* 미완 플랜 */}
            <div className="daily-modal-header">
                <img src={watch_black_img} />
                {planButtonState == 'subject' ? <p>과제 플랜 몰아보기</p> : <p>성장 플랜 몰아보기</p>}
                <div className="daily-modal-header-button-wrapper">
                    <button className="planChangeButton" onClick={() => { planButtonState == 'subject' ? setPlanButtonState('plan') : setPlanButtonState('subject') }}>
                        {planButtonState == 'subject' ?
                            <div className="daily-modal-header-button"><img src={grow_img}></img>성장 플랜 이동</div>
                            : <div className="daily-modal-header-button"><img src={subject_img}></img>과제 플랜 이동</div>}</button>
                </div>
            </div>
            <hr />
            <div>
                {planButtonState == 'subject' && loginFilterData && loginFilterData.length > 0 ? <div style={{ padding: '10px 0px', borderRadius: '5px' }}>미완료 과제</div> : ''}
                {planButtonState == 'subject' && loginFilterData && loginFilterData.length > 0 ? (
                    loginFilterData.map((item, index) => (
                        <div key={index} className="list-item" style={{ display: 'flex', flexDirection: 'column' }}>
                            {item.iBox_1 && !item.iBox_check_1 && (<div className="dis-complete-data" onClick={() => nav(`/diary/${item.id}`)} style={{ backgroundColor: item.iBox_check_1 ? '#FFFF00' : ''}}><div>{new Date(item.createDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\. /g, '. ')}</div><div >{item.iBox_1}</div><div>{calculateDDay(item.createDate) == 0 ? <div>D-DAY</div> : `D${calculateDDay(item.createDate)}`}</div></div>)}
                            {item.iBox_2 && !item.iBox_check_2 && (<div className="dis-complete-data" onClick={() => nav(`/diary/${item.id}`)} style={{ backgroundColor: item.iBox_check_2 ? '#FFFF00' : '' }}><div>{new Date(item.createDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\. /g, '. ')}</div><div >{item.iBox_2}</div><div>{calculateDDay(item.createDate) == 0 ? <div>D-DAY</div> : `D${calculateDDay(item.createDate)}`}</div></div>)}
                            {item.iBox_3 && !item.iBox_check_3 && (<div className="dis-complete-data" onClick={() => nav(`/diary/${item.id}`)} style={{ backgroundColor: item.iBox_check_3 ? '#FFFF00' : '' }}><div>{new Date(item.createDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\. /g, '. ')}</div><div >{item.iBox_3}</div><div>{calculateDDay(item.createDate) == 0 ? <div>D-DAY</div> : `D${calculateDDay(item.createDate)}`}</div></div>)}
                            {item.iBox_4 && !item.iBox_check_4 && (<div className="dis-complete-data" onClick={() => nav(`/diary/${item.id}`)} style={{ backgroundColor: item.iBox_check_4 ? '#FFFF00' : '' }}><div>{new Date(item.createDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\. /g, '. ')}</div><div >{item.iBox_4}</div><div>{calculateDDay(item.createDate) == 0 ? <div>D-DAY</div> : `D${calculateDDay(item.createDate)}`}</div></div>)}
                            {item.iBox_5 && !item.iBox_check_5 && (<div className="dis-complete-data" onClick={() => nav(`/diary/${item.id}`)} style={{ backgroundColor: item.iBox_check_5 ? '#FFFF00' : '' }}><div>{new Date(item.createDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\. /g, '. ')}</div><div >{item.iBox_5}</div><div>{calculateDDay(item.createDate) == 0 ? <div>D-DAY</div> : `D${calculateDDay(item.createDate)}`}</div></div>)}
                            {item.iBox_6 && !item.iBox_check_6 && (<div className="dis-complete-data" onClick={() => nav(`/diary/${item.id}`)} style={{ backgroundColor: item.iBox_check_6 ? '#FFFF00' : '' }}><div>{new Date(item.createDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\. /g, '. ')}</div><div >{item.iBox_6}</div><div>{calculateDDay(item.createDate) == 0 ? <div>D-DAY</div> : `D${calculateDDay(item.createDate)}`}</div></div>)}
                            {item.iBox_7 && !item.iBox_check_7 && (<div className="dis-complete-data" onClick={() => nav(`/diary/${item.id}`)} style={{ backgroundColor: item.iBox_check_7 ? '#FFFF00' : '' }}><div>{new Date(item.createDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\. /g, '. ')}</div><div >{item.iBox_7}</div><div>{calculateDDay(item.createDate) == 0 ? <div>D-DAY</div> : `D${calculateDDay(item.createDate)}`}</div></div>)}
                            {item.iBox_8 && !item.iBox_check_8 && (<div className="dis-complete-data" onClick={() => nav(`/diary/${item.id}`)} style={{ backgroundColor: item.iBox_check_8 ? '#FFFF00' : '' }}><div>{new Date(item.createDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\. /g, '. ')}</div><div >{item.iBox_8}</div><div>{calculateDDay(item.createDate) == 0 ? <div>D-DAY</div> : `D${calculateDDay(item.createDate)}`}</div></div>)}
                            {item.iBox_9 && !item.iBox_check_9 && (<div className="dis-complete-data" onClick={() => nav(`/diary/${item.id}`)} style={{ backgroundColor: item.iBo_check_9 ? '#FFFF00' : '' }}><div>{new Date(item.createDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\. /g, '. ')}</div><div >{item.iBox_9}</div><div>{calculateDDay(item.createDate) == 0 ? <div>D-DAY</div> : `D${calculateDDay(item.createDate)}`}</div></div>)}
                            {item.iBox_10 && !item.iBox_check_10 && (<div className="dis-complete-data" onClick={() => nav(`/diary/${item.id}`)} style={{ backgroundColor: item.iBox_check_10 ? '#FFFF00' : '' }}><div>{new Date(item.createDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\. /g, '. ')}</div><div >{item.iBox_10}</div><div>{calculateDDay(item.createDate) == 0 ? <div>D-DAY</div> : `D${calculateDDay(item.createDate)}`}</div></div>)}
                        </div>
                    ))
                ) : (
                    <>  </>
                )}

                {/* {planButtonState == 'subject' ? <hr style={{ marginTop: '16px' }} /> : ''} */}
                {planButtonState == 'subject' && loginFilterData && loginFilterData.length > 0 ? <div style={{ padding: '10px 0px', borderRadius: '5px' }}>완료 과제</div> : ''}
                {planButtonState == 'subject' && loginFilterData && loginFilterData.length > 0 ? (
                    loginFilterData.map((item, index) => (
                        <div key={index} className="list-item" style={{ display: 'flex', flexDirection: 'column' }}>
                            {item.iBox_1 && item.iBox_check_1 && (<div className="yes_complete-data" style={{backgroundColor: item.iBox_check_1 ? '#FFFF00' : '' }}><div>{new Date(item.createDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\. /g, '. ')}</div> <div>{item.iBox_1}</div></div>)}
                            {item.iBox_2 && item.iBox_check_2 && (<div className="yes_complete-data" style={{backgroundColor: item.iBox_check_2 ? '#FFFF00' : '' }}><div>{new Date(item.createDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\. /g, '. ')}</div> <div>{item.iBox_2}</div> </div>)}
                            {item.iBox_3 && item.iBox_check_3 && (<div className="yes_complete-data" style={{backgroundColor: item.iBox_check_3 ? '#FFFF00' : '' }}><div>{new Date(item.createDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\. /g, '. ')}</div> <div>{item.iBox_3}</div> </div>)}
                            {item.iBox_4 && item.iBox_check_4 && (<div className="yes_complete-data" style={{backgroundColor: item.iBox_check_4 ? '#FFFF00' : '' }}><div>{new Date(item.createDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\. /g, '. ')}</div> <div>{item.iBox_4}</div> </div>)}
                            {item.iBox_5 && item.iBox_check_5 && (<div className="yes_complete-data" style={{backgroundColor: item.iBox_check_5 ? '#FFFF00' : '' }}><div>{new Date(item.createDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\. /g, '. ')}</div> <div>{item.iBox_5}</div> </div>)}
                            {item.iBox_6 && item.iBox_check_6 && (<div className="yes_complete-data" style={{backgroundColor: item.iBox_check_6 ? '#FFFF00' : '' }}><div>{new Date(item.createDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\. /g, '. ')}</div> <div>{item.iBox_6}</div> </div>)}
                            {item.iBox_7 && item.iBox_check_7 && (<div className="yes_complete-data" style={{backgroundColor: item.iBox_check_7 ? '#FFFF00' : '' }}><div>{new Date(item.createDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\. /g, '. ')}</div> <div>{item.iBox_7}</div> </div>)}
                            {item.iBox_8 && item.iBox_check_8 && (<div className="yes_complete-data" style={{backgroundColor: item.iBox_check_8 ? '#FFFF00' : '' }}><div>{new Date(item.createDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\. /g, '. ')}</div> <div>{item.iBox_8}</div> </div>)}
                            {item.iBox_9 && item.iBox_check_9 && (<div className="yes_complete-data" style={{backgroundColor: item.iBo_check_9 ? '#FFFF00' : '' }}><div>{new Date(item.createDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\. /g, '. ')}</div> <div>{item.iBox_9}</div> </div>)}
                            {item.iBox_10 && item.iBox_check_10 && (<div className="yes_complete-data" style={{backgroundColor: item.iBox_check_10 ? '#FFFF00' : '' }}><div>{new Date(item.createDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\. /g, '. ')}</div> <div>{item.iBox_10}</div> </div>)}
                        </div>
                    ))
                ) : (
                    <>  </>
                )}

                {planButtonState == 'plan' && loginFilterData && loginFilterData.length > 0 ? (
                    loginFilterData.map((item, index) => (
                        <div key={index} className="list-item" style={{ display: 'flex', flexDirection: 'column' }}>
                            {item.iBox_study_1 && (<div className="grow-plan-data" style={{backgroundColor: item.iBox_study_check_1 ? '#FFFF00' : '' }}><div>{new Date(item.createDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\. /g, '. ')}</div><div>{item.iBox_study_1}</div></div>)}
                            {item.iBox_study_2 && (<div className="grow-plan-data" style={{backgroundColor: item.iBox_study_check_2 ? '#FFFF00' : '' }}><div>{new Date(item.createDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\. /g, '. ')}</div><div>{item.iBox_study_2}</div></div>)}
                            {item.iBox_study_3 && (<div className="grow-plan-data" style={{backgroundColor: item.iBox_study_check_3 ? '#FFFF00' : '' }}><div>{new Date(item.createDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\. /g, '. ')}</div><div>{item.iBox_study_3}</div></div>)}
                            {item.iBox_study_4 && (<div className="grow-plan-data" style={{backgroundColor: item.iBox_study_check_4 ? '#FFFF00' : '' }}><div>{new Date(item.createDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\. /g, '. ')}</div><div>{item.iBox_study_4}</div></div>)}
                            {item.iBox_study_5 && (<div className="grow-plan-data" style={{backgroundColor: item.iBox_study_check_5 ? '#FFFF00' : '' }}><div>{new Date(item.createDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\. /g, '. ')}</div><div>{item.iBox_study_5}</div></div>)}
                            {item.iBox_study_6 && (<div className="grow-plan-data" style={{backgroundColor: item.iBox_study_check_6 ? '#FFFF00' : '' }}><div>{new Date(item.createDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\. /g, '. ')}</div><div>{item.iBox_study_6}</div></div>)}
                            {item.iBox_study_7 && (<div className="grow-plan-data" style={{backgroundColor: item.iBox_study_check_7 ? '#FFFF00' : '' }}><div>{new Date(item.createDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\. /g, '. ')}</div><div>{item.iBox_study_7}</div></div>)}
                            {item.iBox_study_8 && (<div className="grow-plan-data" style={{backgroundColor: item.iBox_study_check_8 ? '#FFFF00' : '' }}><div>{new Date(item.createDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\. /g, '. ')}</div><div>{item.iBox_study_8}</div></div>)}
                            {item.iBox_study_9 && (<div className="grow-plan-data" style={{backgroundColor: item.iBox_study_check_9 ? '#FFFF00' : '' }}><div>{new Date(item.createDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\. /g, '. ')}</div><div>{item.iBox_study_9}</div></div>)}
                            {item.iBox_study_10 && (<div className="grow-plan-data" style={{backgroundColor: item.iBox_study_check_10 ? '#FFFF00' : '' }}><div>{new Date(item.createDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).replace(/\. /g, '. ')}</div><div>{item.iBox_study_10}</div></div>)}
                        </div>
                    ))
                ) : (
                    <></>
                )}
            </div>
        </div>
        </div >
    )
}

export default DailyModal;