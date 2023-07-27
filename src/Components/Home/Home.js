import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useProducts } from '../Context/Context';
import axios from 'axios';
import ProductTime from '../Admin/Rented/ProductTime';

function Home() {
  const { products } = useProducts();
  const navigate = useNavigate()
  const [displayProducts, setDisplayProducts] = useState([]);
  const [futureProducts, setFutureProducts] = useState([]);
  const arrSize = products.length >= 4 ? 4 : products.length;

  useEffect(() => {
    const shuffled = products.sort(() => 0.5 - Math.random());
    const arr = shuffled.slice(0, arrSize);
    setDisplayProducts(arr);

    axios.get('http://localhost:8000/api/sv/admin/bid/rentedProduct')
    .then((response)=>{
      setFutureProducts(response.data.rentedProduct)  
      console.log(response.data)   
    })
    .catch((error)=>console.log("rented get error----->",error))

  }, [products, arrSize]);

  console.log(displayProducts);

  return (
    <div>
      <p>Be an owner for a while!</p>
      <p>
        Take me to <NavLink to="/products">PRODUCTS</NavLink> page
      </p>

        <p>PRODUCTS IN QUEUE</p>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>

        {displayProducts.map((x) => (
          <div key={x.id}>
            <div>
              <img src={x.productImageUrl} style={{ height: '100px', width: '100px' }} />
              <p>price : {x.productPrice} </p>
              <p>name : {x.productName}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={()=>navigate('/products')}>BID</button>

      <p>PRODUCTS OUT OF RANGE</p>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        {
          futureProducts.map((x)=>{
            if((new Date(x.toRented) - new Date()) < (3 * 24 * 60 * 60 * 1000))
            return (
                <div>
                  <img src={x.product.productImageUrl} style={{ height: '100px', width: '100px' }} />
                  <p>price : {x.product.productPrice} </p>
                  <p>name : {x.product.productName}</p>
                  <p>READY TO BID IN : </p>
                  <ProductTime toDate={x.toRented}/>

                </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default Home;
