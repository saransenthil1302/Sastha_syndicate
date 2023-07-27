import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import './login.css';


function SignUp() {


  const [input,setInput] = useState({
    "email":"",
    "password":"",
    "confirmPassword":""
  })

  
  const [err,setErr]=useState()
  const navigate = useNavigate();
  
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  

  const handleSubmitCall = () => {

    if(input.password === input.confirmPassword)
    {
      setErr("")
      handleSubmit()

    }
    else
    {
      setErr("Password and confirm password did'n match")
    }
   
    




  }

  const handleSubmit = (event) => {

    axios.post('http://localhost:8000/api/sv/user/signup',{

      "email" : input.email,
      "password": input.confirmPassword

    })

    .then((response)=>{
      if(response.data)
      {
        navigate('/login')
        console.log(response.data)
        console.log("sucess")

        
      }
    })
    
  }

  return (
    <div className="login">
    <div>
      <label htmlFor="email">Email:</label>

      <input 
        type="text" 
        id="email"
        name="email"
        value={input.email}
        onChange={handleInputChange}
        required
      />

      <br></br>

      <label htmlFor="password">Password:</label>

      <input 
        type="password" 
        id="password" 
        name="password"
        value={input.password}
        onChange={handleInputChange} 
      />
      <br></br>

      <label htmlFor="confirmPassword">Confirm Password:</label>

      <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={input.confirmPassword}
          onChange={handleInputChange}
      />

      <br></br>

      <button type="submit" onClick={handleSubmitCall}>Sign Up</button>
      {err}
    </div>
    </div>
  );
}

export default SignUp;
