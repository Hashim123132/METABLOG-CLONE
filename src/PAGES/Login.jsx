import React, { useState, useContext } from "react";
import AlertContext from "../Context/Alert/AlertContext";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const { showAlert } = useContext(AlertContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = credentials;

    // Validate form fields
    if (!email || !password) {
      showAlert("Please fill in all fields", "danger");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert("Invalid email format", "warning");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.authToken);
        showAlert("User logged in successfully", "success");
        navigate("/");
      } else {
        showAlert("Invalid credentials", "danger");
      }
    } catch (error) {
      console.error("Login error:", error);
      showAlert("Error logging in", "danger");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
      setLoading(true);
      const googleToken = response.credential;

      const res = await fetch("http://localhost:5000/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: googleToken }),
      });

      const json = await res.json();
      if (json.success) {
        localStorage.setItem("token", json.authToken);
        showAlert("User logged in successfully via Google", "success");
        navigate("/");
      } else {
        showAlert(`Google login failed: ${json.message || "Unknown error"}`, "danger");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      showAlert(`Error during Google login: ${error.message || "Unknown error"}`, "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-[#242535] rounded-lg p-[32px] w-[390px] h-[400px] border border-solid border-[#3B3C4A]">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-semibold text-white text-[20px]">Login</h1>
            <p className="font-[#97989F] font-normal text-[#97989F] text-[20px]">Welcome Back!</p>
          </div>
          <input
            type="email"
            id="email"
            className="rounded-md border-solid border border-[#3B3C4A] text-[#97989F] bg-[#181A2A] block py-[12px] px-[16px] w-[320px] mt-7"
            placeholder="Enter your Email"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            name="email"
          />
          <input
            type="password"
            className="rounded-md border-solid border border-[#3B3C4A] text-[#97989F] bg-[#181A2A] block py-[12px] px-[16px] w-[320px] mt-7"
            placeholder="Enter your password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            name="password"
          />
          <button 
            className="rounded-md p-2 text-white font-semibold bg-[#4B6BFB] py-[12px] px-[16px] w-[320px] mt-2 transition-opacity duration-300 hover:opacity-80"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="mt-4">
            <GoogleLogin 
              onSuccess={handleGoogleLogin} 
              onError={() => showAlert("Google login failed", "danger")}
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID} 
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
