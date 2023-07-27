import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductsCard from '../Products/ProductsCard';
import AprovalMessage from './AprovalMessage';

function Bits() {
  // const [bidsAcquired, setBidsAcquired] = useState([]);
  // const [aprovedProductDetails, setAprovedProductDetails] = useState([]);

  const userID = localStorage.getItem('userId');
  const [user, setUser] = useState([])
  const [render,setRender] = useState(false)

  useEffect(() => {

      axios
        .get(`http://localhost:8000/api/sv/user/userDetails/${userID}`)
        .then((response) => {
          
          setUser(response.data.userDetails)
          console.log("555",response.data.userDetails)
        })
        .catch((error) => console.log(error));
      
  }, [render]);

  

  return (

      <div>
          Approved bids
          {

            user.approved?.map((item,index)=>(


                <AprovalMessage 
                  approved={user.approved} 
                  approvedItem={item} 
                  index={index} 
                  render={render} 
                  setRender={setRender}
                />
            ))
          }


      </div>
  )
}

export default Bits;

// useEffect(() => {
  //   const promises = bidsAcquired.map((productID) => {
  //     return axios
  //       .get(`http://localhost:8000/api/sv/admin/${productID}`)
  //       .then((response) => {
  //         return response.data;
  //       })
  //       .catch((error) => console.log(error));
  //   });

  //   Promise.all(promises).then((results) => {
  //     setAprovedProductDetails(results);
  //     console.log(aprovedProductDetails)
  //   });
  // }, [bidsAcquired]);
