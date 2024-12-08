import  { useState, useEffect,useContext  } from "react"; // Import useRef
import { useNavigate, Link } from "react-router-dom";
import AlertContext from "../Context/Alert/AlertContext";

const Dashboard = () => {
  const { showAlert } = useContext(AlertContext);

  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isProfileEditing, setIsProfileEditing] = useState(false); // New state for profile editing
  const [currentBlog, setCurrentBlog] = useState(null);

  const [hasProfilePic, setHasProfilePic] = useState(!!user?.image);

  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    image: null,
    tag: ""

  });
  const [updatedProfile, setUpdatedProfile] = useState({ name: "", email: "" }); // New state for profile update
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("You need to log in first.");
      navigate("/Login");
      return;
    }
  
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData); // Set user data
      setHasProfilePic(userData.image !== null); // Ensure the profile pic state is correctly set based on userData
    } else {
      fetch("http://localhost:5000/api/auth3/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.success) {
            setUser(json.data); // Set the user data from the API response
            localStorage.setItem("user", JSON.stringify(json.data)); // Save the user to localStorage
            setHasProfilePic(json.data.image !== null); // Ensure the profile pic state is updated
          } else {
            setErrorMessage("Failed to fetch user profile");
          }
        })
        .catch((error) => {
          setErrorMessage("Error fetching profile");
          console.error(error);
        });
    }
  
    // Fetch blogs after the user is fetched
    fetchBlogs(token);
  }, [navigate]);
  

  const fetchBlogs = (token) => {
    fetch("http://localhost:5000/api/auth3/blogs", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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
        setErrorMessage("Error fetching blogs");
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("You need to log in first.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this blog?")) {
      fetch(`http://localhost:5000/api/auth3/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setBlogs(blogs.filter((blog) => blog._id !== id));
          } else {
            setErrorMessage("Error deleting blog");
          }
        })
        .catch((error) => {
          setErrorMessage("Error deleting blog");
          console.error(error);
        });
    }
  };

  const handleEdit = (blog) => {
    setIsEditing(true);
    setCurrentBlog(blog);
    setNewBlog({
      title: blog.title,
      content: blog.content,
      image: blog.image || null,
      tag: blog.tag || "", // Set the current tag for editing
    });
  };
  

  const handleUpdate = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("You need to log in first.");
      return;
    }

    const formData = new FormData();
    formData.append("title", newBlog.title);
    formData.append("content", newBlog.content);
    if (newBlog.image) {
      formData.append("image", newBlog.image);
    }

    fetch(`http://localhost:5000/api/auth3/blogs/${currentBlog._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setBlogs(
            blogs.map((blog) =>
              blog._id === currentBlog._id ? data.data : blog
            )
          );
          setIsEditing(false);
          setNewBlog({ title: "", content: "", image: null });
          setCurrentBlog(null);
        } else {
          setErrorMessage("Error updating blog");
        }
      })
      .catch((error) => {
        setErrorMessage("Error updating blog");
        console.error(error);
      });
  };

  const handleCreate = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("You need to log in first.");
      return;
    }
  
    // Check if the required fields (title, content, and tag) are filled out
    if (!newBlog.title || !newBlog.content || !newBlog.tag) {
      setErrorMessage("Title, content, and tag are required.");
      return;
    }
  
    // If there's an image, check its type
    if (newBlog.image) {
      const imageType = newBlog.image.type; // Get the MIME type of the image
  
      if (imageType === "image/jpeg") {
        showAlert("You might be using a JPG image. Please upload a PNG image instead.", "danger");
        return; // Stop the process and prevent form submission
      }
  
      if (imageType !== "image/png") {
        showAlert("Invalid image type. Only PNG images are allowed.", "danger");
        return; // Stop the process and prevent form submission
      }
    }
  
    // Proceed with form submission if no issues
    const formData = new FormData();
    formData.append("title", newBlog.title);
    formData.append("content", newBlog.content);
    formData.append("tag", newBlog.tag);  // Append the tag
  
    // Only append image if it exists
    if (newBlog.image) {
      formData.append("image", newBlog.image);
    }
  
    fetch("http://localhost:5000/api/auth3/blogs", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Ensure the token is being sent correctly
      },
      body: formData, // `body` should be the formData
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Update the blogs list with the new blog without redirecting
          setBlogs((prevBlogs) => [data.data, ...prevBlogs]);
  
          // Reset the newBlog state to clear the form
          setNewBlog({ title: "", content: "", image: null, tag: "" });
        } else {
          // Handle validation errors returned by the backend
          if (data.errors) {
            setErrorMessage(data.errors.map((err) => err.msg).join(", "));
          } else {
            setErrorMessage("Error creating blog");
          }
        }
      })
      .catch((error) => {
        setErrorMessage("Error creating blog");
        console.error(error);
      });
  };
  
  
  

  const handleImageChange = (e) => {
    setNewBlog({ ...newBlog, image: e.target.files[0] });
    
  };
  //edit name and email here:
  const handleProfileEditToggle = () => {
    setIsProfileEditing(!isProfileEditing);

    setUpdatedProfile({ name: user?.name || "", email: user?.email || "" });
  };
  const handleProfileUpdate = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("You need to log in first.");
      return;
    }
  
    // Check if the user logged in with Google
    const isGoogleUser = user?.googleId; // Assume googleId exists if user logged in with Google

    const formData = new FormData();
    // If the user is not a Google user, they can update their profile details

    if (!isGoogleUser) {
      formData.append("name", updatedProfile.name);
      formData.append("email", updatedProfile.email);
      formData.append("imageType", "profile"); // Specify imageType for profile picture
    }
    // If the user is uploading a new profile picture, append it to the form data

    if (updatedProfile.profilePic) {
      formData.append("image", updatedProfile.profilePic);
    }
  
    fetch(`http://localhost:5000/api/auth3/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUser(data.data); 
          localStorage.setItem("user", JSON.stringify(data.data)); 
          setHasProfilePic(data.data.image !== null); // Update the state for profile picture
          setIsProfileEditing(false); // Stop editing mode
          alert("Profile updated successfully!");
        } else {
          // Display a more specific error message if available
          setErrorMessage(data.message || "Error updating profile");
        }
      })
      .catch((error) => {
        setErrorMessage("Error updating profile");
        console.error(error);
      });
  };
  
  
  
  const handleDeleteProfilePic = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("You need to log in first.");
      return;
    }
  
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth3/delete-profile-pic",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.ok) {
        setUser((prevUser) => {
          const updatedUser = {
            ...prevUser,
            image: null, // Remove the image path from the user object
          };
  
          setHasProfilePic(false); // No profile picture anymore
          localStorage.setItem("user", JSON.stringify(updatedUser)); // Update localStorage
  
          return updatedUser;
        });
  
        alert("Profile picture deleted successfully");
      } else {
        alert("Failed to delete profile picture");
      }
    } catch (error) {
      console.error("Error deleting profile picture:", error);
      alert("An error occurred while deleting the profile picture");
    }
  };
  

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpdatedProfile({
        ...updatedProfile,
        profilePic: file,
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center text-lg font-semibold py-4">Loading...</div>
    );
  }

  if (errorMessage) {
    return (
      <div className="text-center text-red-500 font-semibold py-4">
        {errorMessage}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-lg font-semibold py-4">
        Please log in to access your dashboard.
      </div>
    );
  }
  


  return (
      <div className="container mx-auto p-4">
        <div className="bg-white dark:bg-custom-dark2 dark:text-white shadow-lg rounded-lg p-6 mb-6 ">
          <div className="relative">
            <h1 className="text-3xl font-semibold">
              Welcome, {user.name || user.username}
            </h1>
            <p className="text-lg dark:text-custom-gray-2">Email: {user.email}</p>

            {/* Conditionally render the profile picture */}
            <div className="absolute top-0 right-0 mt-2 mr-2">
              {updatedProfile.profilePicPreview ? (
                <img
                  src={updatedProfile.profilePicPreview}
                  alt="Profile picture preview"
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : hasProfilePic && user.image ? (
                // Display profile picture from user state if exists
                <img
                  src={`http://localhost:5000${
                    user.image
                  }?${new Date().getTime()}`} // Cache busting using timestamp
                  alt="User profile picture"
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <img
                  src="/IMAGES/default-author.png"
                  alt="Default profile picture"
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
            </div>

            {/* Delete Profile Picture Button */}
            {user.image && (
              <button
                onClick={handleDeleteProfilePic}
                className="text-red-500 mt-2"
              >
                Delete Profile Picture
              </button>
            )}
          </div>

          {/* Profile Edit Button */}
          <button
            onClick={handleProfileEditToggle}
            className="bg-blue-500 text-white p-2 rounded mt-4 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Edit Profile
          </button>
         

          {/* Profile Edit Form (condition rendering) */}
          {isProfileEditing && (
            <div className="mt-4 ">
              {/* Name Input */}
              <input
                type="text"
                placeholder="Name"
                value={updatedProfile.name}
                onChange={(e) => setUpdatedProfile({ ...updatedProfile, name: e.target.value })}

                className="border p-2 rounded mb-2 w-full dark:bg-custom-dark2 dark:text-white dark:border-custom-gray-2"
              />

            {/* Email Input */}
            <input
              type="email"
              placeholder="Email"
              value={updatedProfile.email}
              onChange={(e) => setUpdatedProfile({ ...updatedProfile, email: e.target.value })}

              className="border p-2 rounded mb-2 w-full dark:bg-custom-dark2 dark:text-white dark:border-custom-gray-2"
            />

            {/* Profile Picture Input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="border p-2 rounded mb-2 w-full dark:bg-custom-dark2 dark:text-white dark:border-custom-gray-2"
            />
           

            {/* Update Button */}
            <button
              onClick={handleProfileUpdate}
              className="bg-green-500 text-white p-2 rounded mt-2"
            >
              Update Profile
            </button>

            {/* Cancel Button */}
            <button
              onClick={handleProfileEditToggle}
              className="bg-gray-500 text-white p-2 rounded mt-2 ml-2"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold dark:text-white mb-4">
          Your Blogs
        </h2>
        
        <div className="flex flex-wrap  space-x-4">


          {/* Blog Creation Form */}
          <div className="mb-6 p-4 border rounded-lg shadow-lg w-full max-w-lg mx-auto">
            <h3 className="text-xl font-semibold mb-4">Create a New Blog</h3>
            <input
              type="text"
              placeholder="Title"
              value={newBlog.title}
              onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
              className="border p-3 rounded mb-4 w-full dark:bg-custom-dark2 dark:text-white dark:border-custom-gray-2"
            />
            <textarea
              placeholder="Content"
              value={newBlog.content}
              onChange={(e) =>
                setNewBlog({ ...newBlog, content: e.target.value })
              }
              className="border p-3 rounded mb-4 w-full dark:bg-custom-dark2 dark:text-white dark:border-custom-gray-2 resize-none"
              rows="4"
            />
             <div >
                  <label htmlFor="tag" className="block text-gray-700">Tag</label>
                  <select
                    id="tag"
                    name="tag"
                    value={newBlog.tag}
                    onChange={(e) => setNewBlog({ ...newBlog, tag: e.target.value })}
                    className="w-full p-2 mt-1 border  border-gray-300 dark:bg-custom-dark2 dar rounded-md"
                  >
                    <option value="">Select a tag</option>
                    <option value="technology">Technology</option>
                    <option value="health">Health</option>
                    <option value="lifestyle">Lifestyle</option>
                  </select>
              </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border p-3 rounded mb-4 w-full dark:bg-custom-dark2 dark:text-white dark:border-custom-gray-2"
            />
            <button
              onClick={handleCreate}
              className="bg-blue-500 text-white p-3 rounded mt-2 w-full"
            >
              Create Blog
            </button>
          </div>

          {/* Blog Edit Form */}
          {isEditing && (
            <div className="mb-6 p-4 border rounded-lg shadow-lg w-full max-w-lg mx-auto">
              <h3 className="text-xl font-semibold mb-4">Edit Blog</h3>
              <input
                type="text"
                placeholder="Title"
                value={newBlog.title}
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                className="border p-3 rounded mb-4 w-full dark:bg-custom-dark2 dark:text-white dark:border-custom-gray-2"
              />
              <textarea
                placeholder="Content"
                value={newBlog.content}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, content: e.target.value })
                }
                className="border p-3 rounded mb-4 w-full dark:bg-custom-dark2 dark:text-white dark:border-custom-gray-2 resize-none"
                rows="4"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border p-3 rounded mb-4 w-full dark:bg-custom-dark2 dark:text-white dark:border-custom-gray-2"
              />
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white p-3 rounded mt-2 w-full"
              >
                Update Blog
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white p-3 rounded mt-2 w-full"
              >
                Cancel
              </button>
            </div>
          )}

        </div>

        {/* Blog List */}
        <div className="grid grid-cols-3 gap-1 w-full">
  {blogs.length > 0 ? (
    blogs.map((blog) => (
      <div
        key={blog._id}
        className="bg-white dark:bg-custom-dark2 dark:border dark:border-custom-gray-2 shadow-lg rounded-xl p-4 mb-4 h-[550px] w-[450px]"
      >
        <Link to={`/blogs/${blog._id}`}>
          {blog.image && (
            <img
              src={`http://localhost:5000${blog.image}`}
              alt={blog.title}
              className="mt-2 w-full h-64 object-cover rounded-lg"
            />
          )}
          <h3 className="text-3xl font-semibold dark:text-white">
            {blog.title}
          </h3>
        </Link>
        {/* Display the tag */}
        {blog.tag && (
          <span className="bg-blue-500 p-1 rounded-md">
            {blog.tag}
          </span>
        )}
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
    <div className="text-center text-lg font-semibold py-4">
      No blogs found.
    </div>
  )}
        </div>

      </div>

    
    </div>
  );
};

export default Dashboard;