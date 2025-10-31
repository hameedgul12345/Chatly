import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../redux/userSlice"; // adjust path
import { serverURL } from "../App";
const Profile = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log("user profile data", userData);
  const [profilePic, setProfilePic] = useState(null);

  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    headline: "",
    username: "",
    email: "",
  });
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.user.name || "",
        headline: userData.user.headline || "",
        username: userData.user.userName || "",
        email: userData.user.email || "",
      });
    }
  }, [userData]);
  // 📸 Handle Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // 🧾 Handle Text Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🚀 Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("headline", formData.headline);
      data.append("username", formData.username);
      data.append("email", formData.email);
      if (profilePic) data.append("profilePic", profilePic);

      // Check what's being sent
      for (let [key, value] of data.entries()) {
        console.log(key, value);
      }
      // console.log(data)
      // 👇 Backend endpoint (example)
      const response = await fetch(`${serverURL}/api/user/update`, {
        method: "PUT",
        body: data,
        credentials: "include", // 👈 This sends the cookie!
      });

      const result = await response.json();
      console.log(result);
      if (result && result.user) {
        dispatch(setUserData(result.user));
        navigate("/");
      }

      // console.log("✅ Server Response:", result);
      // alert("Profile updated successfully!");
    } catch (error) {
      console.error("❌ Error uploading data:", error);
      alert("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#2c3e42]">
      <div className="bg-gradient-to-br from-[#25353a] to-[#2c3e42] rounded-3xl shadow-2xl w-[800px] flex overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 flex flex-col items-center justify-center p-10 text-white relative">
          <div className="relative group">
            <input
              type="file"
              id="profilePic"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              value={formData.image}
            />
            <label htmlFor="profilePic" className="cursor-pointer">
              <img
                src={
                  preview ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="Profile"
                className="w-36 h-36 rounded-full border-4 border-[#46b8a9] object-cover"
              />
              <div className="absolute bottom-0 right-0 bg-[#46b8a9] p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M4 3a2 2 0 012-2h8a2 2 0 012 2v2H4V3zM3 7h14a1 1 0 011 1v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a1 1 0 011-1zm6 3v4h2v-4H9z" />
                </svg>
              </div>
            </label>
          </div>
          <p className="mt-6 text-center text-sm text-gray-300">
            Click the picture to upload a new one
          </p>
        </div>

        {/* Right Side */}
        <div className="w-1/2 bg-white p-10 rounded-l-3xl">
          <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
            Edit Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-600 text-sm mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#46b8a9]"
              />
            </div>

            {/* Headline */}
            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Headline
              </label>
              <input
                type="text"
                name="headline"
                value={formData.headline}
                onChange={handleChange}
                placeholder="e.g. Full Stack Developer, UI/UX Designer..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#46b8a9]"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#46b8a9]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                disabled
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#46b8a9]"
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full ${
                isLoading ? "bg-gray-400" : "bg-[#46b8a9] hover:bg-[#3aa093]"
              } text-white font-semibold py-2 rounded-lg transition-all duration-300`}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
