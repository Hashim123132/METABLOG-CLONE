import React from 'react'

const Contact = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='bg-[#242535] rounded-lg p-[32px] w-[390px] h-[400px] border border-solid border-[#3B3C4A]'>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='font-semibold text-white text-[20px]'>Contact Us</h1>
          <p className='font-[#97989F] font-normal text-[#97989F] '>We would love to hear from you!</p>
        </div>
        
        <input type="email" placeholder='Your Email' className='rounded-md border-solid border border-[#3B3C4A] text-[#97989F] bg-[#181A2A] block py-[12px] px-[16px] w-[320px] mt-7' />
        
        <textarea placeholder='Your Comment' className='rounded-md border-solid border border-[#3B3C4A] text-[#97989F] bg-[#181A2A] block py-[12px] px-[16px] w-[320px] mt-4 h-[60px] resize-none'></textarea>
        
        <button className='rounded-md p-2 text-white font-semibold bg-[#4B6BFB] py-[12px] px-[16px] w-[320px] mt-2'>Submit</button>
      </div>
    </div>
  )
}
export default Contact


