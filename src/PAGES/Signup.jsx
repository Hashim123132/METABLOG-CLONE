import { useNavigate } from 'react-router-dom';
import { useState, useContext } from "react";
import { GoogleLogin } from '@react-oauth/google';
import CustomAlert from './CustomAlert';
import AlertContext from "../Context/Alert/AlertContext";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showAlert } = useContext(AlertContext);
  const navigate = useNavigate();

  const handleGoogleLogin = async (response) => {
    try {
      const googleToken = response.credential;
      const res = await fetch("http://localhost:5000/api/auth/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: googleToken }),
      });

      const json = await res.json();
      if (json.success && json.authToken) {
        localStorage.setItem("token", json.authToken);
        showAlert("User logged in successfully via Google", "success");
        navigate("/"); // Navigate to the home page
      } else {
        showAlert(`Google login failed: ${json.message || "Unknown error"}`, "danger");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      showAlert(`Error during Google login: ${error.message || "Unknown error"}`, "danger");
    } 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const { name, email, password } = formData;

    // Basic validation
    if (!name || !email || !password) {
      setErrorMessage('All fields are required');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch('http://localhost:5000/api/auth/Signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (data.success) {
        setSuccessMessage('✅ Signup successful! Please check your email to verify your account.');
      } else {
        setErrorMessage(data.message || 'Failed to create user');
      }
    } catch (error) {
      console.error('Error during Signup:', error);
      setErrorMessage('Error creating user. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendVerificationEmail = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const result = await res.json();
      if (result.success) {
        setSuccessMessage(result.message || 'Verification email resent.');
      } else {
        setErrorMessage(result.message || 'Could not resend email.');
      }
    } catch (err) {
      setErrorMessage('Failed to resend verification email.');
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-[#242535] rounded-lg p-[32px] w-[390px] h-[520px] border border-solid border-[#3B3C4A]">
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
            className="rounded-md border-solid border border-[#3B3C4A] text-[#97989F] bg-[#181A2A] block py-[12px] px-[16px] w-[320px] mt-5"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            name="email"
          />

          {/* Password Field */}
          <input
            type="password"
            className="rounded-md border-solid border border-[#3B3C4A] text-[#97989F] bg-[#181A2A] block py-[12px] px-[16px] w-[320px] mt-5"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            name="password"
          />

          {/* Submit Button */}
          <button
            disabled={isSubmitting}
            className="rounded-md p-2 text-white font-semibold bg-[#4B6BFB] py-[12px] px-[16px] w-[320px] mt-5 disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Sign Up"}
          </button>

          {/* Google Login Button */}
          <div className="mt-4">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => setErrorMessage('Google sign-in failed')}
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            />
          </div>

          {/* Alerts */}
          {successMessage && <CustomAlert message={successMessage} type="success" />}
          {errorMessage && <CustomAlert message={errorMessage} type="danger" />}

          {/* Resend Verification Link */}
          {successMessage && (
            <div className="mt-4 text-sm text-[#97989F]">
              Didn’t get the email?{' '}
              <button
                type="button"
                onClick={resendVerificationEmail}
                className="text-blue-400 underline"
              >
                Resend it
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default Signup;
