import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { setOnlineUsers } from "./redux/userSlice";
import { serverURL } from "./App";

function useSocket() {
  const socketRef = useRef(null);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userData?.user?._id) return;

    const socketio = io(serverURL, {
      query: { userID: userData.user._id },
      withCredentials: true,
    });

    socketRef.current = socketio;

    socketio.on("onlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    socketio.on("connect", () => {
      console.log("Socket connected:", socketio.id);
    });

    return () => socketio.disconnect();
  }, [userData]);

  return socketRef;
}

export default useSocket;
