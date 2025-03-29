import './Header.css'
import { useNavigate } from 'react-router-dom';

const Header = ({ leftChild, rightChild, title }) => {
    const nav = useNavigate();
    return (
        <div>
            <header className='Header'>
                <div className='header_left'>{leftChild}</div>
                <div className='header_center'>{title}</div>
                <div className='header_right'>{rightChild}</div>
            </header>
        </div>
    )
}

export default Header;