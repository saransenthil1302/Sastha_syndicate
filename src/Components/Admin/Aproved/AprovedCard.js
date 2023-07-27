import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AprovedBidTable from './AprovedBidTable'



function AprovedCard({list,approval,setApproval}) {

    
    console.log("list.product--->",list.bid)

    const [flagYesNo, setFlagYesNo] = useState(false)
    const [editApproval, setEditApproval] = useState(false)
    const [rentApproval, setRentApproval] = useState(false)

    const [makeChange,setMakeChange] = useState({
        "flag":false,
        "previousDetails":{},
        "currentDetails":{},
        "previousIndex":"",
        "currentIndex":""
    },[approval])

    const [rentedDate,setRentedDate]=useState({
        rentedFromDate:"",
        rentedToDate:""
    }) 

    console.log("makeChange-------",makeChange)

    const minDate = new Date().toISOString().slice(0, 10) 
    const requiredDays = parseInt(makeChange.previousDetails.bidderRequiredDays) || parseInt(list.product.productAvailableDays)
    console.log('ppdddpp,0',typeof(requiredDays))
    const maxDate = new Date(Date.now() + ( requiredDays * 24 * 60 * 60 * 1000)).toISOString().slice(0,10) 


    useEffect(() => {

        
        list.bid.map((x,index)=>{
            if(x.approveToRent)
            setMakeChange({...makeChange,"previousDetails":x,"previousIndex":index})
            
        })
        
    }, [])
    
    const handleApproveClick = async(details,index) =>{
        setFlagYesNo(true)
        setMakeChange({...makeChange,"currentIndex":index,"currentDetails":details,"flag":true})
    }

    const handleNoClick = ()=>{
        setFlagYesNo(false)
        
    }
    const handleRentedDatesCall = (event)=>{
        const name = event.target.name
        const value = event.target.value

        setRentedDate({
            ...rentedDate,
            [name]:value
        })

        console.log(rentedDate)
    }



    const handleYesClick = async () => {

        try {

          console.log(makeChange) 
      
          list.bid[makeChange.previousIndex].approveToRent = false 
          list.bid[makeChange.currentIndex].approveToRent = true 

          console.log("listAfterApproval--->", list.bid) 
      
          await axios.patch(`http://localhost:8000/api/sv/admin/bid/bidsAproved/${list._id}`, {
            bid: list.bid,
          }) 
      
        //   console.log("patch for --->", response.data.bid) 
      
          const previousUserID = makeChange.previousDetails.bidderId 

          const previousUserResponse = await axios.get(`http://localhost:8000/api/sv/user/userDetails/${previousUserID}`) 
          
          const userPreviousBitsAcquires = [...previousUserResponse.data.userDetails.approved] 
          const deleteIndex = userPreviousBitsAcquires.findIndex((bitsAcquired) => bitsAcquired === list._id) 
          userPreviousBitsAcquires.splice(deleteIndex, 1) 
      
          await axios.patch(`http://localhost:8000/api/sv/user/userDetails/${previousUserID}`, {
            approved: userPreviousBitsAcquires,
          }) 
      
          const currentUserID = makeChange.currentDetails.bidderId 

          const currentUserResponse = await axios.get(`http://localhost:8000/api/sv/user/userDetails/${currentUserID}`) 
          const updatedNewUserBidsAcquired = [
            ...currentUserResponse.data.userDetails.approved,
            { productId: list._id, acceptStatus: true },
          ] 
      
          await axios.patch(`http://localhost:8000/api/sv/user/userDetails/${currentUserID}`, {
            approved: updatedNewUserBidsAcquired,
          }) 
      
          setApproval(true) 
          setEditApproval(false) 
          setFlagYesNo(false) 
          setMakeChange({
            ...makeChange,
            previousDetails: makeChange.currentDetails,
            previousIndex: makeChange.currentIndex,
            currentDetails: {},
            currentIndex: "",
          }) 
          console.log(makeChange) 

        } catch (error) {

          console.log(error) 

        }
      } 
      

      const handleDeclineClick = async () => {

        try {

          list.bid[makeChange.previousIndex].approveToRent = false 
      
          await axios.post('http://localhost:8000/api/sv/admin/bid/bidsAcquired', {
            _id: list._id,
            product: list.product,
            bid: list.bid,
          }) 
      
          const userID = makeChange.previousDetails.bidderId 

          const userResponse = await axios.get(`http://localhost:8000/api/sv/user/userDetails/${userID}`) 

          const userPreviousBitsAcquires = [...userResponse.data.userDetails.approved] 
          const deleteIndex = userPreviousBitsAcquires.findIndex((bitsAcquired) => bitsAcquired.productId === list._id) 
          userPreviousBitsAcquires.splice(deleteIndex, 1) 
      
          await axios.patch(`http://localhost:8000/api/sv/user/userDetails/${userID}`, {
            approved: userPreviousBitsAcquires,
          }) 
      
          const changeAvailability = await axios.patch(`http://localhost:8000/api/sv/admin/${list._id}`, {
            productAvailability: true,
          }) 
      
          const deleteFromUserApproved = await axios.delete(`http://localhost:8000/api/sv/admin/bid/bidsAproved/${list._id}`) 
      
          setApproval(!approval) 
          console.log("first--------------------------") 

        } 
        catch (error) {

          console.log(error) 

        }
      } 
      

    const handleEditClick = ()=>{
        setEditApproval(true)
    }

    const handleCancelClick = ()=>{
        setRentApproval(false)
        setEditApproval(false)
    }

    const handleRentClick = ()=>{
        setRentApproval(true)
    }

    const handleRentItClick = ()=> {

        console.log("aaaaaaa",rentedDate, "fromRented",rentedDate.rentedFromDate,"toRented",rentedDate.rentedToDate)

        const userId = makeChange.previousDetails.bidderId

        axios.post('http://localhost:8000/api/sv/admin/bid/rentedProduct',{

            "_id":list._id,
            "product":list.product,       
            "bid":list.bid,
            "rentedTo":makeChange.previousDetails,
            "fromRented":rentedDate.rentedFromDate,
            "toRented":rentedDate.rentedToDate
           
        })
        .then((response)=>{

            console.log('rrr',response.data)
            
            axios.delete(`http://localhost:8000/api/sv/admin/bid/bidsAproved/${list._id}`)

            .then((response)=>{
                    setApproval(!approval)
            })
    
            .catch(error=>console.log(error))

        })
        
        .catch(error=>console.log(error))

    }
                       

    



    

    
   


    return (
     
                <div style={{display:"flex",flex:"row",justifyContent:'space-around'}}>
                    
                    <div>
                        <img src={list.product.productImageUrl} style={{height:"200px",width:"200px"}}/>
                        <p>PRICE : {list.product.productPrice}</p>
                        <p>CAN RENT FOR : {list.product.productAvailableDays}</p>

                    </div>

                    <table>
                      <tbody>
                        {
                            list.bid.map((row,index)=>
                                <AprovedBidTable 
                                    list={row}
                                    makeChange={makeChange} 
                                    approval={list.approval}
                                    setMakeChange={setMakeChange}
                                    editApproval={editApproval} 
                                    handleApproveClick={handleApproveClick} 
                                    index={index}
                                />
                            )
                        }
                      </tbody>
                    </table>

                    {editApproval ?
                        <div>
                            <button  onClick={handleCancelClick} style={{height:'20px'}}>CANCEL</button>
                            {flagYesNo ?
                                <div>
                                    <p>ARE YOU WANT TO MAKE CHANGE?</p>
                                    <button onClick={handleYesClick}>Yes</button>
                                    <button onClick={handleNoClick}>No</button>
                                </div> 
                                :
                                ""
                            }
                            
                        </div>

                        : rentApproval ?

                        <div>

                            <div>
                            <p>Rent to : {makeChange.previousDetails.bidderName}</p>
                            <p>Rent for : {makeChange.previousDetails.bidderRequiredDays} days</p>
                            <p>From : <input type='date' name='rentedFromDate' value={rentedDate.rentedFromDate} onChange={handleRentedDatesCall}  min={minDate} max={maxDate}/> days</p>
                            <p>To : <input type='date' name='rentedToDate' value={rentedDate.rentedToDate} onChange={handleRentedDatesCall} min={minDate} max={maxDate}/> days</p>
                            <button  onClick={handleRentItClick} style={{height:'20px'}}>RENT IT</button>
                            <button  onClick={handleCancelClick} style={{height:'20px'}}>CANCEL</button>
                            


                            </div>


                            

                        </div>
                        :
                        <div>
                            <button  onClick={handleRentClick} style={{height:'20px'}}>RENT</button>
                            <button  onClick={handleEditClick} style={{height:'20px'}}>EDIT</button>
                            <button  onClick={handleDeclineClick} style={{height:'20px'}}>DECLINE</button>
                        </div>
                    }

                </div>
            
        
    )
}

export default AprovedCard