import React, { useEffect, useState } from 'react'
import axios from 'axios'
import RentedBidTable from './RentedBidTable';
import ProductTime from './ProductTime';


function RentedCard({list}) {

    
    console.log("list.product--->",list)

    const [editApproval, setEditApproval] = useState(false)
    const [render,setRender] = useState(false)

    const [details,setDetails ] = useState({
        "bidderName" : list.rentedTo.bidderName,
        "fromRented" : list.fromRented,
        "toRented" : list.toRented,

        "productAvailableDays" : list.product.productAvailableDays
    })


    const [rentedDate,setRentedDate]=useState({
        rentedFromDate : "",
        rentedToDate : ""
    });

    
    const minDate = new Date().toISOString().slice(0, 10);

    const handleNoClick = ()=>{
        setEditApproval(false)     
    }

    const handleRentedDatesCall = (event)=>{
        const name = event.target.name
        const value = event.target.value

        setRentedDate({
            ...rentedDate,
            [name]:value
        })

        console.log("mmm",rentedDate)
    }

    const handleYesClick = ()=>{

        axios.patch(`http://localhost:8000/api/sv/admin/bid/rentedProduct/${list._id}`,{
            "fromRented" : rentedDate.rentedFromDate,  
            "toRented" : rentedDate.rentedToDate,  
        })
        .then((response)=>{
            console.log("kkkk",response.data)
            setEditApproval(false)
            setRentedDate({
                rentedFromDate : "",
                rentedToDate : ""
            })

            axios.get(`http://localhost:8000/api/sv/admin/bid/rentedProduct/${list._id}`)
            .then(response=>{
                console.log("ffff",response.data)

                setDetails({
                    bidderName : response.data.rentedProduct.rentedTo.bidderName,
                    fromRented : response.data.rentedProduct.fromRented,
                    toRented : response.data.rentedProduct.toRented,
                    bidderRequiredDays : response.data.rentedProduct.rentedTo.bidderRequiredDays
                })
                setRender(!render)
                

            })
            .catch((error)=>console.log("patch get error--->",error))
        })

        .catch((error)=>console.log("patch get error--->",error))
    }
    
    const handleEditClick = ()=>{
        setEditApproval(true)
    }

    const handleCancelClick = ()=>{
        setEditApproval(false)
    }


return (
     
                <div style={{display:"flex",flex:"row",justifyContent:'space-around'}}>
                    
                    <div>
                        <img src={list.product.productImageUrl} style={{height:"200px",width:"200px"}}/>
                        <p>PRICE : {list.product.productPrice}</p>
                        <p>CAN RENT FOR : {list.product.productAvailableDays}</p>

                    </div>

                    {/* <table>
                        {
                            list.bid.map((row,index)=>
                                <RentedBidTable 
                                    list={row}
                                    // makeChange={makeChange} 
                                    approval={list.approval}
                                    // setMakeChange={setMakeChange}
                                    editApproval={editApproval} 
                                    index={index}
                                />
                            )
                        }
                    </table> */}

                    <div>

                        {editApproval ?

                            <div>
                                <button  onClick={handleCancelClick} style={{height:'20px'}}>CANCEL</button>     
                            </div>

                            : 


                            <div>
                                <button  onClick={handleEditClick} style={{height:'20px'}}>EDIT</button>
                            </div>
                        }

                    
                    
                     <ProductTime  fromDate={details.fromRented} toDate={details.toRented}/> 

                    

                    <p>Rent to : {details.bidderName}</p>

                    {
                        editApproval 
                        ? 
                            <div>
                                <p>From : <input type='date' name='rentedFromDate' value={rentedDate.rentedFromDate} onChange={handleRentedDatesCall}  min={minDate} /> </p>
                                <p>To : <input type='date' name='rentedToDate' value={rentedDate.rentedToDate} onChange={handleRentedDatesCall}  /> </p>

                                <div>
                                        <p>ARE YOU WANT TO MAKE CHANGE?</p>
                                        <button onClick={handleYesClick}>Yes</button>
                                        <button onClick={handleNoClick}>No</button>
                                    </div> 
                            </div>


                        : 
                            <div>
                                <p>From : {details.fromRented} </p>
                                <p>To : {details.toRented}  </p>
                            </div>

                    }
                   

                    </div>


                </div>
            
        
    )
}

export default RentedCard