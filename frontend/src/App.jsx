// import React from "react";
// import { Route, Routes, Navigate } from "react-router-dom";
// import Signup from "./auth/Signup";
// import Home from "./pages/Home";
// import Signin from "./auth/Signin";
// import Profile from "./pages/Profile"; // ✅ make sure this file exists
// import getCurrentUser from "./customHooks/getCurrentUser";
// import { useSelector } from "react-redux";

// export const serverURL = "http://localhost:5000";

// function App() {
//   // ✅ fetch current user data once
//   getCurrentUser();

//   // ✅ get user data from Redux store
//   const { userData } = useSelector((state) => state.user);
//   console.log(userData)

//   return (
//     <Routes>
//       {/* ✅ Protected Routes */}
//       <Route
//         path="/"
//         element={userData ? <Home /> : <Navigate to="/signin" replace />}
//       />

//       <Route
//         path="/profile"
//         element={userData ? <Profile /> : <Navigate to="/signin" replace />}
//       />

//       {/* ✅ Public Routes */}
//       <Route
//         path="/signin"
//         element={!userData ? <Signin /> : <Navigate to="/" replace />}
//       />

//       <Route
//         path="/signup"
//         element={!userData ? <Signup /> : <Navigate to="/profile" replace />}
//       />

//       {/* ✅ Fallback route */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }

// export default App;

// // import React from "react";

// // import { Route, Routes, Navigate } from "react-router-dom";
// // import Signup from "./auth/Signup";
// // import Home from "./pages/Home";
// // import Signin from "./auth/Signin";
// // import Profile from "./pages/Profile";
// // import { useSelector } from "react-redux";
// // import useCurrentUser from "./customHooks/getCurrentUser";

// // export const serverURL = "http://localhost:5000";

// // function App() {
// //   useCurrentUser();
// //   const { userData, loading } = useSelector((state) => state.user);

// //   if (loading) {
// //     return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
// //   }

// //   return (
// //     <Routes>
// //       {/* Protected Routes */}
// //       <Route
// //         path="/"
// //         element={userData ? <Home /> : <Navigate to="/signin" replace />}
// //       />
// //       <Route
// //         path="/profile"
// //         element={userData ? <Profile /> : <Navigate to="/signin" replace />}
// //       />

// //       {/* Public Routes */}
// //       <Route
// //         path="/signin"
// //         element={!userData ? <Signin /> : <Navigate to="/" replace />}
// //       />
// //       <Route
// //         path="/signup"
// //         element={!userData ? <Signup /> : <Navigate to="/" replace />}
// //       />

// //       {/* Fallback */}
// //       <Route path="*" element={<Navigate to="/" replace />} />
// //     </Routes>
// //   );
// // }

// // export default App;

// import React, { useEffect } from "react";
// import { Route, Routes, Navigate } from "react-router-dom";
// import Signup from "./auth/Signup";
// import Home from "./pages/Home";
// import Signin from "./auth/Signin";
// import Profile from "./pages/Profile";
// import getCurrentUser from "./customHooks/getCurrentUser";
// import getAllUsers from "./customHooks/getAllUsers";
// import { useSelector } from "react-redux";
// import Message from "./components/Message";

// // import getMessages from "./customHooks/getMessages";
// export const serverURL = "http://localhost:5000";
// import { io } from "socket.io-client";
// import { useNavigate } from "react-router-dom";

// function App() {
//   getCurrentUser();
//   getAllUsers();
//   // getMessages();
//   // console.log("meesages",messages)
//     const { userData, loading } = useSelector((state) => state.user);

//  useEffect(() => {
//   if (!userData?._id) return; // wait until we have userData

//   console.log("Connecting socket with userID:", userData._id);

//   const socket = io(serverURL, {
//     query: { userID: userData._id },
//     withCredentials: true,
//   });

//   socket.on("connect", () => {
//     console.log("Connected to socket:", socket.id);
//   });

//   socket.on("start", (msg) => console.log(msg));

//   socket.emit("client", "Hey server, I’m here!");

//   return () => socket.disconnect(); // cleanup
// }, [userData]);

//   if (loading) {
//     return <div>Loading...</div>; // ✅ wait until fetch completes
//   }

//   return (
//     <Routes>
//       {/* ✅ Protected Routes */}
//       <Route
//         path="/"
//         element={userData ? <Home /> : <Navigate to="/signin" replace />}
//       />

//       <Route
//         path="/profile"
//         element={userData ? <Profile /> : <Navigate to="/signin" replace />}
//       />

//       <Route
//         path="/message"
//         element={userData ? <Message /> : <Navigate to="/signin" replace />}
//       />

//       {/* ✅ Public Routes */}
//       <Route
//         path="/signin"
//         element={!userData ? <Signin /> : <Navigate to="/" replace />}
//       />

//       <Route
//         path="/signup"
//         element={!userData ? <Signup /> : <Navigate to="/profile" replace />}
//       />

//       {/* ✅ Catch-all Route */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }

// export default App;

import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./auth/Signup";
import Home from "./pages/Home";
import Signin from "./auth/Signin";
import Profile from "./pages/Profile";
import useCurrentUser from "./customHooks/useCurrentUser";
import Message from "./components/Message";
import getAllUsers from "./customHooks/getAllUsers";
import { useSelector, useDispatch } from "react-redux";



// export const serverURL = "http://localhost:5000";

export const serverURL = "https://chatly-mu.vercel.app";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { setOnlineUsers, setSocket } from "./redux/userSlice";





function App() {
  useCurrentUser(); // ✅ use hook (not call like a function)
  getAllUsers();

  const { userData, loading, socket, onlineUsers, } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  console.log(userData);
  console.log("socket in front end",socket)
  console.log("online user     in ",onlineUsers)
  useEffect(() => {
    if (!userData?.user._id) {
      console.log("⏳ Waiting for userData...");
      return;
    }

    console.log("✅ Connecting socket for:", userData.user._id);
    const socketio = io(serverURL, {
      query: { userID: userData.user._id },
      withCredentials: true,
    });
    dispatch(setSocket(socketio));

    socketio.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
      console.log("users in online",users)
    });
    socketio.on("connect", () => {
      console.log("Socket connected:", socketio.id);
    });

    return () => socketio.close();
  }, [userData]);

  if (loading) {
    return <div>Loading...</div>; // ✅ wait until fetch completes
  }

  return (
    <Routes>
      {/* ✅ Protected Routes */}
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to="/signin" replace />}
      />

      <Route
        path="/profile"
        element={userData ? <Profile /> : <Navigate to="/signin" replace />}
      />

      <Route
        path="/message"
        element={userData ? <Message /> : <Navigate to="/signin" replace />}
      />

      {/* ✅ Public Routes */}
      <Route
        path="/signin"
        element={!userData ? <Signin /> : <Navigate to="/" replace />}
      />

      <Route
        path="/signup"
        element={!userData ? <Signup /> : <Navigate to="/profile" replace />}
      />

      {/* ✅ Catch-all Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
