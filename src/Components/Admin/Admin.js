import React from 'react'
import { NavLink, Outlet} from 'react-router-dom'


function Admin() {


  return (
    <div>

        <NavLink to='products'>PRODUCTS</NavLink>
        <NavLink to='bitsAcquired'>BITS</NavLink>
        <NavLink to='aproved'>APROVED</NavLink>
        <NavLink to='rented'>RENTED</NavLink>
        <NavLink to='settings'>SETTINGS</NavLink>
        <Outlet/> 

    </div>
  )
}

export default Admin
