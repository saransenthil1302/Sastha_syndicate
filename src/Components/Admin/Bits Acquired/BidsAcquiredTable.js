import React from 'react'
import './BidsAcquiredTable.css'
import GenerateButton from './GenerateButton'

function BidsAcquiredTable({list, buttonChange, handleApproveClick, approvalWaitingListButton, addApprovalWaitingListCall}) {

    const n = list.bid.length <= 2 ? list.bid.length : 3

    const approveClick = (index) => {
        handleApproveClick(list.bid, index)
    }

    console.log("first, row", list.bid)

    const rows = list.bid.map((x, index) => (
        <tr key={index}>
            <td>{x.bidderName}</td>
            <td>{x.bidderBiddedAmount}</td>
            <td>{x.bidderRequiredDays}</td>
            <td>{x.fromDate.slice(0, 10)}</td>
            <td>{x.toDate.slice(0, 10)}</td>
            {buttonChange ? (
                <button onClick={() => approveClick(index)}>APPROVE</button>
            ) : (
                <GenerateButton
                    n={n}
                    bidderId={x.bidderId}
                    approvalWaitingListButton={approvalWaitingListButton}
                    addApprovalWaitingListCall={addApprovalWaitingListCall}
                />
            )}
        </tr>
    ))

    return (
        <tbody className='table-body'>
            {rows}
        </tbody>
    )
}

export default BidsAcquiredTable
