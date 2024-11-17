import React, { useState } from 'react'
import Blog from './Blog';
import blogs from './blogData';

const Home = () => {
  // Set initial number of blogs to display
  const [displayCount, setDisplayCount] = useState(6); 

  // Function to load more blogs
  const loadMoreBlogs = () => {
    setDisplayCount(displayCount + 6); 
  };

  return (
    <div className="overflow-x-hidden lg:overflow-x-auto dark:bg-custom-dark dark:text-white">
      
      {/* Image Section */}
      <div className='relative'>
        <img
          className='xsm: h-[239px] w-[400px] object-cover ml-[15px] rounded-lg mt-8 lg:h-[550px] lg:w-[1216px] lg:mx-auto'
          src="/IMAGES/0ba138a3797a763d4510333166532abb.jpeg"
          alt=""
        />
        {/* Blog Post Description */}
        <div className='xsm: dark:bg-custom-dark dark:text-white dark:border-solid dark:border-[#242535] absolute inset-72 left-[10px] bg-white h-[139px] -mt-[90px] ml-[50px] xsm:w-[310px] p-5 rounded-xl flex flex-col items-center border-solid border border-[#E8E8EA] lg:left-[300px] lg:h-[285px] lg:mt-10 lg:w-[598px] lg:p-10'>
          <h2 className='xsm:text-white text-xs bg-[#4B6BFB] rounded-lg mr-auto p-1 mb-3 lg:text-base'>Technology</h2>
          <p className='xsm:font-semibold text-xs lg:text-3xl'>The Impact of Technology on the Workplace: How Technology is Changing</p>
          <div className='xsm:flex space-x-4 items-center pt-2 text-xs lg:mr-auto lg:pt-5 lg:text-base'>
            <img className='w-[13px] -ml-[55px] rounded-full lg:w-10 lg:-ml-[5px]' src="./IMAGES/jasonfrancisco.jpeg" alt="" />
            <p className=''>Jason Francisco</p>
            <p className=''>August 20, 2022</p>
          </div>
        </div>
      </div>
      
      {/* Advertisement Section */}
      <div className='flex justify-center'>
        <div className='bg-[#E8E8EA] dark:bg-[#242535] flex flex-col mt-40 items-center w-[50%] rounded-xl p-3'>
          <p className='text-custom-gray-2'>Advertisement</p>
          <p className='text-custom-gray-2 text-xl font-semibold'>You can place ads</p>
          <p className='text-custom-gray-2'>750x100</p>
        </div>
      </div>

      {/* Latest Posts Section */}
      <div className='xsm:font-bold text-2xl text-white mt-10 ml-[90px]'>Latest Post</div>

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

      {/* Footer Section */}
      <div className='xsm:dark:bg-custom-dark text-white border-t border-b border-solid border-t-[#E8E8EA] border-b-[#E8E8EA] min-h-screen mt-20'>
        <div className='hidden lg:flex justify-center items-center space-x-36 mt-14'>
          <div className='p-4'>
            <p className='font-semibold text-custom-gray-2 text-[18px]'>About</p>
            <p className='text-[#97989F] w-[260px] mt-5'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
            </p>
            <p className='font-semibold text-custom-gray-2 mt-5'>
              Email : <span className='text-[#97989F]'>info@jstemplate.net</span>
            </p>
            <p className='font-semibold text-custom-gray-2'>
              Phone : <span className='text-[#97989F]'>880 123 456 789</span>
            </p>
          </div>

          {/* Quicklink Section */}
          <div className='flex flex-col dark:bg-custom-dark dark:text-white'>
            <h1 className='text-custom-gray-2 text-[18px] font-semibold'>Quicklink</h1>
            <ul className='text-[#BABABF] mt-4 space-y-2'>
              <li>Home</li>
              <li>About</li>
              <li>Blog</li>
              <li>Archived</li>
              <li>Author</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Category Section */}
          <div>
            <h1 className='text-custom-gray-2 text-[18px] font-semibold'>Category</h1>
            <ul className='text-[#BABABF] mt-4 space-y-2'>
              <li>Lifestyle</li>
              <li>Technology</li>
              <li>Travel</li>
              <li>Business</li>
              <li>Economy</li>
              <li>Sports</li>
            </ul>
          </div>

          {/* Weekly Newsletter Section */}
          <div className='bg-[#E8E8EA] dark:bg-[#242535] rounded-lg p-[32px] w-[390px] h-[254px]'>
            <div className='flex flex-col justify-center items-center'>
              <h1 className='font-semibold text-custom-gray-2 text-[20px]'>Weekly Newsletter</h1>
              <p className='font-[#97989F] font-normal text-slate-500'>Get blog articles and offers via email</p>
            </div>

            <input
              type="text"
              placeholder='Your Email'
              className='rounded-md border-solid border dark:bg-custom-dark dark:text-[#3B3C4A] border-[#E8E8EA] text-black placeholder:text-gray-600 bg-[#c5c5c7] block py-[12px] px-[16px] w-[320px] mt-7'
            />
            <button className='rounded-md p-2 text-white font-semibold bg-[#4B6BFB] py-[12px] px-[16px] w-[320px] mt-2'>
              Subscribe
            </button>
          </div>
        </div>
        
        {/* Footer Bottom Section */}
        <hr className="border-t-1 border-slate-400 w-[1275px] mx-auto mt-10" />
        <div className='flex justify-around items-center'>
          <div className='w-[305px] mt-10 ml-7'>
            <h1 className='text-[#141624] text-xl text-center dark:text-white'>
              Meta<span className='font-extrabold'>Blog</span>
            </h1>
            <p className='hidden lg:block text-[#3B3C4A] text-[16px]'>
              © JS Template <span className='text-[#3B3C4A]'>2024. All Rights Reserved.</span>
            </p>
          </div>

          {/* Terms, Privacy, Cookie Links */}
          <div className='flex items-center text-[#BABABF] mt-[70px]'>
            <span>Terms of Use</span>
            <div className='w-[24px] -rotate-90 border-solid border border-[#BABABF] mx-2'></div>
            <span>Privacy Policy</span>
            <div className="w-[24px] -rotate-90 border-solid border border-[#BABABF] mx-2"></div>
            <span>Cookie Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
