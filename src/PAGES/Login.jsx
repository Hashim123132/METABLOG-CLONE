import React, { useState, useContext } from "react";
import AlertContext from "../Context/Alert/AlertContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { showAlert } = useContext(AlertContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;
    // Checking if fields are empty
    if (!email && !password) {
      showAlert("Please fill in all fields", "danger");
      return;
    }
    if (email && !password) {
      showAlert("Please write Password", "danger");
      return;
    }
    if (password && !email) {
      showAlert("Please write email", "danger");
      return;
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert("Invalid email format", "warning");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      });

      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.authtoken); // Save the token
        showAlert("User logged in successfully", "success");
        navigate("/dashboard"); // Redirect to dashboard after successful login
      } else {
        showAlert("Invalid credentials", "danger");
      }
    } catch (error) {
      showAlert("Invalid credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
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
              onChange={onChange}
              name="email"
              aria-describedby="emailHelp"
            />
            <input
              type="password"
              className="rounded-md border-solid border border-[#3B3C4A] text-[#97989F] bg-[#181A2A] block py-[12px] px-[16px] w-[320px] mt-7"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={onChange}
              name="password"
              id="password"
            />
            <button className="rounded-md p-2 text-white font-semibold bg-[#4B6BFB] py-[12px] px-[16px] w-[320px] mt-2 transition-opacity duration-300 hover:opacity-80">
              Login
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
