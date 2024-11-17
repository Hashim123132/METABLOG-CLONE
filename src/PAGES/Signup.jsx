import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { name, email, password };

    try {
      // Make POST request to backend to create the user
      const response = await axios.post('http://localhost:5000/api/auth/createuser', userData);

      if (response.data.success) {
        alert('User created successfully!');
      } else {
        setErrorMessage(response.data.error || 'Failed to create user');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage('Error creating user. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-[#242535] rounded-lg p-[32px] w-[390px] h-[500px] border border-solid border-[#3B3C4A]">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-semibold text-white text-[20px]">Sign Up</h1>
            <p className="font-[#97989F] font-normal text-[#97989F] text-[20px]">Create a New Account</p>
          </div>

          {/* Name Field */}
          <input
            type="text"
            id="name"
            className="rounded-md border-solid border border-[#3B3C4A] text-[#97989F] bg-[#181A2A] block py-[12px] px-[16px] w-[320px] mt-7"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
          />

          {/* Email Field */}
          <input
            type="email"
            id="email"
            className="rounded-md border-solid border border-[#3B3C4A] text-[#97989F] bg-[#181A2A] block py-[12px] px-[16px] w-[320px] mt-7"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            aria-describedby="emailHelp"
          />

          {/* Password Field */}
          <input
            type="password"
            className="rounded-md border-solid border border-[#3B3C4A] text-[#97989F] bg-[#181A2A] block py-[12px] px-[16px] w-[320px] mt-7"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            id="password"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="rounded-md p-2 text-white font-semibold bg-[#4B6BFB] py-[12px] px-[16px] w-[320px] mt-7 transition-opacity duration-300 hover:opacity-80"
          >
            Sign Up
          </button>

          {/* Error message */}
          {errorMessage && (
            <p className="mt-4 text-center text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
      </div>
    </form>
  );
};

export default Signup;
