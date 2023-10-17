import React,{useState , useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import validation from './Loginvalidation'
import axios from 'axios'

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const [errors,setErrors] = useState({})

  const handleSubmit = (e)=>{
    e.preventDefault()
    const err = validation(values)
    setErrors(err)
    if(err.email==="" && err.password==="")
    {
        axios.post('http://localhost:8081/users',values)
        .then(res=>{
          if(res.data.Status === "Success"){
            navigate('/home')
          }
          else{
            alert("Can't login")
          }}
        )
        .catch(err=>console.log(err))
    }
  }

  axios.defaults.withCredentials = true

  useEffect(()=>{
    axios.get('http://localhost:8081')
    .then(res=>{
      if(res.data.valid){
            navigate('/home')
      }
      }
    )
    .catch(err=>console.log(err))
  })

  const handleInput = (e) =>{
    setValues(prev=>({...prev,[e.target.name]:[e.target.value]}))
  }


  return (
    <div className='d-flex w-100 bg-primary justify-content-center align-items-center vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}> 
                <div className="mb-3">
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input type="email" placeholder='Enter Email' name='email' className='form-control rounded-0' onChange={handleInput} />
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="text" placeholder='Enter Password' name='password' className='form-control rounded-0' onChange={handleInput}/>
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0'>Login</button>
                <p>Sign up for register</p>
                <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Signup</Link>
            </form>
        </div>
    </div>
  )
}

export default Login