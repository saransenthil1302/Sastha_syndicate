import React, { useEffect } from 'react'

function AprovedBidTable({list,makeChange,setMakeChange,approval,editApproval,handleApproveClick,index}) {

    
    

    return (
        <tr>
            <td>{list.bidderName}</td>
            <td>{list.bidderBiddedAmount}</td>
            <td>{list.bidderRequiredDays}</td>
            <td>{list.fromDate}</td>
            <td>
                {
                    editApproval 
                    
                    ? <button onClick={()=>handleApproveClick(list,index)}>APPROVE</button>
                    :
                        <div>
                            {list.approveToRent ? 
                                <p style={{color:"green",fontWeight:"bold"}}>APPROVED</p>
                                :
                                <button  disabled={!list.approveToRent}>APPROVE</button>
                            }
                        </div>
                }
            </td>
        </tr>
    )
}

export default AprovedBidTable