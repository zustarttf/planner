import './Button.css'
import delete_img from './../assets/delete_img.png'

const Button = ({ text, type, onClick }) => {
    if (text == '삭제하기') {
        return <button onClick={onClick} className={`Button_Component Button Button_${type}`}><img src={delete_img}></img></button>
    } else {
        return <button style={{color:'#007aff'}} onClick={onClick} className={`Button Button_${type}`}>{text}</button>
    }
}

export default Button