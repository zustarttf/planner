import { getTimeStampDateNoYear } from "../util/get-timstamp-change-noyear";
const HealthModalRecord = ({filterWorkOutData}) => {
    // console.log("filterWorkOutData", filterWorkOutData);
    return (
        <div style={{width:'100%', padding:'5px', marginRight:'10px'}}> 
            <div>
                <span style={{marginLeft:'20px'}}>날짜</span>
                <span style={{marginLeft:'43px'}}>몸무게</span>
                <span style={{marginLeft:'31px'}}>유산소</span>
                <span style={{marginLeft:'26px'}}>무산소</span>
                <span style={{marginLeft:'18px'}}>식사량</span>
            </div>
            {filterWorkOutData && filterWorkOutData.length > 0 ? (
                filterWorkOutData.map((item, index) => {
                    return (
                        <div key={index} style={{ display: 'flex', width: '100%', gap:'25px', alignContent:"center", justifyContent:'center', marginLeft:'5px'}}>
                            <div style={{ display: 'flex', alignContent:'center', justifyContent:'center', flexDirection: 'column' }}>
                                {/* <div>{index == 0 ? '날짜':''}</div> */}
                                <div style={{width:'60px'}}>{getTimeStampDateNoYear(item.insert_date)}</div>
                            </div>
                            <div style={{ display: 'flex', alignContent:'center',justifyContent:'center', flexDirection: 'column' }}>
                                {/* <div>{index == 0 ? '몸무게':''}</div> */}
                                <div style={{width:'30px'}}>{item.weight == 0 ? <>&nbsp;-</> : item.weight}</div>
                            </div>
                            <div style={{ display: 'flex', alignContent:'center',justifyContent:'center', flexDirection: 'column' }}>
                                {/* <div>{index == 0 ? '유산소':''}</div> */}
                                <div style={{width:'30px'}}>{item.yes_oxygen_hour}:{item.yes_oxygen_minute}</div>
                            </div>
                            <div style={{ display: 'flex', alignContent:'center',justifyContent:'center', flexDirection: 'column' }}>
                                {/* <div>{index == 0 ? '무산소':''}</div> */}
                                <div style={{width:'30px'}}>{item.no_oxygen_hour}:{item.no_oxygen_minute}</div>
                            </div>
                            {/* 식사량 */}
                            <div style={{ display: 'flex', alignContent:'center',justifyContent:'center', flexDirection: 'column' }}>
                                {/* <div>{index == 0 ? '무산소':''}</div> */}
                                <div style={{width:'30px'}}>{item.rice}</div>
                            </div>
                        </div>
                    )
                })
            ) : (
                <div style={{marginLeft:'100px', marginTop:'50px'}}>운동 기록이 없습니다.</div>
            )}
        </div>
    )
}

export default HealthModalRecord