import React from 'react'



const Home = () => {
  return (
    <div className='overflow-x-hidden lg:overflow-x-auto' >
      
                                   
              <div className='relative  '>
                  <img className='xsm: h-[239px] w-[400px] object-cover ml-[15px] rounded-lg mt-8 lg:h-[550px]  lg:w-[1216px] lg:mx-auto ' src="/IMAGES/0ba138a3797a763d4510333166532abb.jpeg" alt="" />
                       
                                                                          {/*IMAGE 1 SECTIONcd  SYNTAX FOR PAGE 2 AS WELL  JUST REMOVE THIS FIRST DIV*/}
                        <div className='xsm: absolute inset-72 left-[10px]  bg-custom-dark text-white h-[139px] -mt-[90px] ml-[50px] xsm: w-[310px] p-5 rounded-xl flex flex-col items-center border-solid border border-slate-800  lg:left-[300px]  lg:h-[285px] lg:mt-10 lg:w-[598px] lg:p-10'>
                              <h2 className=' xsm: text-xs bg-[#4B6BFB] rounded-lg mr-auto p-1 mb-3 lg:text-base'>Technology</h2>
                              <p className='xsm:font-semibold text-xs w-[518] lg:text-3xl '>The Impact of Technology on the Workplace: How Technology is Changing</p>
                              <div className='xsm:flex space-x-4 items-center pt-2 text-xs lg:mr-auto lg:pt-5 lg:text-base'>
                              <img className='w-[13px] -ml-[55px] rounded-full lg:w-10 lg:-ml-[5px]' src="./IMAGES/9a54dc57c3bfdd71f8ab78628ef9ac9a.jpeg" alt="" />
                                  <p className=''>Jason Francisco</p>
                                  <p className=''>August 20, 2022</p>
                              </div>
                        </div>

               </div>
                                                 
               <div className='flex justify-center '>
                <div className='bg-[#242535] flex flex-col mt-40 items-center w-[50%] rounded-xl p-3 '>
                      <p className='bg-custom-gray text-[#696A75]  '>Advertisement</p>
                      <p className='bg-custom-gray text-[#696A75] text-xl  font-semibold '>You can place ads</p>
                      <p className='bg-custom-gray text-[#696A75]  '>750x100</p>
                </div>
             </div>
                                                {/* LATEST POSTS WALA SECTION */}
               
               <div className='xsm:font-bold text-2xl text-white mt-10 ml-[13%] '>Latest Post</div>
               
                                                  {/* griding here below: */}
                                                  
               <div className='xsm:grid grid-cols-1  px-[35px] mt-8 lg:grid lg:grid-cols-3  lg:px-[210px]'>
                
                  <div className='xsm:border-solid border  border-slate-800 rounded-xl w-[352px] h-[488px] p-4  lg:w-[392px]  '>
                    <img className=' rounded-xl  ' src="./IMAGES/585632b9d05dcfd0daffacedd55842f5.jpeg" alt="" />
                    <p className='  text-[#4B6BFB] bg-[#4B6BFB0D] rounded-lg mr-auto p-1 ml-2 mb-3 mt-6 flex justify-center w-[30%] '>Technology</p>
                    <p className='text-white font-semibold text-2xl ml-2'>The Impact of Technology on the Workplace: How Technology is Changing</p>
                  
                    <div className='xsm:flex items-center  justify-center space-x-5 -ml-[60px] mt-3 : '>
                      <img className='w-[36px] rounded-full ml-10 lg:-ml-1' src="/IMAGES/faedfd7f834c47ba118f3895ffc519cd.jpeg" alt="" />
                      <p className='text-[#97989F] font-medium'>Tracey Wilson</p>
                      <p className='text-[#97989F] font-normal'>August 20, 2022</p>
                    </div>

                  </div>
                                                {/* GRID  1  IMAGE  ABOVE HERE */}

                  <div className='xsm:border-solid border  border-slate-800 rounded-xl w-[352px] h-[488px] p-4 lg:w-[392px] '>
                    <img className=' rounded-xl w-[100%] h-[53%] object-cover' src="./IMAGES/67369b797c8fb2e96a533fd515fb2939.jpeg" alt="" />
                    <p className='  text-[#4B6BFB] bg-[#4B6BFB0D] rounded-lg mr-auto p-1 ml-2 mb-3 mt-6 flex justify-center w-[30%] '>Technology</p>
                    <p className='text-white font-semibold text-2xl ml-2'>The Impact of Technology on the Workplace: How Technology is Changing</p>
                  
                    <div className='xsm:flex items-center  justify-center space-x-5  -ml-[40px] mt-3 '>
                      <img className='w-[36px] rounded-full ml-10  lg:-ml-1' src="/IMAGES/9a54dc57c3bfdd71f8ab78628ef9ac9a.jpeg" alt="" />
                      <p className='text-[#97989F] font-medium'>Jason Francisco</p>
                      <p className='text-[#97989F] font-normal'>August 20, 2022</p>
                    </div>
                                                              {/* GRID IMAGE 2 ABOVE HERE added here  h and w */}
                  </div>
                                                  {/* GRID 2 IMAGE ABOVE HERE */}

                  <div className='xsm:border-solid border  border-slate-800 rounded-xl w-[352px] h-[488px] p-4 lg:w-[392px]'>
                    <img className=' rounded-xl object-cover' src="./IMAGES/47643788a57b79a4aa1d6c6db76208a5.jpeg" alt="" />
                    <p className='  text-[#4B6BFB] bg-[#4B6BFB0D] rounded-lg mr-auto p-1 ml-2 mb-3 mt-6 flex justify-center w-[30%] '>Technology</p>
                    <p className='text-white font-semibold text-2xl ml-2'>The Impact of Technology on the Workplace: How Technology is Changing</p>
                  
                    <div className='xsm:flex items-center  justify-center space-x-5 -ml-[60px] mt-3'>
                      <img className='w-[36px] rounded-full ml-10  lg:-ml-1' src="/IMAGES/faedfd7f834c47ba118f3895ffc519cd.jpeg" alt="" />
                      <p className='text-[#97989F] font-medium'>Tracey Wilson</p>
                      <p className='text-[#97989F] font-normal'>August 20, 2022</p>
                    </div>

                  </div>
                                                  {/* GRID 3 IMAGE ABOVE HERE */}

                  <div className='xsm:border-solid border mt-5 border-slate-800 rounded-xl w-[352px] h-[488px] p-4 lg:w-[392px]'>
                    <img className=' rounded-xl object-cover w-[100%] h-[239px]' src="./IMAGES/d484b871abb15e732abb0a69f2ccd525.jpeg" alt="" />
                    <p className='  text-[#4B6BFB] bg-[#4B6BFB0D] rounded-lg mr-auto p-1 ml-2 mb-3 mt-6 flex justify-center w-[30%] '>Technology</p>
                    <p className='text-white font-semibold text-2xl ml-2'>The Impact of Technology on the Workplace: How Technology is Changing</p>
                  
                    <div className='xsm:flex items-center  justify-center space-x-5 -ml-20 mt-3'>
                      <img className='w-[36px] rounded-full ml-10 lg:-ml-1' src="/IMAGES/d185cf9e5357b2ca38597c49da427202.jpeg" alt="" />
                      <p className='text-[#97989F] font-medium'>Ernie Smith</p>
                      <p className='text-[#97989F] font-normal'>August 20, 2022</p>
                    </div>

                  </div>
                                                {/* GRID IMAGE 4 ABOVE HERE */}

                  <div className='xsm:border-solid border mt-5 border-slate-800 rounded-xl w-[352px] h-[488px] p-4 lg:w-[392px]'>
                    <img className=' object-cover rounded-xl w-[100%] h-[239px]' src="./IMAGES/94d6445161ab63109e6e813699b61984.jpeg" alt="" />
                    <p className='  text-[#4B6BFB] bg-[#4B6BFB0D] rounded-lg mr-auto p-1 ml-2 mb-3 mt-6 flex justify-center w-[30%] '>Technology</p>
                    <p className='text-white font-semibold text-2xl ml-2'>The Impact of Technology on the Workplace: How Technology is Changing</p>
                  
                    <div className='xsm:flex items-center  justify-center space-x-5 -ml-[95px] mt-3 '>
                      <img className='w-[36px]  rounded-full ml-10 lg:-ml-1' src="/IMAGES/7fcc05b14bc2fd8af4f1a55d22542875.jpeg" alt="" />
                      <p className='text-[#97989F] font-medium'>Eric Smith</p>
                      <p className='text-[#97989F] font-normal'>August 20, 2022</p>
                    </div>
                                                              {/* GRID IMAGE 5 ABOVE HERE added here  h and w */}
                  </div>
                                                 {/* GRID 5 IMAGE ABOVE HERE */}

                  <div className='xsm:border-solid border mt-5 border-slate-800 rounded-xl w-[352px] h-[488px] p-4 lg:w-[392px]'>
                    <img className=' object-cover rounded-xl w-[100%] h-[53%]  object-bottom ' src="./IMAGES/dc5bf5a2de00232ed3b7e18eadcbe03a.jpeg" alt="" />
                    <p className='  text-[#4B6BFB] bg-[#4B6BFB0D] rounded-lg mr-auto p-1 ml-2 mb-3 mt-6 flex justify-center w-[30%] '>Technology</p>
                    <p className='text-white font-semibold text-2xl ml-2'>The Impact of Technology on the Workplace: How Technology is Changing</p>
                  
                    <div className='xsm:flex items-center  justify-center space-x-5 -ml-[60px] mt-3'>
                      <img className='w-[10%] rounded-full ml-10 lg:-ml-1' src="/IMAGES/faedfd7f834c47ba118f3895ffc519cd.jpeg" alt="" />
                      <p className='text-[#97989F] font-medium'>Tracey Wilson</p>
                      <p className='text-[#97989F] font-normal'>August 20, 2022</p>
                    </div>

                  </div>
                                                 {/* GRID 6 IMAGE ABOVE HERE */}

                  <div className='xsm:border-solid border mt-5 border-slate-800 rounded-xl w-[352px] h-[488px] p-4 lg:w-[392px]'>
                    <img className=' rounded-xl w-[100%] h-[53%] object-cover' src="./IMAGES/0ba138a3797a763d4510333166532abb.jpeg" alt="" />
                    <p className='  text-[#4B6BFB] bg-[#4B6BFB0D] rounded-lg mr-auto p-1 ml-2 mb-3 mt-6 flex justify-center w-[30%] '>Technology</p>
                    <p className='text-white font-semibold text-2xl ml-2'>The Impact of Technology on the Workplace: How Technology is Changing</p>
                  
                    <div className='xsm:flex items-center  justify-center space-x-5  -ml-[40px] mt-3'>
                      <img className='w-[36px] rounded-full ml-10 lg:-ml-1' src="/IMAGES/9a54dc57c3bfdd71f8ab78628ef9ac9a.jpeg" alt="" />
                      <p className='text-[#97989F] font-medium'>Jason Francisco</p>
                      <p className='text-[#97989F] font-normal'>August 20, 2022</p>
                    </div>

                  </div>
                                                 {/* GRID IMAGE 7 ABOVE HERE */}

                  <div className='xsm:border-solid border mt-5 border-slate-800 rounded-xl w-[352px] h-[488px] p-4 lg:w-[392px]'>
                    <img className=' object-cover rounded-xl w-[100%] h-[53%] ' src="./IMAGES/47643788a57b79a4aa1d6c6db76208a5.jpeg" alt="" />
                    <p className='  text-[#4B6BFB] bg-[#4B6BFB0D] rounded-lg mr-auto p-1 ml-2 mb-3 mt-6 flex justify-center w-[30%] '>Technology</p>
                    <p className='text-white font-semibold text-2xl ml-2'>The Impact of Technology on the Workplace: How Technology is Changing</p>
                  
                    <div className='xsm:flex items-center  justify-center space-x-5 -ml-[60px] mt-3'>
                      <img className='w-[36px] rounded-full ml-10 lg:-ml-1' src="/IMAGES/faedfd7f834c47ba118f3895ffc519cd.jpeg" alt="" />
                      <p className='text-[#97989F] font-medium'>Tracey Wilson</p>
                      <p className='text-[#97989F] font-normal'>August 20, 2022</p>
                    </div>
                                              {/* GRID IMAGE 8 ABOVE HERE added here  h and w */}
                  </div>
                                                  {/* GRID 8 IMAGE ABOVE HERE */}

                  <div className='xsm:border-solid border mt-5 border-slate-800 rounded-xl w-[352px] h-[488px] p-4 lg:w-[392px]'>
                    <img className=' object-cover rounded-xl w-[100%] h-[53%]  ' src="./IMAGES/16e4297057a78fcd78323914d00b0bf8.jpeg" alt="" />
                    <p className='  text-[#4B6BFB] bg-[#4B6BFB0D] rounded-lg mr-auto p-1 ml-2 mb-3 mt-6 flex justify-center w-[30%] '>Technology</p>
                    <p className='text-white font-semibold text-2xl ml-2'>The Impact of Technology on the Workplace: How Technology is Changing</p>
                  
                    <div className='flex items-center  justify-center space-x-5 -ml-20 mt-3'>
                      <img className='xsm:w-[36px] rounded-full ml-10 lg:-ml-1' src="/IMAGES/d185cf9e5357b2ca38597c49da427202.jpeg" alt="" />
                      <p className='text-[#97989F] font-medium'>Ernie Smith</p>
                      <p className='text-[#97989F] font-normal'>August 20, 2022</p>
                    </div>


                  </div>
                                                 {/* GRID 9 IMAGE ABOVE HERE */}
              </div>
            
             <div className='mt-8 flex justify-center items-center'>
            
              <button className='bg-custom-dark  text-[#696A75] font-medium border border-solid border-slate-800 py-3 px-5 rounded-lg '>View All Post</button>
                
             </div>
             
             <div className='flex justify-center'>
                <div className='bg-[#242535] flex flex-col mt-20 items-center w-[50%] rounded-xl p-3'>
                      <p className='bg-custom-gray text-[#696A75]  '>Advertisement</p>
                      <p className='bg-custom-gray text-[#696A75] text-xl  font-semibold '>You can place ads</p>
                      <p className='bg-custom-gray text-[#696A75]  '>750x100</p>
                </div>
             </div>
             
             
             
            
                <div className='xsm:bg-[#141624] border-t border-b border-solid border-t-slate-800 border-b-slate-800 min-h-screen mt-20 ' >
                 
                  <div className='hidden lg:flex justify-center items-center space-x-36 mt-14'>

                  
                          <div className=' p-4 '>
                            <p className='font-semibold text-white text-[18px]'>About</p>
                            <p className='text-[#97989F] w-[260px] mt-5'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                            <p className='font-semibold text-white mt-5'>Email : <span className='text-[#97989F]'>info@jstemplate.net</span> </p>
                            <p className='font-semibold text-white'>Phone : <span className='text-[#97989F]'>880 123 456 789</span> </p>

                        </div>
                                                                          {/* ABOUT KI DIV ABOVE */}
                        
                        <div className='flex flex-col'>
                          <h1 className='text-white text-[18px] font-semibold'>Quicklink</h1>
                        <ul className='text-[#BABABF] mt-4 space-y-2'>

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
                          <h1  className='text-white text-[18px] font-semibold'>Category</h1>
                          <ul className='text-[#BABABF] mt-4 space-y-2'>
                            <li>Lifestyle</li>
                            <li>Technology</li>
                            <li>Travel</li>
                            <li>Business</li>
                            <li>Economy</li>
                            <li>Sports</li>
                          </ul>
                        </div>
                                                                            {/*Category KI DIV ABOVE  */}
                        <div className='bg-[#242535] rounded-lg p-[32px] w-[390px] h-[254px]'>
                          <div className='flex flex-col justify-center items-center'>
                              <h1 className='font-semibold text-white text-[20px]'>Weekly Newsletter</h1>
                              <p className='font-[#97989F] font-normal text-[#97989F] '>Get blog articles and offers via email</p>
                          </div>
                        
                          <input type="text" placeholder='Your Email' className='rounded-md border-solid border border-[#3B3C4A] text-[#97989F] bg-[#181A2A] block py-[12px] px-[16px] w-[320px] mt-7' />
                          <button className='rounded-md p-2 text-white font-semibold bg-[#4B6BFB] py-[12px] px-[16px] w-[320px] mt-2'>Subscribe</button>

                        </div>
                                                                            {/* Weekly Newsletter KI DIV ABOVE  */}
                        </div>
                                <hr className="border-t-1 border-[#3B3C4A] w-[1275px] mx-auto mt-10" />
                        <div className='flex justify-around items-center'>
                               
                               <div>

                                  <div className='w-[305px] mt-10 ml-7'>
                                    <h1 className='text-white text-xl text-center'>Meta<span className='text-white font-extrabold '>Blog</span></h1>
                                    <p className='hidden  lg:block text-white text-[16px]'>© JS Template <span className='text-[#BABABF]'>2024. All Rights Reserved.</span></p>
                                  </div>
                                                                              {/* LOGO AND TRADEMARKS */}
                                  <div className='flex items-center text-[#BABABF] mt-[70px]'>
                                    
                                    <span>Terms of Use</span>
                                    <div className='w-[24px] -rotate-90 border-solid border border-[#3B3C4A] mx-2'></div>
                                    <span  className="">Privacy Policy</span>
                                    <div className="w-[24px] -rotate-90 border-solid border border-[#3B3C4A] mx-2"></div>
                                    <span>Cookie Policy</span>

                                  </div>
                               </div>
                                                                            {/* TOS COOKIES ETC */}

                        </div>
                </div>
      </div>
  
  )
}

export default Home