import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');  // Make sure token is stored correctly in localStorage
    if (!token) {
      setErrorMessage('You need to log in first.');
      navigate('/login');  // Redirect to login if no token is found
      return;
    }

    // Fetch User Profile
    fetch('http://localhost:5000/api/auth3/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,  // Include token in Authorization header
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          setUser(json.data);
        } else {
          setErrorMessage('Failed to fetch user profile');
        }
      })
      .catch((error) => {
        setErrorMessage('Error fetching profile');
        console.error(error);
      });

    // Fetch Blogs
    fetch('http://localhost:5000/api/auth3/blogs', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,  // Include token here as well
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setBlogs(data.data);
        } else {
          setBlogs([]);
        }
      })
      .catch((error) => {
        setErrorMessage('Error fetching blogs');
        console.error(error);
      })
      .finally(() => setLoading(false));  // Stop loading after data is fetched
  }, [navigate]);

  if (loading) {
    return <div className="text-center text-lg font-semibold py-4">Loading...</div>;
  }

  if (errorMessage) {
    return <div className="text-center text-red-500 font-semibold py-4">{errorMessage}</div>;
  }

  if (!user) {
    return <div className="text-center text-lg font-semibold py-4">Please log in to access your dashboard.</div>;
  }

  return (
    <div className="container mx-auto p-4 ">
      <div className="bg-white dark:bg-custom-dark2 dark:text-white shadow-lg rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-semibold ">Welcome, {user.name || user.username}</h1>
        <p className="text-lg dark:text-custom-gray-2">Email: {user.email}</p>
      </div>

      <div className='flex flex-col items-center '>
        <h2 className="text-2xl font-semibold dark:text-white mb-4">Your Blogs</h2>
        {blogs.length === 0 ? (
          <p className="text-lg text-gray-600 dark:text-custom-gray-2">No blogs found</p>
        ) : (
          <ul className="space-y-4">
            {blogs.map((blog) => (
              <li key={blog._id} className="bg-gray-100  p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700">{blog.title}</h3>
                <p className="text-gray-600">{blog.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
