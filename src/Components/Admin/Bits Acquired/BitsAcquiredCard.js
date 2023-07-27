import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BidsAcquiredTable from './BidsAcquiredTable'
import './BidsAcquiredTable.css'



function BitsAcquiredCard({list,approval,setApproval}) {

    
    console.log("list.product--->",list._id)

    const approvalWaitingList = ["-1","-1","-1"]
    const [buttonChange,setButtonChange] = useState(true)
    const [n, setn] = useState(null)
    const [scheduleButton,setScheduleButton] = useState(false)
    const [approvalWaitingListButton, setApprovalWaitingListButton] = useState([
        {
            "bidderId":"",
            "0":false,
        },
        {
            "bidderId":"",
            "1":false,
        },
        {
            "bidderId":"",
            "2":false,
        }


    ])

    const [editApproval, setEditApproval] = useState(false)

    
    
    // console.log("jhhjj",approvalWaitingListButton)
    // console.log("jhhjj",approvalWaitingList)



    const handleApproveClick = async (details,index) => {
            try {
              const bidderId = details[index].bidderId  
              console.log("*************",bidderId)
          
              details[index].approveToRent = true  
              console.log("detailsAfterApppred--->", details[index])  
              console.log("list.bid", list.bid)  
          
              const response = await axios.post('http://localhost:8000/api/sv/admin/bid/bidsAproved', {
                _id: list._id,
                product: list.product,
                bid: list.bid,
              })  
          
              console.log("patch for detailsAfterApproval---->", response.data)  
          
              const userResponse = await axios.get(`http://localhost:8000/api/sv/user/userDetails/${bidderId}`)  
              console.log("user", userResponse.data)  
          
              const updatedUserApprovedArray = [...userResponse.data.userDetails.approved, {productId:list._id,acceptStatus:true}]  
              console.log("user", updatedUserApprovedArray)  
          
              await axios.patch(`http://localhost:8000/api/sv/user/userDetails/${bidderId}`, {
                approved: updatedUserApprovedArray,
              })  

              console.log("-------------------------------")
          
              await axios.patch(`http://localhost:8000/api/sv/admin/${list._id}`, {
                productAvailability: false,
              })  
          
              console.log('patched')  
              await axios.delete(`http://localhost:8000/api/sv/admin/bid/bidsAcquired/${list._id}`)  
              console.log("hey---------------------")  
              
              setApproval(!approval)  
            } catch (error) {
              console.log(error)  
            }
    }  
          

    const handleEditApproval = ()=>{
        setEditApproval(true)

    }

    const clearApprovalWaitingList = () => {

        setApprovalWaitingListButton  ([
            {
                "bidderId":"",
                "0":false,
            },
            {
                "bidderId":"",
                "1":false,
            },
            {
                "bidderId":"",
                "2":false,
            }
    
    
        ])



    }

    
    console.log("setnhh",n)

    // const bidSection = list.bid.map((x,index)=>(


                
            
    
    // ))

    // console.log("nn",n)


    const handleScheduleCall = ()=> {

        axios.post(`http://localhost:8000/api/sv/admin/bid/schedule/${list._id}`,{
            "userSchedule" : approvalWaitingListButton
        })

        .then(response =>{
            console.log("11111",response.data)
            setScheduleButton(true)
            setApproval(!approval)
        })

        .catch (error=>console.log(error))

        
    }
    const [approveButton,setApproveButton] = useState(true)
    


    const addApprovalWaitingListCall = (arrayIndex,bidderId)=>{
        console.log("first",arrayIndex)


        setApprovalWaitingListButton((prevState) => [
            ...prevState.slice(0, arrayIndex),
            { bidderId, [arrayIndex] : true },
            ...prevState.slice(arrayIndex + 1),
          ])  

        // setApprovalWaitingList([approvalWaitingList[arrayIndex]=bidderId])

        //   setn([...n,arrayIndex])
  
     }




    return (

        
            
                <div style={{display:"flex",flex:"row"}}>
                
                    <div className='div-bids-column-1'>

                            <img src={list.product.productImageUrl} style={{height:"200px",width:"200px"}}/>
                            <p>PRICE : {list.product.productPrice}</p>
                            <p>CAN RENT FOR : {list.product.productAvailableDays} DAYS</p>
                    </div>
                    <div className='div-table'>
                    <table className='table'>
                  
                        

                        <BidsAcquiredTable 
                            list={list}
                            buttonChange={buttonChange}
                            handleApproveClick={handleApproveClick}
                            approvalWaitingListButton={approvalWaitingListButton}
                            // setApprovalWaitingListButton={setApprovalWaitingListButton}
                            addApprovalWaitingListCall={addApprovalWaitingListCall}
                        />
                       

                       
                    </table> 
                    </div>
                    <div>
                        {
                            buttonChange ? 
                            <div>
                                
                                <button>APPROVE</button>
                            </div>
                            :
                            <div>
                                <button onClick={handleScheduleCall} disabled={scheduleButton}>SCHEDULE</button>
                                <button onClick={clearApprovalWaitingList}>CLEAR</button>
                            </div>
                        }

                        {
                            buttonChange ? 
                            <div>
                                change to:
                                <button onClick={()=>setButtonChange(false)}>SCHEDULE</button>
                            </div>
                            
                            :
                            <div>
                                change to:
                                <button onClick={()=>setButtonChange(true)}>APPROVE</button>
                            </div>
                            
                            
                        }
                       
                    </div>
                </div>
                
            
        
        


           





            
        
    )
}

export default BitsAcquiredCard