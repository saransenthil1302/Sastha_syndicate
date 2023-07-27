import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BitsAcquiredCard from './BitsAcquiredCard'

function BitsAcquired() {

  const [bitsAcquired, setBitsAcquired] = useState([])
  const [approval, setApproval] = useState(false)


  useEffect(() => {

    axios.get('http://localhost:8000/api/sv/admin/bid/bidsAcquired')
    .then((response)=>{
      setBitsAcquired(response.data.bidsAcquired)
      console.log("111",response.data.bidsAcquired)
    })
    .catch((error)=>console.log("bitsAcquired get error--->",error))
   
  }, [approval])



  

  
  return (
    <div>
      BitsAcquired


      {bitsAcquired?.map((list)=><BitsAcquiredCard list={list} approval={approval} setApproval={setApproval}/>)}



    </div>
  )
}

export default BitsAcquired