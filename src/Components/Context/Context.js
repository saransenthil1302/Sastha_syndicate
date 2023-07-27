import axios from 'axios';
import React, {  createContext, useContext, useEffect, useState } from 'react'

export const ProductsLoader = createContext()

function Context({children}) {

    const [products, setProducts] = useState([])

    const [editClick,setEditClick] = useState({
        "id":-1,
        "flag":false
    });

    const [add, setAdd] = useState(false)



    useEffect(()=>{

   
            axios.get('http://localhost:8000/api/sv/admin/')

            .then((response)=>{
                console.log('response----',response.data);
                setProducts(response.data.product)   
            }) 
            
            .catch((error)=>console.log(error))

    

    },[add,editClick])

    console.log("rerender")


    return (

        <div>
            <ProductsLoader.Provider value={{products,setProducts,add,setAdd,editClick,setEditClick}}>
                {children}
            </ProductsLoader.Provider>
        </div>

    
    )
}

export const useProducts = ()=>{
    return useContext(ProductsLoader)
}
export default Context