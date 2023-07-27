import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import ProductsCard from './ProductsCard';
import { useProducts } from '../Context/Context';

function Products() {

    const { products } = useProducts()
    const checkWishList = localStorage.getItem('wishList')
    ? JSON.parse(localStorage.getItem('wishList'))
    : [];


    return (
      <div>
        
      
        {products.map((items,index)=>(
          items.productAvailability ? <ProductsCard items={items} index={index} checkWishList={checkWishList} /> : "" 
        ))}

      </div>
    )
}

export default Products