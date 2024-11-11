import React, { useState } from "react"
import {useNavigate} from 'react-router-dom'
const Signup = () => {
 
 
  const [credentials, setCredentials] = useState({name:'', email:'', password:'', cpassword:''})
  const navigate = useNavigate();
  
  const handleSubmit = async (e)=>{
    e.preventDefault();
   
    const {name, email, password ,cpassword} = credentials

    if (password !== cpassword) {
      alert('Passwords do not match');
      return;
    }
    //Sending POST request to create user 
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({name, email, password})
      
    });
    const json = await response.json()
    if(json.success){
      //save the auth token
      localStorage.setItem('token', json.authtoken)
      navigate('/')

    }
    else{
      alert('invalid credentials')
    }
    
    
    
   
  }

  const onChange = (e) =>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }
  
  
  return (
   <>
    <form onSubmit={handleSubmit} >
    <div className='flex justify-center items-center h-screen'>
      <div className='bg-[#242535] rounded-lg p-[32px] w-[390px] h-[500px] border border-solid border-[#3B3C4A]'>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='font-semibold text-white text-[20px]'>SignUp</h1>
          <p className='font-[#97989F] font-normal text-[#97989F] text-[20px] '>Hello New User!</p>
        </div>
          <div className="flex flex-col space-y-6 mt-5">
          
                      {/* name */}
                      
                      <input type="text" id="name" className="rounded-md border-solid border border-[#3B3C4A] text-[#97989F] bg-[#181A2A] block py-[12px] px-[16px] w-[320px] " placeholder="Enter your name" value={credentials.name}  onChange={onChange}  name='name' aria-describedby="nameHelp"/>        

                      {/* email */}

                      <input type="email" id="email" className="rounded-md border-solid border border-[#3B3C4A] text-[#97989F] bg-[#181A2A] block py-[12px] px-[16px] w-[320px] " placeholder="Enter your Email" value={credentials.email}  onChange={onChange}  name='email' aria-describedby="emailHelp"/>        

                      {/* Password */}


                      <input type="password" className="rounded-md border-solid border border-[#3B3C4A] text-[#97989F] bg-[#181A2A] block py-[12px] px-[16px] w-[320px] " placeholder="Enter your password" value={credentials.password} onChange={onChange}  name='password' />

                      {/* confirm Password */}

                      <input type="password" className="rounded-md border-solid border border-[#3B3C4A] text-[#97989F] bg-[#181A2A] block py-[12px] px-[16px] w-[320px]"  placeholder="Enter your password again" value={credentials.cpassword} onChange={onChange}  name='cpassword' /> 
                     
                      <button className='rounded-md p-2 text-white font-semibold bg-[#4B6BFB] py-[12px] px-[16px] w-[320px] mt-2 transition-opacity duration-300 hover:opacity-80'>Signup</button>              
            
          </div>       
      </div>
    </div>
    </form>
   
   </>
  )
}

export default Signup