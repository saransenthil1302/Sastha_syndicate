import React, { useState } from 'react';

const TableRow = ({items,index,editClick,handleEditClickChange,handleRemoveClickChange,handleSaveClickChange,handleCancelClickChange}) => {

    
    const [checkBox, setCheckBox] = useState(items.productAvailability)

    const [editProduct,setEditProduct]=useState({
        productName:items.productName,
        productPrice:items.productPrice,
        productAvailableDays:items.productAvailableDays,
        productCategory:items.productCategory,
        productImageUrl:items.productImageUrl,
    })


    const handlEditProductCall = (event)=>{

        const name = event.target.name
        const value = event.target.value

        setEditProduct({
            ...editProduct,
            [name]:value
        })
    }

    const checkChange = ()=> setCheckBox(!checkBox)

    const editChange = (event) => handleEditClickChange(event,items)
    
    const removeChange = () => handleRemoveClickChange(items._id,index)

    const saveChange = ()=> handleSaveClickChange(items._id,editProduct,checkBox)

    const cancelChange = () => handleCancelClickChange()



    // const handleEditFormSubmit = ()=>{

        
    //     axios.put(`http://localhost:8500/products/${items._id}`,
    //         {
    //             "productName":editProduct.productName,
    //             "productPrice":editProduct.productPrice,
    //             "productCategory":editProduct.productCategory,
    //             "productImageUrl":editProduct.productImageUrl,
    //             "productAvailability":editProduct.productAvailability,             
    //         },
            
    //     ).then((response)=>{
    //         console.log(response.data);
    //         // window.location.reload();
    //         setEditClick({"_id":-1,"flag":false});
            
    //     }).catch((error)=>{
    //         console.log(error);
    //     })
    // }

    //handleEditFormSubmit

    // axios.post('http://localhost:8000/products',
    // {
    //     "productName":editProduct.productName,
    //     "productPrice":editProduct.productPrice,
    //     "productCategory":editProduct.productCategory,
    //     "productImageUrl":editProduct.productImageUrl,
    //     "productAvailability":editProduct.productAvailability,             
    // },
    // {
    //     headers:{
    //         'Content-Type':'application/json'
            
    //     }
    // }
    // ).then((response)=>{
    // console.log(response.data);
    // setEditClick(null);

    // }).catch((error)=>{
    // console.log(error);
    // })
    

  
  return (

        <tr id='edit_admin_table_row'>

            <td id='edit_admin_table_cell' className='index_table'>{index+1}</td>

            <td id='edit_admin_table_cell'>

                {editClick.id===items._id && editClick.flag ?

                    <input 
                        type='text'  placeholder='Enter name'               
                        name='productName'    
                        value={editProduct.productName}        
                        onChange={handlEditProductCall}
                    />
                    :
                    items.productName
                }

            </td>


            <td id='edit_admin_table_cell'>

                {editClick.id===items._id && editClick.flag ?

                    <input 
                        type='text'  placeholder='Enter price'
                        name='productPrice'               
                        value={editProduct.productPrice}        
                        onChange={handlEditProductCall}
                    />
                    :
                    items.productPrice
                }

            </td >


            <td id='edit_admin_table_cell'>

                {editClick.id===items._id && editClick.flag ?

                    <input 
                        type='text'  placeholder='Enter available days'
                        name='productAvailableDays'              
                        value={editProduct.productAvailableDays}        
                        onChange={handlEditProductCall}
                    />
                    :
                    items.productAvailableDays
                }

            </td >


            <td id='edit_admin_table_cell'>

                {editClick.id===items._id && editClick.flag ?

                    <select
                        id='input_field'  type='text' placeholder='Enter category' className='select_edit'
                        name='productCategory'
                        value={editProduct.productCategory}        
                        onChange={handlEditProductCall}
                    >
                        <option value='' hidden>CATEGORY</option>
                        <option>MACHINERY</option>
                        <option>ELECTRICALAPPLIANCES</option>
                    </select>
                    :
                    items.productCategory
                }

            </td>


            <td id='admin_table_cell'>

                {editClick.id===items._id && editClick.flag ?

                    <input 
                        id='input_field' type='checkbox' name='productAvailability'  
                        checked={checkBox}
                        onChange={checkChange}
                    />
                    :
                    <input 
                        type='checkbox' 
                        checked={checkBox}
                        disabled={!(editClick.id===items._id && editClick.flag)}
                    />
                }

            </td>


            <td id='edit_admin_table_cell'>

                {editClick.id===items._id && editClick.flag ?

                    <input 
                        type='text'  placeholder='PASTE URL'
                        name='productImageUrl'  
                        value={editProduct.productImageUrl}        
                        onChange={handlEditProductCall}
                    />
                    :
                    <img src={items.productImageUrl} style={{height:"100px",width:"100px"}}/>

                }

            </td>

            <td id='edit_admin_table_cell'>

                {editClick.id===items._id && editClick.flag ?

                    <div>
                        <button   
                            id='button_save' type='submit'
                            onClick={saveChange}>
                            SAVE 
                        </button>

                        <button 
                            id='button_cancel' type='button'
                            onClick={cancelChange}>
                            CANCEL
                        </button>

                    </div>
                    :
                    <div>
                        <button 
                            id='button_edit' type='button' 
                            onClick={editChange}>
                                EDIT
                        </button>

                        <button
                            id='button_remove' type='button' 
                            onClick={removeChange}>
                                REMOVE
                        </button>

                    </div>  
                }

            </td>

        </tr> 
    
  )
}

export default TableRow

