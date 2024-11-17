import React from 'react'

const Bloglisting = () => {
  return (
    <div className='overflow-x-hidden lg:overflow-x-auto  ' >
      
        <p className='text-custom-gray-2 flex justify-center items-center font-semibold text-3xl mt-[60px] '>Page Title</p>
        <div className='flex justify-center  pt-6 items-center '>                     
        
        <p className='text-[#3B3C4A] text-[16px]'>Home</p> 
        <div className='w-[24px] -rotate-90 border-solid border border-[#3B3C4A] mx-2'></div>
        <p className='text-[#696A75] text-[16px]'>Link One</p>                                    
        
          </div>
                                 {/* THIS ABOVE IS STYLING IS HEADER  */}                                                  
              <div className='relative  '>
                

                  <img className='xsm: h-[239px] w-[400px]  object-cover mx-auto rounded-lg mt-8 lg:w-[1216px] lg:h-[450px] ' src="/IMAGES/pexels-mintworkspace-28350926.jpg" alt="" />

                       
                                                                          {/*IMAGE 1 SECTIONcd  SYNTAX FOR PAGE 2 AS WELL  JUST REMOVE THIS FIRST DIV*/}
                        <div className='xsm:absolute inset-[20px] left-[5px]  text-white font-semibold h-[184px]  mt-10  p-10 rounded-xl flex flex-col items-center lg: absolute lg:inset-[145px] lg:left-[220px] lg:w-[1136px]'>
                              <h2 className='xsm:font-medium text-xs bg-[#4B6BFB] rounded-lg  mr-auto p-1 mb-3 lg:text-base'>Technology</h2>
                              <p className='xsm:font-semibold text-xs mr-auto w-[226px] lg:text-4xl lg:w-[720px] flex-1'>The Impact of Technology on the Workplace: How Technology is Changing</p>
                              <div className='xsm:flex space-x-4 items-center pt-2 text-xs mr-auto lg:pt-5 lg:text-base'>
                                  <img className='xsm:w-[23px] rounded-full lg:w-10 ' src="./IMAGES/ec54609ce8242bd3168cea0902f3a40f.png" alt="" />
                                  <p>Tracey Wilson</p>
                                  <p>August 20, 2022</p>
                              </div>
                        </div>

               </div>
                                                 
            
                                                {/* LATEST POSTS WALA SECTION */}
               
               <div className='xsm:font-bold text-2xl text-white mt-10 ml-[13%] '>Latest Post</div>
               
                                                  {/* griding here below: */}
                                                  
                                                  <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.slice(0, displayCount).map((blog) => (
            <Blog
              key={blog.id}
              id={blog.id}
              tag={blog.tag}
              title={blog.title}
              image={blog.image}
              author={blog.author}
            />
          ))}
        </div>
      </div>
            
             <div className='mt-8 flex justify-center items-center'>
            
              <button className='bg-custom-gray-1 text-[#696A75] font-medium border border-solid border-[#E8E8EA] py-3 px-5 rounded-lg  dark:border-solid dark:border-[#242535] dark:bg-custom-gray'>View All Post</button>
                
             </div>
             
             <div className='flex justify-center  '>
                <div className=' flex flex-col mt-20 items-center w-[50%] rounded-xl p-3 bg-custom-gray-1 dark:bg-custom-gray '>
                      <p className=' text-[#696A75]  '>Advertisement</p>
                      <p className=' text-[#696A75] text-xl  font-semibold '>You can place ads</p>
                      <p className=' text-[#696A75]  '>750x100</p>
                </div>
             </div>
             
             
             
            
                <div className='xsm:dark:bg-custom-dark  text-white border-t border-b border-solid border-t-[#E8E8EA] border-b-[#E8E8EA] min-h-screen mt-20  ' >
                 
                  <div className='hidden lg:flex justify-center items-center space-x-36 mt-14'>

                  
                          <div className='p-4 text-[#696A75] '>
                            <p className='font-semibold  text-[18px]'>About</p>
                            <p className='text-[#97989F] w-[260px] mt-5'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                            <p className='font-semibold text-[#696A75] mt-5'>Email : <span className='text-[#97989F]'>info@jstemplate.net</span> </p>
                            <p className='font-semibold text-[#696A75]'>Phone : <span className='text-[#97989F]'>880 123 456 789</span> </p>

                        </div>
                                                                          {/* ABOUT KI DIV ABOVE */}
                        
                        <div className='flex flex-col text-[#696A75] '>
                          <h1 className='text-[18px] font-semibold'>Quicklink</h1>
                        <ul className=' mt-4 space-y-2 '>

                          <li>Home</li>
                          <li>About</li>
                          <li>Blog</li>
                          <li>Archived</li>
                          <li>Author</li>
                          <li>Contact</li>

                        </ul>
                        </div>
                                                                                          {/*QUICK LINK KI DIV ABOVE  */}
                        
                        <div>
                          <h1  className='text-[18px] font-semibold text-[#696A75]'>Category</h1>
                          <ul className='text-[#696A75] mt-4 space-y-2'>
                            <li>Lifestyle</li>
                            <li>Technology</li>
                            <li>Travel</li>
                            <li>Business</li>
                            <li>Economy</li>
                            <li>Sports</li>
                          </ul>
                        </div>
                                                                            {/*Category KI DIV ABOVE  */}
                        <div className='xsm:bg-custom-gray-1 rounded-lg p-[32px] w-[390px] h-[254px] dark:bg-custom-gray '>
                          <div className='flex flex-col justify-center items-center'>
                              <h1 className='font-semibold text-[#696A75] text-[20px]'>Weekly Newsletter</h1>
                              <p className='font-[#97989F] font-normal text-[#97989F] '>Get blog articles and offers via email</p>
                          </div>
                        
                          <input type="text" placeholder='Your Email' className='rounded-md border-solid border dark:bg-custom-dark dark:text-[#3B3C4A]     border-[#E8E8EA] text-black placeholder:text-gray-600  bg-[#c5c5c7] block py-[12px] px-[16px] w-[320px] mt-7' />
                          <button className='rounded-md p-2 text-white font-semibold bg-[#4B6BFB] py-[12px] px-[16px] w-[320px] mt-2'>Subscribe</button>

                        </div>
                                                                            {/* Weekly Newsletter KI DIV ABOVE  */}
                        </div>
                                <hr className="border-t-1 border-[#bebebe] w-[1275px] mx-auto mt-10" />
                        <div className='xsm:flex flex-col justify-around items-center lg:flex '>
                               
                               
                                <div className='w-[305px] mt-10 text-center '>
                                <h1 className=' text-[#141624] text-xl text-center dark:text-white'>Meta<span className=' font-extrabold '>Blog</span></h1>
                                  <p className='hidden lg:flex  lg:text-white text-[16px]'>© JS Template <span className='text-[#BABABF]'>2024. All Rights Reserved.</span></p>
                                </div>
                                                                            {/* LOGO AND TRADEMARKS */}
                                <div className='flex items-center text-[#BABABF] mt-[70px]'>
                                  
                                  <span>Terms of Use</span>
                                  <div className='w-[24px] -rotate-90 border-solid border border-[#9e9e9e] mx-2'></div>
                                  <span  className="">Privacy Policy</span>
                                  <div className="w-[24px] -rotate-90 border-solid border border-[#9e9e9e] mx-2"></div>
                                  <span>Cookie Policy</span>

                                </div>
                                                                            {/* TOS COOKIES ETC */}

                        </div>
                </div>
      </div>
  
  )
}

export default Bloglisting