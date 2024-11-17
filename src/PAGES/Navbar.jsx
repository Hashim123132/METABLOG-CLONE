import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  // Check if the user is authenticated
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null; // User is authenticated if token exists
  };

  return (
    <header className='h1'>
      <nav className='xsm:flex items-center justify-center text-[#141624] mt-3 dark:bg-custom-dark dark:text-white'>
        <div className='lg:flex items-center justify-center'>
          {/* Title as Home Page Link */}
          <div className='xsm:text-xl text-center'>
            <NavLink to="/" className="font-extrabold text-[#141624] dark:text-white">
              Meta<span className='font-bold'>Blog</span>
            </NavLink>
          </div>

          <div>
            <ul className='xsm:flex justify-around space-x-7 lg: flex items-center ml-10 mt-[5px]'>
              <li><NavLink to='/'>Home</NavLink></li>
              <li><NavLink to='/Blog'>Blog</NavLink></li>
              <li><NavLink to='/SinglePost'>Single Post</NavLink></li>
              <li><NavLink to='/Pages'>Pages</NavLink></li>
              <li><NavLink to='/Contact'>Contact</NavLink></li>

              <li><NavLink to='/Dashboard'>Dashboard</NavLink></li>
            </ul>
          </div>
        </div>

        <div>
          <input
            type="text"
            placeholder='Search'
            className='hidden lg:flex pl-3 bg-[#F4F4F5] ml-32 p-2 rounded-md dark:bg-[#242535]'
          />
        </div>

        <div className="ml-[200px]">
          {/* Made btn routes */}
          {!isAuthenticated() ? (
            <>
              <NavLink
                className="mx-2 px-[20px] py-[10px] rounded-md bg-[#4B6BFB] transition-opacity duration-300 hover:opacity-80 text-white"
                to="/Login"
                role='button'
              >
                Login
              </NavLink>
              <NavLink
                className="mx-2 px-[20px] py-[10px] rounded-md bg-[#4B6BFB] transition-opacity duration-300 hover:opacity-80 text-white"
                to="/Signup"
                role='button'
              >
                SignUp
              </NavLink>
            </>
          ) : (
            // Optionally add a Logout button if the user is authenticated
            <NavLink
              className="mx-2 px-[20px] py-[10px] rounded-md bg-[#4B6BFB] transition-opacity duration-300 hover:opacity-80 text-white"
              to="/Login"
              role='button'
              onClick={() => {
                localStorage.removeItem('token'); // Remove the token on logout
                window.location.reload(); // Refresh the page to reflect logout
              }}
            >
              Logout
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
