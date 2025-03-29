import './App.css'

// Hook
import { useReducer, useRef, createContext, useState, useEffect } from 'react';

// Component
import Home from './pages/Home.jsx'
import NewDaily from './pages/NewDaily.jsx';
import Edit from './pages/Edit.jsx';
import Diary from './pages/Diary.jsx';
import Notfound from './pages/Notfound.jsx';
import NewYear from './pages/NewYear.jsx';
import NewYearDiary from './pages/NewYearDiary.jsx';
import { Routes, Route, useNavigate } from "react-router-dom";
import ScrollToTop from './util/ScrollToTop.jsx';
import MainHeader from './components/MainHeader.jsx';
import MainFooter from './components/MainFooter.jsx';
import UseAlertModal from './hooks/UseAlertModal.jsx';

// useEffect_func
import useGetPlannerData from './app_js/useEffect_func/useGetPlannerData.js';
import useGetMemberData from './app_js/useEffect_func/useGetMemberData.js';
import useGetYearPlanData from './app_js/useEffect_func/useGetYearPlanData.js';
import useGetWorkOutData from './app_js/useEffect_func/useGetWorkOutData.js';
import useLankPlanData from './app_js/useEffect_func/useLankPlanData.js';
import useGetEventLogData from './app_js/useEffect_func/useGetEventLogData.js';
import useFreePlanData from './app_js/useEffect_func/useFreePlanData.js';

// dispatch_func
import DiaryDispatchFunc from './app_js/dispatch_func/DiaryDispatchFunc.js';
import LongTermDispatchFunc from './app_js/dispatch_func/LongTermDispatchFunc.js';
import YearPlanMemoFunc from './app_js/dispatch_func/YearPlanMemoFunc.js';
import MemberDispatchFunc from './app_js/dispatch_func/MemberDispatchFunc.js';
import WorkOutDispatchFunc from './app_js/dispatch_func/WorkOutDispatchFunc.js';
import EventLogDispatchFunc from './app_js/dispatch_func/EventLogDispatchFunc.js';
import LankPlanDispatchFunc from './app_js/dispatch_func/LankPlanDispatchFunc.js';
import FreePlannerDispatchFunc from './app_js/dispatch_func/FreePlannerDispatchFunc.js';

import { url, login_gubun } from './app_js/urlConfig.js';

// reducer_func
import { reducer } from './app_js/reducer_func/plannerReducerFunc.js'
import { yearPlanMemoReducer } from './app_js/reducer_func/yearPlanMemoReducerFunc.js'
import { longTermPlanReducer } from './app_js/reducer_func/longTermPlanReducerFunc.js'
import { memberReducer } from './app_js/reducer_func/memberReucerFunc.js'
import { wokOutReducer } from './app_js/reducer_func/workOutReducerFunc.js'
import { eventLogReducer } from './app_js/reducer_func/eventLogReducerFunc.js'
import { lankPlanReducer } from './app_js/reducer_func/lankPlanReducerFunc.js'
import { freePlannerDataReducer } from './app_js/reducer_func/freePlannerDataReducerFunc.js'

// 플래너 리스트 컨텍스트 내보내기
export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

// 멤버 리스트 컨텍스트 내보내기
export const MemberStateContext = createContext();
export const MemberDispatchContext = createContext();

function App() {
  // 레듀서 전역 상태 관리
  const [data, dispatch] = useReducer(reducer, []); // 일일 플래너 정보
  const [memberData, memberDispatch] = useReducer(memberReducer, []); // 멤버 정보
  const [longTermPlanData, longTermPlanDispatch] = useReducer(longTermPlanReducer, []); // 연간 플래너 정보
  const [yearPlanMemoData, yearPlanMemoDispatch] = useReducer(yearPlanMemoReducer, []); // 연간 플래너 메모
  const [workOutData, workOutDispatch] = useReducer(wokOutReducer, []); // 운동 대결 정보
  const [eventLogData, eventLogDispatch] = useReducer(eventLogReducer, []); // 이벤트 로그 정보
  const [lankPlanData, lankPlanDispatch] = useReducer(lankPlanReducer, []); // 우선순위 플랜 정보
  const [freePlannerData, freePlannerDataDispatch] = useReducer(freePlannerDataReducer, []); // 우선순위 플랜 정보
  

  const [isLoding, setIsLoading] = useState(true); // 데이터 로딩 체크
  const [confirmName, setConfirmName] = useState(true);
  let todayDateRef = useRef(''); // 현재 년-월-일
  const idRef = useRef(0); // 게시물 count

  // useEffect_func 값 세팅
  useGetPlannerData({ dispatch, todayDateRef, confirmName, login_gubun, idRef, url, setIsLoading, setConfirmName });
  useGetMemberData({ setIsLoading, memberDispatch, confirmName, url });
  useGetYearPlanData({ setIsLoading, longTermPlanDispatch, yearPlanMemoDispatch, confirmName, url });
  useGetWorkOutData({ setIsLoading, workOutDispatch, confirmName, url });
  useGetEventLogData({ setIsLoading, eventLogDispatch, confirmName, url });
  useLankPlanData({ setIsLoading, lankPlanDispatch, confirmName, url });
  useFreePlanData({ setIsLoading, freePlannerDataDispatch, confirmName, url });

  // dispatch_func 값 세팅
  const { onCreate, onUpdate, onDelete } = DiaryDispatchFunc({ dispatch, idRef, confirmName });
  const { onInsertLontermData, onRemoveLontermData, onUpdateLontermData, onUpdateCheckLongtermData } = LongTermDispatchFunc({ longTermPlanDispatch, idRef, confirmName });
  const { onUpdateYearPlanMemo } = YearPlanMemoFunc({ yearPlanMemoDispatch, idRef, confirmName });
  const { onMemberInsert, onlyMemberUpdate } = MemberDispatchFunc({ memberDispatch, idRef, confirmName });
  const { onUpdateWorkOut } = WorkOutDispatchFunc({ workOutDispatch, idRef, confirmName });
  const { onInsertEventLogData } = EventLogDispatchFunc({ eventLogDispatch, idRef, confirmName });
  const { onInsertLankPlanData } = LankPlanDispatchFunc({ lankPlanDispatch, idRef, confirmName });
  const { onInsertFreePlanData } = FreePlannerDispatchFunc({ freePlannerDataDispatch, idRef, confirmName });

  if (isLoding) {
    return (
      <>
        <div>데이터 로딩 중...</div>
        {/* <div style={{fontSize:"50px", marginTop:'80px'}}>서버 점검중입니당 ㅠㅠㅠㅠ 최대 18시까지 완료 예정임당</div> */}
        {/* <img src={error_img} style={{width:'300px', height:'300px'}}alt="" /> */}
      </>
    )
  }

  return (
    <>
      <UseAlertModal>
        <MainHeader loginName={confirmName}/>
        <DiaryStateContext.Provider value={{ data, longTermPlanData, yearPlanMemoData, lankPlanData, freePlannerData }}>{/* 플래너 데이터 전역 관리*/}
          <MemberStateContext.Provider value={{ memberData, workOutData, eventLogData }}>{/* 멤버 데이터 전역 관리*/}
            <DiaryDispatchContext.Provider value={{/* 플래너 함수 전역 관리*/
              onCreate, onUpdate, onDelete, onInsertLontermData, onRemoveLontermData, 
              onUpdateLontermData, onUpdateCheckLongtermData, onUpdateYearPlanMemo, onInsertLankPlanData,
              onInsertFreePlanData
            }}>
              <MemberDispatchContext.Provider value={{/* 멤버 함수 전역 관리*/
                onMemberInsert, onlyMemberUpdate, onUpdateWorkOut, onInsertEventLogData
              }}>
                <ScrollToTop /> {/* 라우터 전환 시 스크롤 맨 위 고정*/}
                <Routes>
                  <Route path='/' element={<Home loginName={confirmName} />}></Route>
                  <Route path='/newDaily' element={<NewDaily todayDate={todayDateRef.current} loginName={confirmName} />}></Route>
                  <Route path='/newYearEdit' element={<NewYear todayDate={todayDateRef.current} loginName={confirmName} />}></Route>
                  <Route path='/newYearDiary' element={<NewYearDiary todayDate={todayDateRef.current} loginName={confirmName} />}></Route>
                  <Route path='/edit/:id' element={<Edit />}></Route>
                  <Route path='/diary/:id' element={<Diary loginName={confirmName} />}></Route>
                  <Route path='*' element={<Notfound />}></Route>
                </Routes>
              </MemberDispatchContext.Provider>
            </DiaryDispatchContext.Provider>
          </MemberStateContext.Provider>
        </DiaryStateContext.Provider>
        <MainFooter />
      </UseAlertModal>
    </>
  )
}
export default App
