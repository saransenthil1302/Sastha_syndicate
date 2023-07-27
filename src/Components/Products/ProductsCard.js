import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



function ProductsCard({items,index,checkWishList}) {
  
  const [open, setOpen] = useState({"id":""})
  const [days, setDays] = useState("")
  const [amount, setAmount] = useState("")
  const [fromDate, setFromDate] = useState("")

  const checkIfAddToWishList = checkWishList?.some((x) => x.productId === items._id);


  console.log(checkIfAddToWishList)

  
  const [wishListButton,setWishListButton] = useState(checkIfAddToWishList)

  // console.log("jjjjjj->",checkWishList)

  // const wishListButtonType  = checkWishList.find((x)=>x.productId===items._id)

  // console.log('number find---->',wishListButtonType)


  const navigate = useNavigate()

  
  const minDate = new Date().toISOString().slice(0, 10);
  const maxDate = new Date(Date.now() + (180 * 24 * 60 * 60 * 1000)).toISOString().slice(0,10);

  // console.log(minDate)
  // console.log("max",)






  const openbidModal= () => {

    localStorage.getItem('jwt') ? 
      setOpen({"id":items._id})
      :
      navigate('/login')
  
  }





  
  // console.log('jwt---->',localStorage.getItem("jwt"))
  const bidsubmitData = ()=>{

    const fromDateChangeFormat = new Date(fromDate)
    const toDate = new Date(fromDateChangeFormat.getTime() + (days * 24 * 60 * 60 * 1000)).toISOString().slice(0,10);
    const userId = localStorage.getItem("userId")
    const userDetails = JSON.parse(localStorage.getItem("userDetails"))

    // console.log("--------------",userDetails[userName])
    const newBid = {
      "bidderId":userId,
      "bidderName":userDetails.userName,
      "bidderPhoneNo":userDetails.phoneNo,
      "bidderBiddedAmount":amount,
      "bidderRequiredDays":days,
      "fromDate":fromDate,
      "toDate": toDate,
      "approveToRent":false
    }

    console.log("newBid--->",newBid)


    axios.get(`http://localhost:8000/api/sv/admin/bid/bidsAcquired/${items._id}`)

    .then(async(x)=>{

        const newData = [...x.data.bidsAcquired.bid,newBid]
        console.log(x.data.bidsAcquired)

        console.log("add",newData)
        

        await axios.patch(`http://localhost:8000/api/sv/admin/bid/bidsAcquired/${items._id}`,{
            "bid":newData
        })

        .then((y)=>setOpen({"id":""}))

        .catch(error=>console.log("patch",error))
      
    })

    .catch( error => {

        axios.post('http://localhost:8000/api/sv/admin/bid/bidsAcquired',{

            "_id":items._id,
            "product":{
              "productPrice":parseInt(items.productPrice),
              "productAvailableDays":parseInt(items.productAvailableDays),
              "productImageUrl":items.productImageUrl
            },
            "bid":[newBid]

        })

        .then((y)=>setOpen({"id":""}))

        .catch(error=>console.log("post",error))
      

    })

  }




  const bidsubmitCall = () =>{
    days<=items.productAvailableDays && amount>=items.productPrice ? 
    
        bidsubmitData()
      
      :
       console.log('false')

  }


  const addToWishList = () => {
    var arr = JSON.parse(localStorage.getItem('wishList') || '[]');
    if (!Array.isArray(arr)) {
      arr = [];
    }
    const newItem = { productId: items._id, subscribe: false };
    arr.push(newItem);
  
    localStorage.setItem('wishList', JSON.stringify(arr));
  
    const userId = localStorage.getItem('userId');
    axios
      .patch(`http://localhost:8000/api/sv/user/userDetails/${userId}`, {
        wishList: JSON.parse(localStorage.getItem('wishList')),
      })
      .then(response => {
        setWishListButton(true)
      })
      .catch(error => console.log(error));
  };
  



  return (
    <div>

        <img src={items.productImageUrl} style={{height:"200px",width:'200px'}}/>
        <p>name:{items.productName}</p>
        <p>price:{items.productPrice}</p>
        <p>available days:{items.productAvailableDays}</p>
        <button onClick={openbidModal}>BID</button>

        {!wishListButton ? 
            <button onClick={addToWishList}>WISH LIST</button>
             :
            ""
        } 



        {open.id===items._id ? 
          <div>
              days : <input type='text' value={days} onChange={(e)=>setDays(e.target.value)}/>
              from : <input type='date' value={fromDate} min={minDate} max={maxDate} onChange={(e)=>setFromDate(e.target.value)}/>
              amount : <input type='text' value={amount} onChange={(e)=>setAmount(e.target.value)}/>
              <button onClick={bidsubmitCall}>SUBMIT</button>
          </div>
        
          :
          ""
        }


    </div>
  )
}

export default ProductsCard