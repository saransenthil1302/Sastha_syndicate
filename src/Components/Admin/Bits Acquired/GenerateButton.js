import React from 'react'

function GenerateButton({n,bidderId,approvalWaitingListButton,addApprovalWaitingListCall}) {

    let buttons = []

    let userDisable = false
    let arr=[]
    let ind = -1

    approvalWaitingListButton.map((x,index)=>{
        if(x.bidderId===bidderId)
        {
            userDisable=true
            ind=index

        }
    })

    

    for(let i=0 ;i<n ; i++) {

        // let numberDisable = false

        // if(n && n.includes(i))
        // numberDisable = true

        buttons.push(
            <button 
                className='BitsAcquiredButton'
                key={i} 
                style={{backgroundColor : ind === i ? "green" : "none"}} 
                onClick={()=>addApprovalWaitingListCall(i,bidderId)} 
                disabled={userDisable}
            >{i+1}</button>
        )
    }
    // console.log("ffffh",bidListLength,arr)
    return <div>{buttons}</div>  

 
}

export default GenerateButton