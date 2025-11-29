import React, { useState, useRef, useEffect } from "react";
import Layout from "./Layout";
import { useSelector, useDispatch } from "react-redux";
import { FaPaperPlane, FaImage } from "react-icons/fa";
import { serverURL } from "../App";
import axios from "axios";
import { addMessage, setMessages } from "../redux/messageSlice";

function Message() {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  const { messages = [] } = useSelector((state) => state.messages);
  const { userData, selectedUser, socket } = useSelector((state) => state.user);

  const [newMessage, setNewMessage] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const currentUserId = userData?.user?._id;

  // ✅ Clear previous chat when switching users
  useEffect(() => {
    dispatch(setMessages([]));
  }, [selectedUser, dispatch]);

  // ✅ Fetch messages for selected chat
  useEffect(() => {
    if (!selectedUser?._id) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${serverURL}/api/message/getmessages/${selectedUser._id}`,
          { withCredentials: true }
        );

        dispatch(setMessages(res.data.messages || []));
      } catch (error) {
        console.error("❌ Fetch error:", error);
      }
    };

    fetchMessages();
  }, [selectedUser, dispatch]);

  // ✅ Receive socket messages ONLY for active chat
  useEffect(() => {
    if (!socket || !selectedUser) return;

    const receiveHandler = (msg) => {
      const isThisChat =
        msg.sender === selectedUser._id ||
        msg.receiver === selectedUser._id ||
        msg.sender?._id === selectedUser._id ||
        msg.receiver?._id === selectedUser._id;

      if (isThisChat) {
        dispatch(addMessage(msg));
      }
    };

    socket.on("newMessage", receiveHandler);

    return () => socket.off("newMessage", receiveHandler);
  }, [socket, selectedUser, dispatch]);

  // ✅ Auto-scroll on message change
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Image Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ Send message
  const handleSend = async () => {
    if (!newMessage.trim() && !image) return;

    try {
      const formData = new FormData();
      formData.append("text", newMessage);
      if (image) formData.append("image", image);

      const res = await axios.post(
        `${serverURL}/api/message/send/${selectedUser._id}`,
        formData,
        { withCredentials: true }
      );

      dispatch(addMessage(res.data.data));
      setNewMessage("");
      setImage(null);
      setPreview(null);

    } catch (error) {
      console.error("❌ Send failed:", error);
    }
  };

  if (!selectedUser) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-600">
          Select a chat to start messaging
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="relative flex flex-col w-full h-screen bg-[#f0f2f5]">

        {/* HEADER */}
        <div className="flex items-center gap-3 p-4 bg-[#1f2c34] text-white">
          <img
            src={selectedUser.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            alt={selectedUser.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2>{selectedUser.name}</h2>
            <p className="text-sm text-gray-300">{selectedUser.status || "Offline"}</p>
          </div>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#e5ddd5]">
          {messages.map((msg, index) => {
            const isSender =
              msg.sender === currentUserId ||
              msg.sender?._id === currentUserId;

            return (
              <div
                key={msg._id || index}
                className={`flex ${isSender ? "justify-end" : "justify-start"} mb-2`}
              >

                <div
                  className={`max-w-[70%] p-2 rounded-2xl text-sm shadow
                    ${isSender ? "bg-[#dcf8c6]" : "bg-white"}`}
                >
                  {msg.image && (
                    <img src={msg.image} alt="attach" className="rounded mb-1" />
                  )}

                  {msg.text && <p>{msg.text}</p>}

                  <span className="text-[10px] block text-right">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </span>
                </div>

              </div>
            );
          })}
          <div ref={scrollRef}></div>
        </div>

        {/* PREVIEW */}
        {preview && (
          <div className="p-3 bg-gray-200">
            <img src={preview} className="w-20 h-20 rounded" />
          </div>
        )}

        {/* INPUT */}
        <div className="flex items-center p-3 bg-white border-t">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type message"
            className="flex-1 border rounded-full px-3 py-2 outline-none"
          />

          <label className="mx-2 cursor-pointer">
            <FaImage className="text-green-600 text-xl" />
            <input type="file" hidden onChange={handleImageChange} />
          </label>

          <button onClick={handleSend} className="bg-green-500 text-white p-2 rounded-full">
            <FaPaperPlane />
          </button>
        </div>

      </div>
    </Layout>
  );
}

export default Message;
