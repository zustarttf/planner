import './FreeModal.css'
import free_menu_img from './../assets/free_menu_black_img.svg'
import data_hang_img from './../assets/data_hang_img.svg'
import { useState, useEffect} from 'react';
import { UseModal } from "../hooks/UseAlertModal.jsx";
const FreeModal = ({closeModal, freePlannerData, loginName, onInsertFreePlanData}) => {

    const [selectedValue, setSelectedValue] = useState('카테고리');
    const [options, setOptions] = useState([]);
    const [freePlanData, setFreePlanData] = useState([]);
    const [freePlanCegorMenu, setFreePlanCartegoryMenu] = useState('close');
    const [freePlanContentMenu, setFreePlanContentMenu] = useState('open');
    const [newDiaryContent, setNewDiaryContent] = useState('');
    const [newDiaryCategory, setNewDiaryCategory] = useState('');
    const [modifyAndDeleteButton, setModifyAndDeleteButton] = useState('close');
    const { openAlertModal = false } = UseModal() || {};

    useEffect(() => {
        // 예시 데이터 (label과 value가 동일한 경우)
        setFreePlanData([...freePlannerData]);
    }, [freePlannerData]);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    useEffect(()=>{
        const uniqueCategories = [...new Set(freePlanData.filter((item)=>item.insert_name == loginName).map(item => item.free_category))];
        // console.log('확인', uniqueCategories)
        const fetchedOptions = ['육아', '공부', '운동'];
        const free_plan_data = [
            {content : '다이어리 기능 개발중...', category:'육아'},
            {content : '마음대로 카테고리 만들어서 내용 적으면 된당', category:'공부'},
            {content : '땡큐 베리 감사', category:'운동'},
            {content : '땡큐 베리 감사', category:'운동'},
        ];
        setOptions(uniqueCategories); // 데이터 셋팅
        // console.log(...freePlannerData);
    },[freePlanData])

    const newDiaryContentChange = (e) => {
        let value = e.target.value;

        setNewDiaryContent(value)
    }
    
    const newDiaryCategoryChange = (e) => {
        let value = e.target.value;

        setNewDiaryCategory(value)
    }

    const addFreeCategory = () => {
        setSelectedValue(newDiaryCategory);
        setOptions(prevOptions => [...prevOptions, newDiaryCategory]);
        // console.log(newDiaryCategory);
        setNewDiaryCategory('');

        setFreePlanCartegoryMenu('close');
        setFreePlanContentMenu('open');
        openAlertModal('카테고리가 추가되었습니다. 내용을 작성해주세요')
    }
    
    const deleteFreeCategory = () => {
        // const newOptions = options.filter((item) => item !== selectedValue);
        const removeData= freePlanData.filter((item)=> item.insert_name == loginName && item.free_category != selectedValue)
        setFreePlanData([...removeData]);
        // setOptions(newOptions);
        // setSelectedValue('');
        // setOptions(prevOptions => [...prevOptions, newDiaryCategory]);
    }
    
    const free_complete = () => {
        
        onInsertFreePlanData(freePlanData, loginName);
        openAlertModal('적용되었습니다.');
        
    }
    
    const addFreeContent = () => {
        if(selectedValue == '카테고리'){
            openAlertModal('카테고리를 선택해주세요')
            return;
        }
        const maxId = freePlanData.length > 0 ? Math.max(...freePlanData.map(plan => plan.id)) : 0;

        setFreePlanData([
            ...freePlanData, 
            {
                id: maxId + 1,
                insert_name: loginName,
                free_category: selectedValue,
                free_content : newDiaryContent,
                insert_date: new Date().getTime()
            }
        ])
        setNewDiaryContent('');
    }

    const deleteFreeContent = (id) => {
        const removeData= freePlanData.filter((item)=> item.insert_name == loginName && item.id != id)
        setFreePlanData([...removeData])
    }

    const modifyFreeContent = (id, content) => {
        const removeData= freePlanData.filter((item)=> item.insert_name == loginName && item.id != id)
        setFreePlanData([...removeData])
        setNewDiaryContent(content);
    }   

    return (
        <div className="modal">
        <div className="modal-content modal-enter">
        <span className="close" onClick={closeModal}>&times;</span>
        {/*  헤더 */}
            <div className="free_header">
                <div><img src={free_menu_img}></img></div>
                <div>My 다이어리</div>
                <div>
                    {/* <label htmlFor="select-box">옵션을 선택하세요:</label> */}
                    <select className="select-box" id="select_box" value={selectedValue} onChange={handleChange}>
                        <option value="카테고리">카테고리 선택</option>
                        {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                        ))}
                    </select>
                    {/* <p>선택된 값: {selectedValue}</p> */}
                </div>
                <div className='free-complate-button' onClick={() => free_complete()}><button>적용하기</button></div>
            </div>
            <div className='just_line'></div>
            {/* 데이터삽입 */}
            <div className='free-content-div'>
                <div style={{display:selectedValue=='카테고리' ? 'flex':'none', justifyContent:'center',marginTop:'10px'}}>카테고리를 선택 / 설정에서 생성해주세요</div>
                {
                    freePlanData.filter((item)=>item.insert_name==loginName && item.free_category == selectedValue).map((item, index)=>{
                        return (
                            <div style={{display:selectedValue=='카테고리' ? 'flex':'flex'}} className="free-plan-data-div" key={index}>
                                <div style={{width:'17px'}}><img style={{display:selectedValue=='카테고리' ? 'none':'block'}} src={data_hang_img} alt="" /></div>
                                <div style={{width:'250px', paddingTop:'8px', whiteSpace: 'pre-wrap'}}>{selectedValue == item.free_category ? item.free_content : ''}</div>
                                <div className="free-modify-button-wrapper" style={{width:'55px', display:modifyAndDeleteButton == 'open' ? 'flex':'none'}} onClick={()=>{modifyFreeContent(item.id, item.free_content); setFreePlanCartegoryMenu('close'); setFreePlanContentMenu('open')}}><button>수정</button></div>
                                <div className="free-delete-button-wrapper" style={{width:'55px', display:modifyAndDeleteButton == 'open' ? 'flex':'none'}} onClick={()=>{deleteFreeContent(item.id); setFreePlanCartegoryMenu('close'); setFreePlanContentMenu('open')}}><button>삭제</button></div>
                            </div>
                        )
                    })
                }
            </div>
            {/* 메뉴 버튼 */}
            {/* <div className='just_line_dash'></div> */}
            <div className='new_diary_menu_wrapper'>
                <button onClick={() => {setFreePlanCartegoryMenu(freePlanCegorMenu == 'close'? 'open': 'close'); setFreePlanContentMenu('close');}} className='new_diary_category_button'>설정</button>
                <button onClick={() => {setFreePlanContentMenu(freePlanContentMenu == 'close'? 'open': 'close'); setFreePlanCartegoryMenu('close');}} className='new_diary_content_button'>내용 추가하기</button>
            </div>
            {/* 카테고리 및 내용 추가 */}
            <div className='new_diary_wrapper'>
                <div style={{display: freePlanCegorMenu == 'open' ? 'flex' : 'none'}} className='new_diary_category'>
                    <div><input type="text" name="diary_category" value={newDiaryCategory} onChange={(e) => newDiaryCategoryChange(e)}/></div>
                    <div onClick={()=>addFreeCategory()}><button>카테고리 추가</button></div>
                    <div onClick={()=>deleteFreeCategory()}><button>현재 카테고리 삭제</button></div>
                    <div onClick={()=>setModifyAndDeleteButton(modifyAndDeleteButton == 'open' ? 'close' : 'open')}><button>
                        {modifyAndDeleteButton == 'open' ? '수정 & 삭제 버튼 비활성화' : '수정 & 삭제 버튼 활성화'}</button></div>
                </div>
                <div style={{display: freePlanContentMenu == 'open' ? 'flex' : 'none'}} className='new_diary_content'>
                        <div className="free-add-button-wrapper" onClick={()=>addFreeContent()}><button>내용추가</button></div>
                        <div><textarea name="diary_title" value={newDiaryContent} onChange={(e) => newDiaryContentChange(e)}/></div>
                </div>
                
            </div>
        </div>
    </div>
    )
}

export default FreeModal;