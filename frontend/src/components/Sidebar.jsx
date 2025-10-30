// import React from "react";
// import { useSelector } from "react-redux";
// const Sidebar = () => {

//   const { userData, allUsers } = useSelector((state) => state.user);
//   // console.log(allUsers);
//   console.log("coming data to side bar",userData.user);
//   const currentUser = {
//     name: userData.user.name,
//     headline: userData.user.headline,
//     profilePic: userData.user.profilePic,
//   };

//   return (
//     <div className="w-80 h-screen bg-[#1e2a30] text-white flex flex-col border-r border-gray-700">
//       {/* Top Profile Section */}
//       <div className="relative flex items-center gap-4 p-5 bg-gradient-to-r from-[#1f2c34] to-[#314e52] rounded-b-3xl shadow-md">
//         {/* Decorative curved background glow */}
//         <div className="absolute inset-0 bg-gradient-to-t from-[#46b8a9]/20 to-transparent rounded-b-3xl"></div>

//         {/* Profile Picture */}
//         <div className="relative">
//           <div className="absolute inset-0 rounded-full bg-[#46b8a9] blur-md opacity-40"></div>
//           <img
//             src={currentUser.profilePic}
//             alt="Profile"
//             className="relative w-16 h-16 rounded-full border-2 border-[#46b8a9] shadow-lg hover:scale-105 transition-transform duration-300"
//           />
//         </div>

//         {/* Name & Headline */}
//         <div className="relative z-10">
//           <h2 className="text-xl font-semibold tracking-wide text-white drop-shadow-sm">
//             {currentUser.name}
//           </h2>
//           <p className="text-sm text-gray-300">{currentUser.headline}</p>
//         </div>
//       </div>

//       {/* Divider */}
//       <div className="border-t border-gray-600 my-2"></div>

//       {/* Other Users List */}
//       <div className="flex-1 overflow-y-auto p-3">
//         <h3 className="text-sm text-gray-400 uppercase mb-2">Chats</h3>
//         {allUsers.map((user) => (
//           <div
//             key={user._id} // ✅ fixed here
//             className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#2c3e42] cursor-pointer transition-all"
//           >
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-lg font-semibold">
//                 {user.name.charAt(0)}
//               </div>
//               <div>
//                 <p className="font-medium">{user.name}</p>
//                 <p
//                   className={`text-xs ${
//                     user.status === "Online"
//                       ? "text-green-400"
//                       : "text-gray-500"
//                   }`}
//                 >
//                   {user.status}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Footer (Optional) */}
//       <div className="p-4 border-t border-gray-700 text-center text-sm text-gray-400">
//         © 2025 Chatly
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUserData, setSelectedUser } from "../redux/userSlice";
import { serverURL } from "../App";
const Sidebar = () => {
  const { userData, allUsers,selectedUser,onlineUsers} = useSelector((state) => state.user);
  // console.log("current", userData);
  console.log("all users",allUsers);
  // console.log("selected user",selectedUser)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // ✅ Safely handle cases when userData is not yet loaded
  const currentUser = {
    name: userData?.user?.name || userData?.name || "Guest User",
    headline: userData?.user?.headline || userData?.headline || "No headline",
    profilePic:
      userData?.user?.image ||
      "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  };
const selectUser=(user)=>{
 dispatch(setSelectedUser(user));
 navigate('/message')
  }
  const handleLogout = async () => {
    try {
      const res = await axios.get(`${serverURL}/api/auth/logout`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        // ✅ Clear Redux user state
        dispatch(clearUserData());

        // ✅ Optionally clear local storage (if you store user info there)
        localStorage.removeItem("persist:root");

        // ✅ Navigate to login page
        navigate("/login");
      }
    } catch (error) {
      console.error("❌ Error during logout:", error);
    }
  };
  return (
    <div className="w-80 h-screen fixed top-0 left-0 bg-[#1e2a30] text-white flex flex-col border-r border-gray-700">
      {/* Top Profile Section */}
      <div
        onClick={() => navigate("/profile")}
        className="relative flex items-center gap-4 p-5 bg-gradient-to-r from-[#1f2c34] to-[#314e52] rounded-b-3xl shadow-md"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#46b8a9]/20 to-transparent rounded-b-3xl"></div>

        {/* Profile Picture */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#46b8a9] blur-md opacity-40"></div>
          <img
            src={currentUser?.profilePic || "/default-avatar.png"} // fallback image
            alt={currentUser?.name || "Profile"}
            className="relative w-16 h-16 rounded-full border-2 border-[#46b8a9] shadow-lg hover:scale-105 transition-transform duration-300 object-cover"
          />
        </div>

        {/* Name & Headline */}
        <div className="relative z-10">
          <h2 className="text-xl font-semibold tracking-wide text-white drop-shadow-sm">
            {currentUser.name}
          </h2>
          <p className="text-sm text-gray-300">{currentUser.headline}</p>
        </div>
      </div>

      <div className="border-t border-gray-600 my-2"></div>

      {/* Other Users */}
      <div className="flex-1 overflow-y-auto p-3">
        <h3 className="text-sm text-gray-400 uppercase mb-2">Chats</h3>
      {allUsers?.length > 0 ? (
  allUsers.map((user) => (
    <div
      onClick={() => selectUser(user)}
      key={user._id}
      className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#2c3e42] cursor-pointer transition-all"
    >
      <div className="flex items-center gap-3">
        <img
          src={user.image}
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-medium">{user.name}</p>
          <p
            className={`text-xs ${
              onlineUsers?.includes(user._id)
                ? "text-green-400"
                : "text-gray-500"
            }`}
          >
            {onlineUsers?.includes(user._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </div>
  ))
) : (
  <p className="text-gray-500 text-sm text-center">No users found</p>
)}

      </div>

      <div className="p-4 border-t border-gray-700 text-center text-sm text-gray-400">
        © 2025 Chatly
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Sidebar;
