import React from "react";
import { FiMenu } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { clearUserData, setSelectedUser } from "../redux/userSlice";
import { serverURL } from "../App";

function Header() {
  const { userData, allUsers, onlineUsers } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openSidebar, setOpenSidebar] = React.useState(false);

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${serverURL}/api/auth/logout`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(clearUserData());
        localStorage.removeItem("persist:root");
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 h-[64px] z-50
        bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#1e293b]
        backdrop-blur-lg shadow-lg flex items-center justify-between px-4"
      >
        {/* PROFILE */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={userData?.user?.image}
              alt="Profile"
              className="w-10 h-10 rounded-full ring-2 ring-blue-500 object-cover"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#0f172a] rounded-full"></span>
          </div>

          <div className="leading-tight">
            <p className="text-white text-sm font-semibold">
              {userData?.user?.name || "User"}
            </p>
            <p className="text-gray-400 text-xs">Available</p>
          </div>
        </div>

        {/* MENU ICON */}
        <FiMenu
          onClick={() => setOpenSidebar(true)}
          className="text-white text-2xl cursor-pointer hover:text-blue-400 transition"
        />
      </header>

      {/* OVERLAY */}
      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        />
      )}

      {/* MOBILE SIDEBAR */}
      <div className={`fixed top-0 left-0 z-50 h-full w-72
        bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617]
        transform transition-transform duration-300 overflow-hidden
        ${openSidebar ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* SIDEBAR HEADER */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-white font-semibold text-lg">Chats</h2>
          <button
            onClick={() => setOpenSidebar(false)}
            className="text-gray-400 hover:text-white transition"
          >✕</button>
        </div>

        {/* USERS */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {allUsers?.length > 0 ? (
            allUsers.map((user) => (
              <div
                key={user._id}
                onClick={() => {
                  dispatch(setSelectedUser(user));
                  setOpenSidebar(false);
                }}
                className="group flex items-center gap-3 p-3 rounded-xl cursor-pointer
                hover:bg-white/10 transition-all"
              >
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-11 h-11 rounded-full object-cover border border-gray-600"
                />

                <div className="flex-1">
                  <p className="text-white font-medium text-sm">{user.name}</p>
                  <p className={`text-xs ${
                    onlineUsers?.includes(user._id)
                      ? "text-green-400"
                      : "text-gray-500"
                  }`}>
                    {onlineUsers?.includes(user._id) ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm text-center mt-8">
              No users found
            </p>
          )}
        </div>

        {/* FOOTER */}
        <div className="border-t border-gray-700 p-4">
          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-xl font-medium
              bg-gradient-to-r from-red-500 to-red-600
              hover:from-red-600 hover:to-red-700
              transition-all text-white shadow"
          >
            Logout
          </button>

          <p className="text-gray-500 text-xs text-center mt-3">
            © 2025 Chatly
          </p>
        </div>
      </div>

      {/* Space for fixed header */}
      <div className="h-[64px]" />
    </>
  );
}

export default Header;
