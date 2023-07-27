import axios from 'axios'
import React, { useEffect, useState } from 'react'

function WishList() {

    const userId = localStorage.getItem('userId')  
    
    const wishList = JSON.parse(localStorage.getItem('wishList'))
    

    const [items, setItems] = useState()
    const [render,setRender] = useState(true)
    // console.log("wishlist--->",wishList[0].productId)
    

    useEffect(()=>{
        const userId = localStorage.getItem('userId')

        Promise.all(wishList.map((x) => 
            axios.get(`http://localhost:8000/api/sv/admin/${x.productId}`)
            .then(response => response.data.products)
            .catch(error => console.log(error))
        ))
        .then(response => {
            setItems(response)
            console.log(response)
            
        })
        .catch(error => console.log(error))
    }, [render])
    console.log(wishList)


    const subscribeButtonCall = async (index) => {

        const productId =  wishList[index].productId;
        console.log("first,index",index)

        try {
            console.log("first",productId,index)
          wishList[index].subscribe = true;
          localStorage.setItem('wishList', JSON.stringify(wishList));
      
          await axios.patch(`http://localhost:8000/api/sv/user/userDetails/${userId}`, {
            wishList: wishList,
          });

          const arr = []
          arr.push(userId)
          console.log("44444",arr)
      
          const response = await axios.post(`http://localhost:8000/api/sv/wishList`, {
            _id: productId,
            subscribedUsers: arr
          });
      
          console.log('New List new subscriber', response.data);
          setRender(!render);
        } catch (error) {
          try {
            console.log('Second part', productId);
            const response = await axios.get(`http://localhost:8000/api/sv/wishList/${productId}`);
            const updatedSubscribedUsers = [...response.data.details.subscribedUsers, userId];

            console.log(updatedSubscribedUsers)
      
            await axios.patch(`http://localhost:8000/api/sv/wishList/${productId}`, {
              subscribedUsers: updatedSubscribedUsers,
            });
      
            console.log('Response added', response.data);
            setRender(!render);
          } catch (error) {
            console.log(error);
          }
        }
      };
      

    const unSubscribeButtonCall = async(index) => {

        const productId =  wishList[index].productId;
        console.log("first,index",index)


        wishList[index].subscribe=false

        localStorage.setItem("wishList",JSON.stringify(wishList))
    
        axios.get(`http://localhost:8000/api/sv/wishList/${productId}`)
        .then(response=>{

            const updatedSubscribedUsers = [...response.data.details.subscribedUsers]
            const deleteIndex = updatedSubscribedUsers.findIndex((x)=>x===productId)
            updatedSubscribedUsers.splice(deleteIndex,1)
                
            axios.patch(`http://localhost:8000/api/sv/wishList/${productId}`,{

                subscribedUsers : updatedSubscribedUsers
            })
            .then(async(response)=>{
                console.log("response added",response.data)

                await axios.patch(`http://localhost:8000/api/sv/user/userDetails/${userId}`, {
                        wishList: wishList,
                })
                .then(response=>{
                    console.log(response.data)
                    setRender(!render)
                })
                .catch(error=>console.log(error))
            })
            .catch(error=>console.log(error))
        })
    }


    const removeButtonCall = async(index) => {

        const productId =  wishList[index].productId
        const subscribe = wishList[index].subscribe
        console.log(productId)

        const updatedWishList = [...wishList]
        const deleteIndex = updatedWishList.findIndex((x)=>x.productId===productId)
        updatedWishList.splice(deleteIndex,1)

        localStorage.setItem('wishList', JSON.stringify(updatedWishList));
        console.log("first",updatedWishList)
        console.log("first",localStorage.getItem('wishList'))

        if(subscribe)
        {
            axios.get(`http://localhost:8000/api/sv/wishList/${productId}`)
            .then(response=>{

                console.log("]]]]]",response.data)

                const updatedSubscribedUsers = [...response.data.details.subscribedUsers]
                const deleteIndex = updatedSubscribedUsers.findIndex((x)=>x.subscribedUsers===userId)
                updatedSubscribedUsers.splice(deleteIndex,1)
                console.log("first",updatedSubscribedUsers)

                
                axios.patch(`http://localhost:8000/api/sv/wishList/${productId}`,{

                    subscribedUsers : updatedSubscribedUsers
                })
                .then(async(response)=>{
                    console.log("response added",response.data)
                        setRender(!render)
                   
                 })
                .catch(error=>console.log(error))
            })
            .catch(error=>console.log(error))


           
        }

        await axios.patch(`http://localhost:8000/api/sv/user/userDetails/${userId}`, {
            wishList: updatedWishList,
        })
        .then(response=>{
            console.log(response.data)
            setRender(!render)
        })
        .catch(error=>console.log(error))
            
        
        



    }

    const list = items?.map((x,index)=>(

        <div>
            <img src={x.productImageUrl} style={{height:"200px",width:'200px'}}/>
            <p>name:{x.productName}</p>
            <p>price:{x.productPrice}</p>
            <p>available days:{x.productAvailableDays}</p>
            <button onClick={()=>removeButtonCall(index)}>REMOVE</button>
            {
                wishList[index]?.subscribe ? 
                <button onClick={()=>unSubscribeButtonCall(index)}>UN SUBSCRIBE</button>
                :
                <button onClick={()=>subscribeButtonCall(index)}>SUBSCRIBE</button>


            }
            {/* <button onClick={subscribeButoncall}>SUBSCRIBE</button> */}
        </div>
    ))
    
    return (
        <div>
            {list}
        </div>
    )
}

export default WishList
