import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUserData, setSelectedUser } from "../redux/userSlice";
import { serverURL } from "../App";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    userData,
    allUsers = [],
    selectedUser,
    onlineUsers = [],
  } = useSelector((state) => state.user);
  console.log("all users", allUsers);
  // ✅ Safe current user object
  const currentUser = {
    name: userData?.user?.name || userData?.name || "Guest User",
    headline: userData?.user?.headline || userData?.headline || "No headline",
    profilePic:
      userData?.user?.image ||
      userData?.image ||
      "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  };

  const selectUser = (user) => {
    dispatch(setSelectedUser(user));
    navigate("/message");
  };

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
      console.error("❌ Logout failed:", error);
    }
  };

  return (
    <div className="w-80 hidden md:flex flex-col h-screen fixed top-0 left-0 bg-[#1e2a30] text-white border-r border-gray-700">
      {/* PROFILE */}
      <div
        onClick={() => navigate("/profile")}
        className="cursor-pointer relative flex items-center gap-4 p-5 bg-gradient-to-r from-[#1f2c34] to-[#314e52] rounded-b-3xl shadow-md"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#46b8a9]/20 to-transparent rounded-b-3xl"></div>

        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#46b8a9] blur-md opacity-40"></div>
          <img
            src={currentUser.profilePic}
            alt={currentUser.name}
            className="relative w-16 h-16 rounded-full border-2 border-[#46b8a9] shadow-lg object-cover"
          />
        </div>

        <div className="relative z-10">
          <h2 className="text-xl font-semibold">{currentUser.name}</h2>
          <p className="text-sm text-gray-300">{currentUser.headline}</p>
        </div>
      </div>

      <div className="border-t border-gray-600 my-2"></div>

      {/* USERS LIST */}
      <div className="flex-1 overflow-y-auto p-3">
        <h3 className="text-sm text-gray-400 uppercase mb-2">Chats</h3>

        {allUsers.length > 0 ? (
          allUsers.map((user) => {
            const isOnline = onlineUsers?.includes(user._id);
            const isActive = selectedUser?._id === user._id;

            return (
              <div
                key={user._id}
                onClick={() => selectUser(user)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all
                  ${isActive ? "bg-[#346768]" : "hover:bg-[#2c3e42]"}`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={
                      user.image ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-medium">{user.userName}</p>
                    <p
                      className={`text-xs ${
                        isOnline ? "text-green-400" : "text-gray-500"
                      }`}
                    >
                      {isOnline ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-sm text-center mt-6">
            No users available
          </p>
        )}
      </div>

      {/* FOOTER */}
      <div className="p-4 border-t border-gray-700 text-center">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded text-white text-sm"
        >
          Logout
        </button>
        <p className="text-gray-400 text-xs mt-2">© 2025 Chatly</p>
      </div>
    </div>
  );
};

export default Sidebar;
