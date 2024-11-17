import React from "react";
import { useParams } from "react-router-dom"; // Import useParams to get the blog ID from the URL
import { getBlogById } from "./blogData"; // Import the function to get blog data
import { useNavigate } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams(); // Get the blog ID from the URL params
  const blog = getBlogById(id); // Fetch the blog data using the ID

  const navigate = useNavigate();

  if (!blog) {
    return <div>Blog not found</div>; // Handle case if blog doesn't exist
  }

  const handleBackToHome = () => {
    navigate('/');  // Navigate back to the Home page
  };

  const handleAuthorPage = () => {
    navigate(`/author/${blog.author.replace(/\s/g, '').toLowerCase()}`); // Navigate to the Author page
  };

  const authorImage = `/IMAGES/${blog.author.replace(/\s/g, '').toLowerCase()}.jpeg`;
  const defaultImage = '/IMAGES/default-author.jpg'; // Fallback image if not found

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col mb-6"> {/* Added margin-bottom to separate the flexed items */}
        {/* Blog Tag */}
        <h1 className="xsm:text-xs bg-[#4B6BFB] rounded-md mr-auto py-[6px] px-[12px] mb-4 mt-[60px]">
          {blog.tag}
        </h1>
        
        {/* Blog Title */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{blog.title}</h1>
      </div>
      
      {/* Author Section */}
      <div className="flex items-center space-x-4 mb-6">
        <img 
          src={authorImage} 
          onError={(e) => e.target.src = defaultImage} // Fallback for image error
          alt={blog.author} 
          className="w-12 h-12 rounded-full cursor-pointer"
          onClick={handleAuthorPage} // Clicking on the author's image navigates to the author page
        />
        <div>
          <p 
            className="text-lg text-gray-600 dark:text-gray-300 cursor-pointer"
            onClick={handleAuthorPage} // Clicking on the author's name navigates to the author page
          >
            {blog.author}
          </p>
          <p className="text-sm text-gray-500">{blog.date || "August 20, 2022"}</p>
        </div>
      </div>
      
      {/* Blog Image */}
      <img src={blog.image} alt={blog.title} className="xsm:h-[239px] w-[400px]   rounded-xl object-cover lg:w-[800px] lg:h-[462px] " />
      
      {/* Blog Content */}
      <p className="text-gray-700 dark:text-gray-300">{blog.content}</p>

      {/* Back to Home button */}
      <button 
        onClick={handleBackToHome} 
        className="mt-4 p-2 ml-[700px] bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Back to Home
      </button>
    </div>
  );
};

export default BlogDetail;
