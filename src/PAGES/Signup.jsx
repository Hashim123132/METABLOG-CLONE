import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google'; // Import GoogleLogin
import CustomAlert from './CustomAlert'; // CustomAlert for success/error messages

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleGoogleSuccess = async (response) => {
    try {
      const { credential } = response;
      const googleResponse = await axios.post('http://localhost:5000/api/auth/google', { token: credential });

      if (googleResponse.data.success) {
        setSuccessMessage('Google sign-in successful! Redirecting to dashboard...');
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        setErrorMessage(googleResponse.data.error || 'Google sign-in failed');
      }
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      setErrorMessage('Error with Google sign-in. Please try again later.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    try {
      const response = await axios.post('http://localhost:5000/api/auth/createuser', { name, email, password });

      if (response.data.success) {
        setSuccessMessage('User created successfully! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
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
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            name="name"
          />

          {/* Email Field */}
          <input
            type="email"
            id="email"
            className="rounded-md border-solid border border-[#3B3C4A] text-[#97989F] bg-[#181A2A] block py-[12px] px-[16px] w-[320px] mt-7"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            name="email"
          />

          {/* Password Field */}
          <input
            type="password"
            className="rounded-md border-solid border border-[#3B3C4A] text-[#97989F] bg-[#181A2A] block py-[12px] px-[16px] w-[320px] mt-7"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            name="password"
          />

          {/* Submit Button */}
          <button
            className="rounded-md p-2 text-white font-semibold bg-[#4B6BFB] py-[12px] px-[16px] w-[320px] mt-2"
          >
            Sign Up
          </button>

          {/* Google Login Button */}
          <div className="mt-4">
            <GoogleLogin 
              onSuccess={handleGoogleSuccess} 
              onError={() => setErrorMessage('Google sign-in failed')}
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID} 
            />
          </div>

          {/* Alerts */}
          {successMessage && <CustomAlert message={successMessage} type="success" />}
          {errorMessage && <CustomAlert message={errorMessage} type="danger" />}
        </div>
      </div>
    </form>
  );
};

export default Signup;
