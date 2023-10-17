import React,{useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import validation from './SignupValidation'

const Signup = () => {
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:''
    })
    const navigate = useNavigate()
    const [errors,setErrors] = useState({})
    const handleChange = (event) =>{
        setValues({...values,[event.target.name]:[event.target.value]})
    }
    const handleSubmit = (event) =>{
        event.preventDefault()
        const err = validation(values)
        setErrors(err)
        if(err.name=== "" && err.email=== "" && err.password==="")
        {
            axios.post('http://localhost:8081/crud',values)
            .then(
                res=>navigate('/login')
            )
            .catch(err=>console.log(err))
        }
            // axios.post('http://localhost:8081/crud',values)
            // .then(res=>console.log('ok'))
            // .catch(err=>console.log(err))
    }

  return (
    <div className='d-flex w-100 bg-primary justify-content-center align-items-center vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h2>Sign-up</h2>
            <form onSubmit={handleSubmit}> 
                <div className="mb-3">
                    <label htmlFor="name"><strong>Name</strong></label>
                    <input type="text" placeholder='Enter Name' name='name' className='form-control rounded-0' onChange={handleChange}/>
                    {errors.name && <span className='text-danger'>{errors.name}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input type="email" placeholder='Enter Email' name='email' className='form-control rounded-0'  onChange={handleChange}/>
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="text" placeholder='Enter Password' name='password' className='form-control rounded-0' onChange={handleChange}/>
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0'>Sign up</button>
                <p>Sign up for register</p>
                <p>if have account click login</p>
                <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
            </form>
        </div>
    </div>
  )
}

export default Signup