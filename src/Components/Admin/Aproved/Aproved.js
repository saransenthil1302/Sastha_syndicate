import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import RentedCard from './RentedCard'
import AprovedCard from './AprovedCard'

function AprovedBids() {

  const [rented, setRented] = useState([])
  const [approval, setApproval] = useState(false)

  useEffect(() => {

    axios.get('http://localhost:8000/api/sv/admin/bid/bidsAproved')
    .then((response)=>{
  
      setRented(response.data.bidsAproved)
      
    })
    .catch((error)=>console.log("rented get error--->",error))
   
  }, [approval])

  console.log(rented)



  

  
  return (
    <div>
      
    Approved

      {rented?.map((list,index)=>
        <AprovedCard 
          list={list}
          index={index}
          approval={approval}
          setApproval={setApproval}  
        />
      )}



    </div>
  )
}

export default AprovedBids