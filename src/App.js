import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Login from './Components/Login and SignUp/Login';
import SignUp from './Components/Login and SignUp/SignUp';
import Home from './Components/Home/Home';
import Products from './Components/Products/Products';
import Bits from './Components/Bits/Bits';
import Admin from './Components/Admin/Admin';
import BitsAcquired from './Components/Admin/Bits Acquired/BitsAcquired';
import AdminProducts from './Components/Admin/Products/AdminProducts';
import ProductsLoader  from './Components/Context/Context';
import WishList from './Components/User/WishList';
import RentedProducts from './Components/Admin/Rented/RentedProducts';
import AprovedBids from './Components/Admin/Aproved/Aproved';
import Todo from './Todo';
import UserProfile from './Components/User/UserProfile';
import Settings from './Components/Admin/Settings,js/Settings';

function App() {
   

  return (
    <div>
      

          <BrowserRouter>
          <ProductsLoader>

                <NavBar/>


                <Routes>
                  
                      <Route path="" element={<Home/>}/>
                      <Route path="products" element={<Products/>}/>
                      <Route path="wishlist" element={<WishList/>}/>
                      <Route path="userProfile" element={<UserProfile/>}/>

                      <Route path="signUp" element={<SignUp/>}/>
                      <Route path="login" element={<Login/>}/>

                      <Route path="bits" element={<Bits/>}/>
                      <Route path="admin" element={<Admin/>}>
                        <Route index element={<AdminProducts/>}/>
                        <Route path="products" element={<AdminProducts/>}/>
                        <Route path="bitsAcquired" element={<BitsAcquired/>}/>
                        <Route path="aproved" element={<AprovedBids/>}/>
                        <Route path="rented" element={<RentedProducts/>}/>
                        <Route path="settings" element={<Settings/>}/>
                      </Route>



                </Routes>
                
          </ProductsLoader>
          </BrowserRouter>

      
      
    </div>
  )
}

export default App