import './EmotionItem.css'
import { getEmotionImage } from '../util/get-emotion-image'
const EmotionItem = ({ emotionId, onClick, isSelected, componentType }) => {
    if (componentType == 'Viewer' && !isSelected) {
        return;
    }
    return (
        <div onClick={onClick} className={`EmotionItem ${isSelected ? `EmotionItem_on_${emotionId}` : ""}`}>
            <img className="emotion_img" src={getEmotionImage(emotionId)} />
        </div>
    )
}
export default EmotionItem