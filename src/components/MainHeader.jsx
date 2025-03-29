import './MainHeader.css';
import home_img from './../assets/home_img.svg';
import korea_img from './../assets/korea_img.svg';
import refresh_img from './../assets/refresh_img.svg';
import { useNavigate } from 'react-router-dom';
import { windowUrl } from './../app_js/urlConfig';
import { UseModal } from "../hooks/UseAlertModal.jsx";

const MainHeader = ({loginName}) => {
    const { openAlertModal = false } = UseModal() || {};

    const letter = () => {
        openAlertModal('부엉이는 지혜와 통찰력의 상징으로\n플래너로 미래를 예측하고 준비한다는 의미');
    }

    const nav = useNavigate();
    return (
        <>
            <div className='app_main_class'>
                <div className='app_main_class_1'>
                    <img className="home_class" src={home_img} alt="" onClick={() => nav("/", { replace: true })} />
                </div>
                <div className='app_main_class_2' onClick={() => nav("/", { replace: true })} >
                    {/* <img onClick={() => letter()} src={korea_img}></img>*/}
                    <span style={{ letterSpacing: '0.06em' }}>{loginName=='5063'?'JS 플래너':'TK 플래너'}</span> 
                </div>
                <div className='app_main_class_3'>
                    <img className="refresh_class" src={refresh_img} alt="" onClick={() => { window.location.href = windowUrl }} />
                </div>
            </div>
        </>
    )
}

export default MainHeader;