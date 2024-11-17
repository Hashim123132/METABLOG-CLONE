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
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (!user) {
    return <div>Please log in to access your dashboard.</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name || user.username}</h1>
      <p>Email: {user.email}</p>

      <h2>Your Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs found</p>
      ) : (
        <ul>
          {blogs.map((blog) => (
            <li key={blog._id}>
              <h3>{blog.title}</h3>
              <p>{blog.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Dashboard;