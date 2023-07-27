import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AprovalMessage = ({approved,approvedItem,index,render,setRender}) => {
  console.log("first",approved[index].acceptStatus)

    const[product,setProduct]=useState({})

    useEffect(()=>{

        const productId = approvedItem.productId

        axios.get(`http://localhost:8000/api/sv/admin/${productId}`)

        .then((res)=>{
            console.log(res.data.products)
            setProduct(res.data.products)}
        )
        .catch(error=>console.log(error))
    },[])

    console.log("444",approvedItem)
    

    const handleAcceptOrDeclineClick = (AcceptOrDecline) => {




        const userId = localStorage.getItem('userId')

        approved[index].acceptStatus = AcceptOrDecline

       console.log("after edited",approved)

        axios.patch(`http://localhost:8000/api/sv/user/userDetails/${userId}`,{
          "approved":approved
        })
        .then((response)=>{
          console.log(response.data.userDetails)
          // setRender(!render)



        })

        .catch(error=>console.log(error))

      
    }




    return (
      <div>

          <img src={product.productImageUrl} style={{height:"200px",width:'200px'}}/>
          <p>name:{product.productName}</p>
          <p>price:{product.productPrice}</p>
          <p>available days:{product.productAvailableDays}</p>
          {
            approved[index].acceptStatus
            
              ? <p>ACCEPTED</p>
              : <div>
                    <button onClick={()=>handleAcceptOrDeclineClick(true)}>Accept</button>
                    <button onClick={()=>handleAcceptOrDeclineClick(false)}>Decline</button>
                </div>
          }
          
          
      </div>
    )
}

export default AprovalMessage