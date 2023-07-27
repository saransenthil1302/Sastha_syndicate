import axios from 'axios'
import React, { useEffect, useState } from 'react'
import RentedCard from './RentedCard'
// import RentedCard from './RentedCard'

function RentedProducts() {

  const [rented, setRented] = useState([])
  const [approval, setApproval] = useState(false)

  useEffect(() => {

    axios.get('http://localhost:8000/api/sv/admin/bid/rentedProduct')
    .then((response)=>{
  
      setRented(response.data.rentedProduct)
      
    })
    .catch((error)=>console.log("rented get error--->",error))
   
  }, [approval])

  console.log(rented)



  

  
  return (
    <div>
      
    rented

      {rented?.map((list,index)=>
        <RentedCard 
          list={list}
          index={index}
          approval={approval}
          setApproval={setApproval}  
        />
      )}



    </div>
  )
}

export default RentedProducts