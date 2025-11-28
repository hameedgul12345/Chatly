import React from "react";
import { FiMenu } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { clearUserData, setSelectedUser } from "../redux/userSlice"; // adjust path
import { serverURL } from "../App"; // adjust path

function Header() {
  const { userData, allUsers, selectedUser, onlineUsers } = useSelector(
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
      console.error("❌ Error during logout:", error);
    }
  };

  return (
    <>
      {/* HEADER */}
      <header style={styles.header}>
        {/* Profile */}
        <div style={styles.profile}>
          <img
            src={userData?.user.image }
            alt="Profile"
            style={styles.image}
          />
          <span style={styles.name}>{userData?.name || "User"}</span>
        </div>

        {/* Menu Icon */}
        <FiMenu
          onClick={() => setOpenSidebar(true)}
          size={30}
          style={styles.menuIcon}
        />
      </header>

      {/* OVERLAY */}
      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* MOBILE SIDEBAR */}
      <div
        className={`bg-[#1e2a30] z-50 md:hidden fixed top-0 left-0 w-64 h-full transition-transform duration-300 
        ${openSidebar ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* USERS */}
        <div className="flex-1 overflow-y-auto p-3">
          <h3 className="text-sm text-gray-400 uppercase mb-2">Chats</h3>

          {allUsers?.length > 0 ? (
            allUsers.map((user) => (
              <div
                key={user._id}
                onClick={() => {
                  dispatch(setSelectedUser(user));
                  setOpenSidebar(false);
                }}
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#2c3e42] cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-white">{user.name}</p>
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
            <p className="text-gray-500 text-sm text-center">
              No users found
            </p>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t border-gray-700 text-center text-sm text-gray-400">
          © 2025 Chatly
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 p-3 hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </>
  );
}

const styles = {
  header: {
    height: "60px",
    background: "#0f172a",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  },
  profile: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  image: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  name: {
    fontSize: "14px",
    fontWeight: "500",
  },
  menuIcon: {
    cursor: "pointer",
  },
};

export default Header;
