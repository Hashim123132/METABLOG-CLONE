import React from 'react'
import {useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Contact = () => {
  const [credentials, setCredentials] = useState({email:'', comment:''} )
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { email, comment } = credentials;
  
    try {
      const response = await fetch('http://localhost:5000/api/auth2/createcontact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, comment }),
      });
  
      const json = await response.json();
      if (json.success) {
        navigate('/');
        alert('Your comment has been sent successfully');
      } else {
        alert(json.message || 'Invalid credentials');
      }
    } catch (error) {
      alert('There was an error with your request.');
      console.error('Error submitting comment:', error);
    }
  };
  

  const onChange = (e) =>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }
  
  return (
    <form onSubmit={handleSubmit} >

        <div className='flex justify-center items-center h-screen '>
          <div className=' rounded-lg p-[32px] w-[390px] h-[400px] bg-custom-gray-3 border border-solid text-custom-dark  dark:text-white dark:bg-custom-dark2 dark:border-custom-dark2 dark:border-solid dark:border'>
            <div className='flex flex-col justify-center items-center'>
              <h1 className='font-semibold  text-[20px]'>Contact Us</h1>
              <p className='font-[#97989F] font-normal text-[#97989F] '>We would love to hear from you!</p>
            </div>
            <div>

            <input type="email" placeholder='Your Email' name='email'  onChange={onChange}     className='  rounded-md bg-gray-300 dark:border-solid dark:border dark:border-[#3B3C4A] text-[#97989F] dark:bg-[#181A2A] block py-[12px] px-[16px] w-[320px] mt-7  border border-solid ' />
            
            <textarea placeholder='Your Comment' name='comment'   onChange={onChange} className='rounded-md border-solid border bg-gray-300 dark:border-[#3B3C4A] dark:text-[#97989F] dark:bg-[#181A2A] block py-[12px] px-[16px] w-[320px] mt-4 h-[60px] resize-none'></textarea>
            
            <button className='rounded-md p-2 text-white font-semibold bg-[#4B6BFB] py-[12px] px-[16px] w-[320px] mt-2 transition-opacity duration-300 hover:opacity-80'>Submit</button>
            </div>
            <div className='mt-4 text-center'>
                  <p className='text-white font-semibold '>Email: <span className=' text-[#97989F]'>info@jstemplate.net</span></p>
                  <p className='text-white font-semibold'>Phone: <span className=' text-[#97989F]'>880 123 456 789</span></p>

            </div>
          </div>
        </div>
    </form>
  )
}
export default Contact


