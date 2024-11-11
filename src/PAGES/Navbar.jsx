import React from "react"
import { NavLink } from "react-router-dom"

const Navbar = () => {
    return(

     <header className='h1'>
        <nav className='xsm:flex items-center justify-center  text-white mt-3  '>
          
          <div className='lg:flex items-center justify-center '>
                  
            <div className='xsm:text-white text-xl text-center '>Meta
              
              <span className='font-extrabold '>Blog</span> 
              
              </div>
            
              <div >

                  <ul className='xsm:flex justify-around space-x-7 lg: flex items-center ml-10 mt-[5px] '>
                    <li ><NavLink to='/' >Home</NavLink></li>
                    <li ><NavLink  to='Blog'>Blog</NavLink></li>
                    <li > <NavLink to='singlePost'>Single Post</NavLink></li>
                    <li ><NavLink to='Pages'>Pages</NavLink></li>
                    <li ><NavLink to='Contact'>Contact</NavLink></li>
                  </ul>
              </div>
            </div>            
          

          
          

          <div>
          <input type="text" placeholder='Search' className='hidden lg:flex pl-3 bg-custom-gray ml-32 p-2 rounded-md' />
          </div>
          <div className="ml-[200px]">

            {/* Made btn routes */}
              <NavLink className=" mx-2 px-[20px] py-[10px] rounded-md bg-[#4B6BFB] transition-opacity duration-300 hover:opacity-80" to="/Login" role='button'>Login</NavLink>
              <NavLink className=" mx-2 px-[20px] py-[10px] rounded-md bg-[#4B6BFB] transition-opacity duration-300 hover:opacity-80" to="/Signup" role='button'>SignUp</NavLink>
            </div>
      


      </nav>

      </header>
)
}
export default Navbar

