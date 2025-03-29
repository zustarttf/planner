import './ToggleButton.css'

const ToggleButton = ({ isChecked, onToggle }) => {
    return (
        <div className={`toggle-container ${isChecked ? 'checked' : ''}`} onClick={onToggle}>
            <div className={`toggle-circle ${isChecked ? 'checked' : ''}`} />
        </div>
    );
};

export default ToggleButton;
