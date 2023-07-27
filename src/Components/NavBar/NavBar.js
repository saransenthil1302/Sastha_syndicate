import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'

function NavBar() {
  const navigate = useNavigate()
  const logOutCall = ()=>{

    localStorage.setItem('jwt','')
    localStorage.setItem('userId','')
    localStorage.setItem('wishList','')
    localStorage.setItem('approved','')
    navigate('/login')


  }
  return (
    <div style={{width:'100%',display:'flex',flex:'row'}} className='Navbar'>   
        <NavLink to='' style={{textDecoration:'none',fontWeight:'bold',color:'orange'}}>HOME</NavLink>
        <NavLink to='/products'style={{textDecoration:'none',fontWeight:'bold',color:'orange'}}>PRODUCTS</NavLink>
        <NavLink to='/bits'style={{textDecoration:'none',fontWeight:'bold',color:'orange'}}>BITS</NavLink>     
        <NavLink to='/wishlist' style={{textDecoration:'none',fontWeight:'bold',color:'orange'}}>WISHLIST</NavLink>     
        <NavLink to='/userProfile'style={{textDecoration:'none',fontWeight:'bold',color:'orange'}}>PROFILE</NavLink>     

        
        
        <NavLink to="/admin"style={{textDecoration:'none',fontWeight:'bold',color:'orange'}}>ADMIN</NavLink>
        {   !localStorage.getItem('jwt') 
            &&         
            <NavLink to='/login'style={{textDecoration:'none',fontWeight:'bold',color:'orange'}}>LOGIN</NavLink>
            &&
            <NavLink to="/signup"style={{textDecoration:'none',fontWeight:'bold',color:'orange'}}>SIGN UP</NavLink>
        }
        <NavLink to='/login'onClick={logOutCall} style={{textDecoration:'none',fontWeight:'bold',color:'orange'}}>LOGOUT</NavLink>     

       
        
        
    </div>
    
  )
}

export default NavBar