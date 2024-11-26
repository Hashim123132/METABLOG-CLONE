import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [newBlog, setNewBlog] = useState({ title: '', content: '', image: null });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('You need to log in first.');
      navigate('/Login');
      return;
    }

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      fetch('http://localhost:5000/api/auth3/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.success) {
            setUser(json.data);
            localStorage.setItem('user', JSON.stringify(json.data));
          } else {
            setErrorMessage('Failed to fetch user profile');
          }
        })
        .catch((error) => {
          setErrorMessage('Error fetching profile');
          console.error(error);
        });
    }

    fetchBlogs(token);
  }, [navigate]);

  const fetchBlogs = (token) => {
    fetch('http://localhost:5000/api/auth3/blogs', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
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
      .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('You need to log in first.');
      return;
    }

    if (window.confirm('Are you sure you want to delete this blog?')) {
      fetch(`http://localhost:5000/api/auth3/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setBlogs(blogs.filter((blog) => blog._id !== id));
          } else {
            setErrorMessage('Error deleting blog');
          }
        })
        .catch((error) => {
          setErrorMessage('Error deleting blog');
          console.error(error);
        });
    }
  };

  const handleEdit = (blog) => {
    setIsEditing(true);
    setCurrentBlog(blog);
    setNewBlog({ title: blog.title, content: blog.content, image: blog.image || null });
  };

  const handleUpdate = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('You need to log in first.');
      return;
    }

    const formData = new FormData();
    formData.append('title', newBlog.title);
    formData.append('content', newBlog.content);
    if (newBlog.image) {
      formData.append('image', newBlog.image);
    }

    fetch(`http://localhost:5000/api/auth3/blogs/${currentBlog._id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setBlogs(blogs.map((blog) => (blog._id === currentBlog._id ? data.data : blog)));
          setIsEditing(false);
          setNewBlog({ title: '', content: '', image: null });
          setCurrentBlog(null);
        } else {
          setErrorMessage('Error updating blog');
        }
      })
      .catch((error) => {
        setErrorMessage('Error updating blog');
        console.error(error);
      });
  };

  const handleCreate = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('You need to log in first.');
      return;
    }

    const formData = new FormData();
    formData.append('title', newBlog.title);
    formData.append('content', newBlog.content);
    if (newBlog.image) {
      formData.append('image', newBlog.image);
    }

    fetch('http://localhost:5000/api/auth3/blogs', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setBlogs((prevBlogs) => [data.data, ...prevBlogs]);
          setNewBlog({ title: '', content: '', image: null });
        } else {
          setErrorMessage('Error creating blog');
        }
      })
      .catch((error) => {
        setErrorMessage('Error creating blog');
        console.error(error);
      });
  };

  const handleImageChange = (e) => {
    setNewBlog({ ...newBlog, image: e.target.files[0] });
  };

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
    <div className="container mx-auto p-4">
      <div className="bg-white dark:bg-custom-dark2 dark:text-white shadow-lg rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-semibold">Welcome, {user.name || user.username}</h1>
        <p className="text-lg dark:text-custom-gray-2">Email: {user.email}</p>
      </div>

      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold dark:text-white mb-4">Your Blogs</h2>

        {/* Blog Creation Form */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Create a New Blog</h3>
          <input
            type="text"
            placeholder="Title"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            className="border p-2 rounded mb-2 w-full dark:bg-custom-dark2 dark:text-white dark:border-custom-gray-2"
          />
          <textarea
            placeholder="Content"
            value={newBlog.content}
            onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
            className="border p-2 rounded mb-2 w-full dark:bg-custom-dark2 dark:text-white dark:border-custom-gray-2 resize-none"
            rows="4"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 rounded mb-2 w-full dark:bg-custom-dark2 dark:text-white dark:border-custom-gray-2"
          />
          <button onClick={handleCreate} className="bg-blue-500 text-white p-2 rounded mt-2">Create Blog</button>
        </div>

        {/* Blog List */}
        <div className="grid grid-cols-3 gap-1 w-full">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog._id} className="bg-white dark:bg-custom-dark2 dark:border dark:border-custom-gray-2 shadow-lg rounded-xl p-4 mb-4 h-[550px] w-[450px]">
                {blog.image && (
                  <img
                    src={`http://localhost:5000${blog.image}`}
                    alt={blog.title}
                    className="mt-2 w-full h-64 object-cover rounded-lg"
                  />
                )}
                <h3 className="text-3xl font-semibold dark:text-white">{blog.title}</h3>
                <p className="text-sm dark:text-white">{blog.content}</p>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No blogs available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
