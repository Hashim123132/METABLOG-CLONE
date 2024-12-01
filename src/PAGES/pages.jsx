import React from 'react'
import Blog from './Blog';
import blogs from './blogData';
import { useState } from 'react';

const Pages = () => {
  // Set initial number of blogs to display
  const [displayCount, setDisplayCount] = useState(6); 

  // Function to load more blogs
  const loadMoreBlogs = () => {
    setDisplayCount(displayCount + 6); 
  };
  return (
    <div className='overflow-x-hidden lg:overflow-x-auto ' >
      
                       
    
                              
    
 
                             {/* THIS ABOVE IS STYLING IS HEADER  */}                                                  
               <div className='xsm:bg-custom-gray-3 dark:bg-custom-dark2 rounded-lg mx-auto mt-[70px]  h-[239px] w-[400px]  p-[20px] lg:w-[1216px] lg:h-[344px] lg:p-[48px]   '>
                  <div className='xsm:flex justify-center -mt-[10px] lg:mt-[10px]'>
                    <img className='xsm:w-[44px] h-[44px] lg:w-[64px] lg:h-[64px] rounded-full' src="./IMAGES/jasonfrancisco.jpeg" alt="" />
                      <div className='ml-3'>
                        <p className=' dark:text-white font-medium text-xs lg:text-xl'>Jason Francisco</p>
                        <p className='dark:text-[#BABABF]  text-xs lg:text-base'>Collaborator & Editor</p>
                        
                      </div>
                  
                  </div>
                    <div className="text-center mt-6 text-custom-dark ">
                      <span className="xsm:text-xs  block  dark:text-[#BABABF] lg:text-lg">Meet Jason Francisco, a passionate writer and blogger with a love for</span>
                      <span className="xsm:text-xs  block  dark:text-[#BABABF] lg:text-lg">technology and travel. Jonathan holds a degree in Computer Science and</span>
                      <span className="xsm:text-xs  block  dark:text-[#BABABF] lg:text-lg">has spent years working in the tech industry, gaining a deep understanding </span>
                      <span className="xsm:text-xs  block  dark:text-[#BABABF] lg:text-lg">of the impact technology has on our lives.</span>
                    </div>
                    <div className='xsm:flex justify-center items-center space-x-2 mt-2 lg:mt-5'>
                      <div className='bg-gray-300 dark:bg-custom-gray-2 rounded-lg w-[32px] h-[32px]'></div>
                      <div className='bg-gray-300 dark:bg-custom-gray-2 rounded-lg w-[32px] h-[32px]'></div>
                      <div className='bg-gray-300 dark:bg-custom-gray-2 rounded-lg w-[32px] h-[32px]'></div>
                      <div className='bg-gray-300 dark:bg-custom-gray-2 rounded-lg w-[32px] h-[32px]'></div>
                    </div>
              </div>
                                             
                                            {/* LATEST POSTS WALA SECTION */}
           
           <div className='xsm:font-bold text-2xl text-white mt-10 ml-[13%] '>Latest Post</div>
           
                                              {/* griding here below: */}
                                              
         
      {/* Grid of Blogs */}
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

      {/* Load More Button */}
      
      {displayCount < blogs.length && (
        <div className="flex justify-center mt-10">
          <button
            className="text-white bg-blue-500 px-6 py-2 rounded-md"
            onClick={loadMoreBlogs}
          >
            Load More
          </button>
        </div>
      )}

        
         <div className='mt-8 flex justify-center items-center'>
        
            
         </div>
         
         <div className='flex justify-center  '>
            <div className='bg-custom-gray-3 dark:bg-custom-dark2 flex flex-col mt-20 items-center w-[50%] rounded-xl p-3'>
                  <p className=' text-[#696A75]  '>Advertisement</p>
                  <p className=' text-[#696A75] text-xl  font-semibold '>You can place ads</p>
                  <p className=' text-[#696A75]  '>750x100</p>
            </div>
         </div>
         
         
         
        
            <div className='xsm:dark:bg-custom-dark border-t border-b border-solid border-t-slate-800 border-b-slate-800 min-h-screen mt-20 text-custom-dark dark:text-white ' >
             
              <div className='hidden lg:flex justify-center items-center space-x-36 mt-14'>

              
                      <div className='p-4 '>
                        <p className='font-semibold  text-[18px]'>About</p>
                        <p className=' w-[260px] mt-5'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                        <p className='font-semibold mt-5'>Email : <span className='text-[#97989F]'>info@jstemplate.net</span> </p>
                        <p className='font-semibold '>Phone : <span className='text-[#97989F]'>880 123 456 789</span> </p>

                    </div>
                                                                      {/* ABOUT KI DIV ABOVE */}
                    
                    <div className='flex flex-col'>
                      <h1 className=' text-[18px] font-semibold'>Quicklink</h1>
                    <ul className=' mt-4 space-y-2'>

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
                      <h1  className=' text-[18px] font-semibold'>Category</h1>
                      <ul className=' mt-4 space-y-2'>
                        <li>Lifestyle</li>
                        <li>Technology</li>
                        <li>Travel</li>
                        <li>Business</li>
                        <li>Economy</li>
                        <li>Sports</li>
                      </ul>
                    </div>
                                                                        {/*Category KI DIV ABOVE  */}
                    <div className=' rounded-lg p-[32px] w-[390px] h-[254px] bg-custom-gray-3  dark:bg-custom-dark2'>
                      <div className='flex flex-col justify-center items-center'>
                          <h1 className='font-semibold  text-[20px]'>Weekly Newsletter</h1>
                          <p className='font-[#97989F] font-normal  '>Get blog articles and offers via email</p>
                      </div>
                    
                      <input type="text" placeholder='Your Email' className='rounded-md border-solid border border-[#3B3C4A] text-[#97989F] dark:text-custom-dark2 block py-[12px] px-[16px] w-[320px] mt-7' />
                      <button className='rounded-md p-2 text-white font-semibold bg-[#4B6BFB] py-[12px] px-[16px] w-[320px] mt-2'>Subscribe</button>

                    </div>
                                                                        {/* Weekly Newsletter KI DIV ABOVE  */}
                    </div>
                            <hr className="border-t-1 border-[#3B3C4A] w-[1275px] mx-auto mt-10" />
                    <div className='xsm:flex flex-col justify-around items-center lg:flex bg-custom-gray-3 dark:bg-custom-dark2 '>
                           
                           
                            <div className='xsm:w-[305px] mt-10 text-center'>
                              <h1 className='text-white text-xl '>Meta<span className='text-white font-extrabold'>Blog</span></h1>
                              <p className='hidden lg:flex text-white text-[16px]'>© JS Template <span className='text-[#BABABF]'>2024. All Rights Reserved.</span></p>
                            </div>
                                                                        {/* LOGO AND TRADEMARKS */}
                            <div className='flex items-center text-[#BABABF] mt-[70px]'>
                              
                              <span>Terms of Use</span>
                              <div className='w-[24px] -rotate-90 border-solid border border-[#3B3C4A] mx-2'></div>
                              <span  className="">Privacy Policy</span>
                              <div className="w-[24px] -rotate-90 border-solid border border-[#3B3C4A] mx-2"></div>
                              <span>Cookie Policy</span>

                            </div>
                                                                        {/* TOS COOKIES ETC */}

                    </div>
            </div>
  </div>

  )
}

export default Pages