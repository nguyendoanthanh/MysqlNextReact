import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Home = () => {
  const [name, setName] = useState('')

  const [auth,setAuth] = useState('')

  const navigate = useNavigate( )

  axios.defaults.withCredentials = true

  useEffect(()=>{
    axios.get('http://localhost:8081')
    .then(res=>{
      if(res.data.Status === "Success"){
            setAuth(true)
            setName(res.data.name)
      }
      // else if(res.data === "Success"){
      // }
      else{
        // navigate('/login')
        setAuth(false)
      }
      console.log(res)
      }
    )
    .catch(err=>console.log(err))
  },[])

  const HandleLogout = () =>{
    axios.get('http://localhost:8081/logout')
    .then(res=>{
      if(res.data.Status === 'Success'){
        window.location.reload(true)
      }
      else{
        alert('error')
      }
    })
    .catch()
  }
  return(
    <div>
      {
      auth ?
      <div>
        <h3>Login by {name}</h3>
        <button className='btn btn-danger' onClick={HandleLogout}>Logout</button>
      </div>
      :
      <div>
        Home Page
        <Link to='/login' className='btn btn-primary'>Login</Link>
      </div>
      }      
    </div>
  )
}
export default Home