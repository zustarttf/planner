// Modal.js
import React, { createContext, useContext, useState } from 'react';
import './useAlertModal.css';
import alert_black_img from './../assets/alert_black_img.svg'
import alert_blue_img from './../assets/alert_blue_img.svg'
import alert_orange_img from './../assets/alert_orange_img.svg'
import { useEffect, useCallback } from 'react';
// ModalContext를 생성하여 모달 상태를 관리합니다.
const ModalContext = createContext();

// useModal 훅을 통해 ModalContext에 쉽게 접근할 수 있게 합니다.
export const UseModal = () => useContext(ModalContext);

// ModalProvider 컴포넌트는 애플리케이션의 최상위에서 모달 상태를 관리합니다. 38
const UseAlertModal = ({ children }) => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');

    // 모달을 여는 함수
    const openAlertModal = (msg) => {
        setMessageAlert(msg); // 메시지 설정
        setIsAlertOpen(true);  // 모달 열기
    };

    // 모달을 닫는 함수
    const closeAlertModal = () => {
        setIsAlertOpen(false); // 모달 닫기
        setMessageAlert('');    // 메시지 초기화
    };



    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
        }
    }, []);

    useEffect(() => {
        if (isAlertOpen) {
            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.removeEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isAlertOpen, handleKeyDown]);

    return (
        <ModalContext.Provider value={{ isAlertOpen, messageAlert, openAlertModal, closeAlertModal }}>
            {children}
            {isAlertOpen && (
                <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <div className="modal-alert-overlay">
                    <div className="modal-alert-content">
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'7px'}}>
                            <img src={alert_orange_img} alt="" />
                            <img src={alert_blue_img} alt="" />
                            <img src={alert_black_img} alt="" />
                        </div>
                        <p>{messageAlert}</p>
                        <button onClick={closeAlertModal} className="modal-alert-button">
                            확인
                        </button>
                    </div>
                </div>
                </div>
            )}
        </ModalContext.Provider>
    );
};

export default UseAlertModal;
