import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../App";
import { useNavigate } from "react-router-dom";
function Signup() {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userName || !formData.email || !formData.password) {
      setMessage("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.post(`${serverURL}/api/auth/signup`, formData, {
        withCredentials: true,
      });

    
      setMessage(res.data.message || "Account created successfully!");
      setFormData({ name: "", userName: "", email: "", password: "" });
      navigate('/')
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Something went wrong!");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2c3e42]">
      <div className="text-center">
        <h1 className="text-xl font-bold text-[#7fffd4] mb-6">
          Welcome to Chatly
        </h1>

        <div className="bg-[#34454a] p-8 rounded-md shadow-lg w-[350px] mx-auto">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={formData.userName}
              onChange={handleChange}
              className="w-full bg-transparent border border-[#7fffd4] text-[#7fffd4] placeholder-[#7fffd4]/70 p-3 rounded focus:outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent border border-[#7fffd4] text-[#7fffd4] placeholder-[#7fffd4]/70 p-3 rounded focus:outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-transparent border border-[#7fffd4] text-[#7fffd4] placeholder-[#7fffd4]/70 p-3 rounded focus:outline-none"
            />

            <button
              type="submit"
              className="w-full bg-[#7fffd4] text-[#2c3e42] font-semibold py-3 rounded hover:bg-[#6be0c1] transition-all"
            >
              SIGN UP
            </button>

            {message && (
              <p className="text-[#7fffd4] mt-3 text-sm">{message}</p>
            )}
          </form>
          {/* Create Account Link */}
          <p className="text-[#7fffd4]/80 text-sm mt-4 mb-6">
            ALREADY HAVE AN ACCOUNT?{" "}
            <Link
              to="/signin"
              className="underline cursor-pointer text-[#7fffd4] hover:text-[#6be0c1]"
            >
              LOGIN NOW
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
