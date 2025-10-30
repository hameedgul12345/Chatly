import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../App";
function Signin() {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setMessage("Please enter both email and password");
      return;
    }

    try {
      const res = await axios.post(
          // "http://localhost:5000/api/auth/signin",
          `${serverURL}/api/auth/signin`,
        formData,
        { withCredentials: true }
      );

      setMessage(res.data.message || "Login successful!");
      navigate('/')
      // You could navigate to dashboard/home here
      // navigate("/home");
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
        <h1 className="text-2xl font-bold text-[#7fffd4] mb-6">
          Welcome Back 👋
        </h1>

        <div className="bg-[#34454a] p-8 rounded-md shadow-lg w-[350px] mx-auto">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
              SIGN IN
            </button>

            {message && (
              <p className="text-[#7fffd4] mt-3 text-sm">{message}</p>
            )}
          </form>

          {/* Sign Up Link */}
          <p className="text-[#7fffd4]/80 text-sm mt-4">
            DON’T HAVE AN ACCOUNT?{" "}
            <Link
              to="/signup"
              className="underline cursor-pointer text-[#7fffd4] hover:text-[#6be0c1]"
            >
              CREATE NOW
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
