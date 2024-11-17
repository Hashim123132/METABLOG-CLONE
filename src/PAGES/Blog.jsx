import React from 'react';
import { Link } from 'react-router-dom';

const Blog = ({ title, image, author, id }) => {
  // Creating the profile picture path dynamically based on author name
  const profilePicture = `/IMAGES/${author.replace(/\s/g, '').toLowerCase()}.jpeg`;

  return (
    <div className="xsm:grid grid-cols-1 lg:grid lg:grid-cols-3 mt-8 transition-all duration-300 ease-in-out hover:scale-105">
      {/* Each individual blog card */}
      <div className="border-solid border border-gray-300 dark:border-slate-800 rounded-xl w-[392px] h-[488px] p-4">
        {/* Link for the blog image and title */}
        <Link to={`/blog/${id}`} className="block">
          <img className="rounded-xl" src={image} alt={title} />
          <div className="p-4">
            <h3 className="text-xl font-semibold">{title}</h3>
          </div>
        </Link>

        {/* Author and Read More Links */}
        <div className="flex space-x-5 items-center mt-[40px]">
          {/* Link for the author */}
          <Link to={`/author/${author.replace(/\s/g, '').toLowerCase()}`} className="flex items-center justify-between space-x-4">
            <img src={profilePicture} alt={author} className="w-10 h-10 rounded-full" />
            <span className="text-custom-dark dark:text-gray-400 font-semibold">{author}</span>
          </Link>

          {/* Link for the "Read more" */}
          <Link to={`/blog/${id}`} className="text-blue-500 hover:underline">Read more</Link>
        </div>
      </div>
    </div>
  );
};

export default Blog;
