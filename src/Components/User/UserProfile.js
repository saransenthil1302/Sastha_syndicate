import axios from "axios";
import React, { useEffect, useState } from "react";
import './UserProfile.css'
function UserProfile()
{

    const u = JSON.parse(localStorage.getItem('userDetails'))

    console.log("%%%%%%%%%%",u)
    
    const [userDetails,setUserDetails]=useState(JSON.parse(localStorage.getItem('userDetails')))
    console.log("d",u)
    // console.log(userDetails)
    const[editflag,setEditflag]=useState(false);
    const editProfile=(event)=>
    {
        const name=event.target.name
        const value=event.target.value
        setUserDetails({...userDetails,[name]:value})
    }
    const handleUserDetailsSubmit=async()=>
    {
        const userId = localStorage.getItem('userId')
        console.log("first",userDetails)
        axios.patch(`http://localhost:8000/api/sv/user/userDetails/${userId}`,{ 

                "email":userDetails.email,
                "userName":userDetails.userName,
                "phoneNo":userDetails.phoneNo,
                "address":userDetails.address

        })
        .then(response=>{
            console.log(response.data)
            setUserDetails({
                email:response.data.email,
                userName:response.data.userName,
                phoneNo:response.data.phoneNo,
                address:response.data.address

            })
            localStorage.setItem('userDetails',JSON.stringify(userDetails)) 
            setEditflag(false)
            console.log('********',localStorage.getItem('userDetails'))
            
        })
        .catch(error=>console.log(error))
    }
    return(
        <div className="main">
        {!editflag ?
            
                    
            <div className="details">
            <article className="details-sub">
            <p className="left-side-user-detail">NAME :</p>
            <p className="right-side-user-detail">
                {/* {userDetails.userName} */}
                SaranS
                </p>
            </article>
            <article className="details-sub">
            <p className="left-side-user-detail">PHONE NUMBER:</p>
            <p className="right-side-user-detail">
                {/* {userDetails.phoneNo} */}9345692626
                </p>
                </article>
                <article className="details-sub">
            <p className="left-side-user-detail">EMAIL :</p>
            <p className="right-side-user-detail">
                {/* {userDetails.email} */}saransenthil1302@gmail.com
                </p>
                </article>
                <article className="details-sub">
            <p className="left-side-user-detail">ADDRESS :</p>
            <p className="right-side-user-detail">
                {/* {userDetails.address} */}4/374 A-1 Mjillam Ganga Nagar,Namakkkal.
                </p>
                </article>
            <button className="detailsbutton"
            onClick={()=>setEditflag(!editflag)}
             >
                EDIT</button>
        </div>
                    
            :
            <div>
                <form className="edit-form">
                <label>NAME</label>
                <input 
                type={"text"} 
                // value={userDetails.userName} 
                name="userName" 
                // onChange={editProfile}
                ></input>
                <label>PHONE NUMBER</label>
                <input 
                type={"tel"}
                //  value={userDetails.phoneNo} 
                 name="phoneNo"
                //   onChange={editProfile}
                  ></input>
                <label>EMAIL</label>
                <input type={"email"} 
                //value={userDetails.email} 
                name="email" 
                //onChange={editProfile} 
                disabled={true}></input>
                <label>ADDRESS</label>
                <input type={"text"} 
                //value={userDetails.address}
                 name="address" 
                 //onChange={editProfile}
                 ></input>
                <button 
                //onClick={handleUserDetailsSubmit}
                >SAVE</button>
                </form>
            </div>
        }
        </div>

    )


}

export default UserProfile