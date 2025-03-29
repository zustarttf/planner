const YearModal = ({closeModal, year_black_img, loginNameData, longTermPlanFilterData, smile_img, soso_img}) => {

    return (
        <div className="modal">
        <div className="modal-content modal-enter">
            <span className="close" onClick={closeModal}>&times;</span>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'left', alignItems: 'center', marginLeft: '5px' }}>
                <img src={year_black_img} />
                <p style={{ marginRight: '5px' }}>{loginNameData == '9334' ? '연간 플랜 몰아보기' : '연간 플랜 몰아보기'}</p>
                {/* <div className="yearChangeButton" onClick={() => { loginNameData == '9334' ? setLoginNameData('5063') : setLoginNameData('9334') }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0px', flexDirection: 'row' }}>
                    <div>
                        <img style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} src={friend_change_img}></img>
                    </div>
                </div> */}
            </div>
            <hr />
            {longTermPlanFilterData && longTermPlanFilterData.length > 0 ? (
                longTermPlanFilterData.map((item, index) => {
                    return (
                        <div style={{
                            display: 'flex', gap: '20px', justifyContent: 'space-between', borderBottom: 'solid 1px #ced4da',
                            marginBottom: '2px', alignItems: 'center', justifyItems: 'center', backgroundColor: item.plan_checked ? '#f6e705' : '', borderRadius: '3px', padding: '0px 5px'
                        }} key={index}>
                            <div style={{ whiteSpace: 'nowrap' }}><span >{item.gubun_year}년 {item.gubun_month}월</span></div>
                            <div style={{ wordBreak: 'break-all' }}><span >{item.title}</span></div>
                            <div style={{ whiteSpace: 'nowrap' }}><span >{item.plan_checked ? <img style={{ width: '20px', paddingTop: '4px' }} src={smile_img} /> : <img style={{ width: '20px', paddingTop: '4px' }} src={soso_img} />}</span></div>
                        </div>
                    )
                })
            ) : (
                <p>플랜이 없습니다.</p>
            )}
        </div>
        </div>
    )
}

export default YearModal;