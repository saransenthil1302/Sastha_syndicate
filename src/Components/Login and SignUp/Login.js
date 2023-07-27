import axios from "axios";

import React, {  useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import './login.css';

const Login = () => {
  
  const [input,setInput] = useState({
    "email":"",
    "password":""
  })
  const navigate = useNavigate();
  const [errorMsg,setErrorMsg] = useState("")


  const handleInputChange = (event) => {

    const { name , value } = event.target
    
    setInput({
      ...input,
      [name]:value
    })

  }

  const handleSubmit = () => {

    axios.post('http://localhost:8000/api/sv/user/login',{

      "email":input.email,
      "password":input.password

    })

    .then((response)=>{

      console.log("================",response.data)

      if(response.data.token)
      {

      localStorage.setItem("wishList", JSON.stringify(response.data.wishList));

      localStorage.setItem("jwt",response.data.token)
      localStorage.setItem("userId",response.data.userId)
      localStorage.setItem("approved",response.data.approved)
      const userDetails = {

        email:response.data.email || '',
        userName:response.data.userName || '',
        phoneNo:response.data.phoneNo || '',
        address:response.data.address || ''

      }
      console.log("111",userDetails)
      localStorage.setItem('userDetails',JSON.stringify(userDetails))
      // localStorage.setItem("wishList",response.data.wishList)

      console.log(response.data)
      // setErrorMsg(response.data.msg)

      setInput({
        "email":"",
        "password":""
      })
      navigate('/products')
      }

      


    }).catch((err)=>{
      console.log(err)
      setErrorMsg(err.response.data.msg)
    })
    
  }

  return (
    <div>
        <div className="login">
        <div>
            <label htmlFor="email">Email</label>
            <input
            type="email"
            id="email"
            name="email"
            value={input.email}
            onChange={handleInputChange}
            required
            />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input
            type="password"
            id="password"
            name="password"
            value={input.password}
            onChange={handleInputChange}
            required
            />
        </div>
        <button type="submit" onClick={handleSubmit}>Submit</button>
        {errorMsg ? <p> {errorMsg} </p> : ""}
        
        <p >Need an account ? <NavLink to='/signup'>Sign Up</NavLink> </p>
    </div>
   
    </div>
  );
};

export default Login;
