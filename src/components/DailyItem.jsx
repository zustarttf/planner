import './DailyItem.css'
import { getEmotionImage } from "../util/get-emotion-image";
import { useNavigate } from "react-router-dom";

const DailyItem = ({ id, emotionId, createDate, content, confirmName, loginName }) => {
    const nav = useNavigate();

    if (confirmName == '9334' && loginName != '9334') {
        return null;
    } else if (confirmName == '5063' && loginName != '5063') {
        return null;
    } else if (confirmName == '7700' && loginName != '7700') {
        return null;
    }

    const date = new Date(createDate);
    const weekday = date.toLocaleDateString('ko-KR', { weekday: 'short' });
    const formattedDate = date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });

    const currentDate = new Date();
    const currentFormattedDate = currentDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    // 토요일, 일요일일 때 빨간색 글자 스타일을 적용
    const isWeekend = weekday === '토' || weekday === '일';

    return (
        <div className="DiaryItem" style={{ backgroundColor: formattedDate == currentFormattedDate ? '#fffde2' : '' }}>
            <div className={`img_section img_section_${emotionId}`} onClick={() => nav(`/diary/${id}`)}>
                <img src={getEmotionImage(emotionId)} />
            </div>
            <div className="info_section" onClick={() => nav(`/diary/${id}`)}>
                <div className="create_date">
                    <h5>
                        {formattedDate} <span style={{ color: isWeekend ? '#FF8339' : 'black' }}>({weekday})</span>
                    </h5>
                </div>
                <div className="content">{content}</div>
            </div>
        </div>
    );
}

export default DailyItem;
