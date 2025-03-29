import './DailyList.css'
import DailyItem from './DailyItem';
import Button from './Button';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import riding from './../assets/riding.png';
import ting from './../assets/titi.png';
import write_img from './../assets/write_img.svg'
import { MemberStateContext } from '../App.jsx';
import { getGradeImage } from '../util/get-graid-image';
import useFlowClock from '../hooks/useFlowClock.jsx';
import RunningEmoji from '../hooks/useFlowRunning.jsx';
import clock_img from './../assets/clock.png'


const DailyList = ({ data }) => {
    // console.log("데이타 모양좀 보자", data);
    const [sortType, setSortTyPE] = useState("latest");
    const nav = useNavigate();
    const { memberData } = useContext(MemberStateContext);

    const onChangeSortType = (e) => {
        setSortTyPE(e.target.value)
    }

    const getSortedDate = () => {
        return data.toSorted((a, b) => {
            if (sortType === "oldest") {
                return Number(a.createDate) - Number(b.createDate);
            } else {
                return Number(b.createDate) - Number(a.createDate);
            }
        })
    }

    const SortedDate = getSortedDate();
    return (
        <div className='DiaryList'>
            <div className="scrolling-text-container">
                <div className="FlowClock">
                    <div>{useFlowClock()}</div>
                </div>
            </div>
            <div className="scrolling-text-container-spetial">
                <div className="scrolling-text">🚴    🚴    🚴    🚴    🚴    🚴    🚴
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🐕&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{RunningEmoji()}</div>
            </div>
            <div className='menu_bar'>
                <select className='menu_bar_select' onChange={onChangeSortType}>
                    <option value="latest">최신순</option>
                    <option value="oldest">오래된순</option>
                </select>
                <button className="year_write_button" onClick={() => nav('/newYearDiary')} type={"POSITIVE"} ><img src={write_img} />연간 플래너</button>
                <button className="daily_write_button" onClick={() => nav('/newDaily')} type={"POSITIVE"} ><img src={write_img} />일일 플래너</button>
            </div>

            <div className='list_wrapper'>
                <div className='list_item'>
                    {SortedDate.length >= 1 ? <img className='gradeDiv'
                        src={memberData.filter((item) => item.login_name == '5063')[0] ?
                            getGradeImage(memberData.filter((item) => item.login_name == '5063')[0].rank) : ''} /> : ''}
                    {SortedDate.length >= 1 ? <img className="jjang_son" src={riding} /> : ''}
                    {SortedDate.map((item) => <DailyItem loginName={5063} key={item.id} {...item} />)}
                </div>
                <div className='list_item'>
                    {SortedDate.length >= 1 ? <img className='gradeDiv'
                        src={memberData.filter((item) => item.login_name == '9334')[0] ?
                            getGradeImage(memberData.filter((item) => item.login_name == '9334')[0].rank) : ''} /> : ''}
                    {SortedDate.length >= 1 ? <img className="jjang_son" src={ting} /> : ''}
                    {SortedDate.map((item) => <DailyItem loginName={9334} key={item.id} {...item} />)}
                </div>
            </div>
        </div>
    )
}

export default DailyList;