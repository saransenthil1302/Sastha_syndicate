
import axios from "axios";
import React, { useState } from "react";
const Settings=()=>
{
    const [password,setPassword]=useState();
    const [newpassword,setNewPassword]=useState();
    const [confirmpassword,setConfirmPassword]=useState();
    const [error,setError]=useState();
    const [flag,setFlag]=useState(false);
   const handlePassword=()=>
   {
    axios.post("http://localhost:",{id:localStorage.getItem("id"),password:password})
    .then(res=>
    {
        if(res.data==true)
        setFlag(!flag)
    }
    )
    .catch(err=>
    {
        setError(err.resp.data.message)
    })
}
   const handleNewPassword=()=>
   {
    if(newpassword===confirmpassword)
    {
    axios.patch("http://localhost:",{"newpassword":newpassword})
    .then(res=>
    {
        setFlag(!flag)
    }
    )
    .catch(err=>
    {
        console.log(err)
    })
    }

   }

    return(
        <div>
            {!flag?<div>
                <label for="password">Password</label>
                <input  type="password" name="password" onChange={(e)=>{setPassword(e.target.value)}} value={password}></input>
                <button onClick={handlePassword}>Submit</button>
            </div>:<div>
                <label for="newpassword">Password</label>
                <input  type="password" name="newpassword" onChange={(e)=>{setNewPassword(e.target.value)}} value={newpassword}></input>
                <label for="confirmpassword">Password</label>
                <input  type="password" name="confirmpassword" onChange={(e)=>{setConfirmPassword(e.target.value)}} value={confirmpassword}></input>
                <button onClick={handleNewPassword}>Confim</button>
            </div>}
            <p>{error}</p>
        </div>
    );
}

export default Settings