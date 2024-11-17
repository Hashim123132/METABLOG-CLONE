import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import blogs from './blogData';

const AuthorBio = () => {
  const { authorName } = useParams(); // Get author name from the URL params

  // Sanitize author name to match the profile picture file name
  const profilePicture = `/IMAGES/${authorName.replace(/\s/g, '').toLowerCase()}.jpeg`; // Profile picture path

  // Filter blogs by the author name from URL
  const authorBlogs = blogs.filter(blog =>
    blog.author.replace(/\s/g, '').toLowerCase() === authorName.replace(/\s/g, '').toLowerCase()
  );

  // If no blogs are found for this author
  if (authorBlogs.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold">No blogs found for this author.</h2>
        {/* Render an empty card with a + sign if no blogs are found */}
        <div className="border-solid border border-slate-800 rounded-xl w-[392px] h-[488px] p-4 flex items-center justify-center bg-gray-100 mt-6">
          <span className="text-4xl font-bold text-gray-500">+</span>
        </div>
      </div>
    );
  }

  // Default author info if blogs exist
  const authorInfo = {
    name: authorBlogs[0].author, // Set author name dynamically from first blog
    bio: 'This is the author bio. Add more details about the author here.',
    profilePicture: `/IMAGES/${authorName.replace(/\s/g, '').toLowerCase()}.jpeg`, // Dynamically load profile picture
  };

  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
      {/* Author Bio Section */}
      <div className="flex items-center space-x-4 mb-8 bg-custom-gray rounded-xl h-[200px] p-[100px]">
        <img 
          src={authorInfo.profilePicture || '/IMAGES/default-profile.jpg'} 
          alt={authorInfo.name} 
          className="w-16 h-16 rounded-full" 
        />
        <div>
          <h2 className="text-3xl font-bold">{authorInfo.name}</h2>
          <p className="text-gray-600">{authorInfo.bio}</p>
        </div>
      </div>

      {/* Author's Blogs Section */}
      <h3 className="text-2xl font-semibold mb-4">Blogs by {authorInfo.name}</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Render blogs */}
        {authorBlogs.map(blog => (
          <div key={blog.id} className="border-solid border border-slate-800 rounded-xl w-[392px] h-[488px] p-4">
            <Link to={`/blog/${blog.id}`} className="block">
              <img 
                className="rounded-xl"
                src={blog.image} 
                alt={blog.title} 
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{blog.title}</h3>
                <div className="flex space-x-4 mt-4 items-center">
                  <img src={profilePicture} alt={blog.author} className="w-10 h-10 rounded-full" />
                  <span className="font-semibold text-gray-400">{blog.author}</span>
                  <span className="text-blue-500 text-sm hover:underline">Read more</span>
                </div>
              </div>
            </Link>
          </div>
        ))}

        {/* Display empty card with "+" if no blogs */}
        {authorBlogs.length === 0 && (
          <div className="border-solid border border-slate-800 rounded-xl w-[392px] h-[488px] p-4 flex items-center justify-center bg-gray-100 mt-6">
            <span className="text-4xl font-bold text-gray-500">+</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorBio;
