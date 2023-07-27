const userId = localStorage.get('userId')

axios.get(`http://localhost:8000/api/sv/user/userDetails/${productId}`)
.then((response)=>{
  console.log(response)

})

.catch(error=>console.log(error))
