  import React, { useState, useEffect } from "react";
  import { useParams, useNavigate } from "react-router-dom";

  const BlogDetail2 = () => {
    const { id } = useParams(); // Get the blog ID from URL params
    const navigate = useNavigate(); // For navigation
    const [blog, setBlog] = useState(null); // State to hold blog data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [authorImage, setAuthorImage] = useState(''); // State for author image

    const API_URL = "http://localhost:5000";  // API base URL
    const defaultImage = '/IMAGES/default-author.png'; // Default image URL for fallback

    // Fetch blog data and handle state updates
    const fetchBlogData = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authorization token not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/auth3/blogs/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          handleResponseError(response);
          return;
        }

        const data = await response.json();
        if (data.success && data.data) {
          const blogData = data.data;
          setBlog(blogData);

          // Check if the author has an image, and construct the image URL using author's ID
          const authorImagePath = blogData.author?.image
            ? `${API_URL}/uploads/${blogData.author.image}`
            : defaultImage;
          
          setAuthorImage(authorImagePath);
        } else {
          setError("Blog not found or data is incomplete.");
        }
      } catch (err) {
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    // Handle authorization or other errors
    const handleResponseError = (response) => {
      if (response.status === 401) {
        setError("Authorization expired or invalid. Please log in.");
        navigate("/Login");
      } else {
        setError(`HTTP error! Status: ${response.status}`);
      }
    };

    useEffect(() => {
      fetchBlogData();
    }, [id, navigate]);

    // Handle redirection to Home
    const handleBackToHome = () => navigate("/");

    // Navigate to the Author's page
    const handleAuthorPage = () => {
      if (blog?.author?.name) {
        navigate(`/author/${blog.author.name.replace(/\s/g, "").toLowerCase()}`);
      }
    };

    // Show loading or error messages
    if (loading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-center text-red-500 py-4">{error}</div>;

    // Determine the blog image
    const blogImage = blog?.image ? `${API_URL}${blog.image}` : defaultImage;

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex flex-col mb-6">
          <h1 className="xsm:text-xs bg-[#4B6BFB] rounded-md mr-auto py-[6px] px-[12px] mb-4 mt-[60px]">
            {blog?.tag || "No tag available"}
          </h1>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{blog?.title}</h1>
        </div>

        {/* Author Section */}
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={authorImage}  // Use the author's image
            onError={(e) => (e.target.src = defaultImage)}  // Fallback if image fails
            alt={blog?.author?.name || "Author"}
            className="w-12 h-12 rounded-full cursor-pointer"
            onClick={handleAuthorPage}  // Navigate to author's page
          />
          <div>
            <p
              className="text-lg text-gray-600 dark:text-gray-300 cursor-pointer"
              onClick={handleAuthorPage}
            >
              {blog?.author?.name || "Unknown Author"}
            </p>
            <p className="text-sm text-gray-500">{blog?.date || "August 20, 2022"}</p>
          </div>
        </div>

        {/* Blog Image */}
        <img
          src={blogImage}  // Use the blog's image
          alt={blog?.title || "Blog Image"}
          className="xsm:h-[239px] w-[400px] rounded-xl object-cover lg:w-[800px] lg:h-[462px]"
        />

        {/* Blog Content */}
        <p className="text-gray-700 dark:text-gray-300">{blog?.content}</p>

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

  export default BlogDetail2;
