//
import React, { useState, useRef, useEffect } from "react";
import Layout from "./Layout";
import { useSelector, useDispatch } from "react-redux";
import { FaPaperPlane, FaImage } from "react-icons/fa";
import { serverURL } from "../App";
import axios from "axios";
import { addMessage, setMessages } from "../redux/messageSlice";

function Message() {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.messages); // ✅ consistent with store
  const { userData, selectedUser, socket } = useSelector((state) => state.user);
  console.log("userDataID", userData.user._id);
  console.log("selectedUser", selectedUser?._id);

  // const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // ✅ Fetch messages whenever a user is selected
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser?._id) return;

      try {
        const res = await axios.get(
          `${serverURL}/api/message/getmessages/${selectedUser._id}`,
          { withCredentials: true }
        );
          console.log("all messages",res)
        // ✅ Correct Redux dispatch
        dispatch(setMessages(res.data.messages || []));
      } catch (error) {
       
        // console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedUser, dispatch]);

  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (msg) => {
      dispatch(addMessage(msg));
    });

    return () => socket.off("newMessage");
  }, [socket, dispatch]);

  // ✅ Handle image select & preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // generate preview
    }
  };
  // ✅ Auto-scroll to bottom when messages update
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // // ✅ Send a new message
  // const handleSend = async () => {
  //   if (!newMessage.trim()) return;

  //   try {
  //     const res = await axios.post(
  //       `${serverURL}/api/message/send/${selectedUser._id}`,
  //       { text: newMessage },
  //       { withCredentials: true }
  //     );

  //     setMessages((prev) => [...prev, res.data.data]);
  //     setNewMessage("");
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }
  // };

  // ✅ Send a new message
  // const handleSend = async () => {
  //   if (!newMessage.trim()) return;

  //   try {

  //     const res = await axios.post(
  //       `${serverURL}/api/message/send/${selectedUser._id}`,
  //       { text: newMessage },
  //       { withCredentials: true }
  //     );

  //     setMessages((prev) => [...prev, res.data.data]);
  //     setNewMessage("");
  //      setImage(null);
  //     setPreview(null);
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }
  // };

  // const handleSend = async () => {
  //   if (!newMessage.trim() && !image) return;

  //   try {
  //     const formData = new FormData();
  //     formData.append("text", newMessage);
  //     if (image) formData.append("image", image);

  //     const res = await axios.post(
  //       `${serverURL}/api/message/send/${selectedUser._id}`,
  //       formData,
  //       {
  //         withCredentials: true,
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );

  //     // ✅ Proper Redux update
  //     dispatch(setMessages([...messages, res.data.data]));

  //     setNewMessage("");
  //     setImage(null);
  //     setPreview(null);

  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }
  // };

  // const handleSend = async () => {
  //   if (!newMessage.trim() && !image) return;

  //   try {
  //     const formData = new FormData();
  //     formData.append("text", newMessage);
  //     if (image) formData.append("image", image);

  //     const res = await axios.post(
  //       `${serverURL}/api/message/send/${selectedUser._id}`,
  //       formData,
  //       {
  //         withCredentials: true,
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );

  //     dispatch(setMessages([...messages, res.data.data]));

  //     setNewMessage("");
  //     setImage(null);
  //     setPreview(null);
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }
  // };
  const handleSend = async () => {
    if (!newMessage.trim() && !image) return;

    try {
      const formData = new FormData();
      formData.append("text", newMessage);
      if (image) formData.append("image", image);

      const res = await axios.post(
        `${serverURL}/api/message/send/${selectedUser._id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      dispatch(addMessage(res.data.data)); // ✅ append, not overwrite
      setNewMessage("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  if (!selectedUser) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-600">
          <p>Select a chat to start messaging</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="relative flex flex-col w-full h-screen bg-[#f0f2f5]">
        {/* ✅ Chat Header */}
        <div className="flex-shrink-0 w-full flex items-center gap-3 p-4 bg-[#1f2c34] text-white shadow-md sticky top-0 z-20">
          <img
            src={
              selectedUser.image ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt={selectedUser.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold text-lg">{selectedUser.name}</h2>
            <p className="text-sm text-gray-300">
              {selectedUser.status || "Offline"}
            </p>
          </div>
        </div>

        {/* ✅ Messages Area */}
        <div className="flex-1 overflow-y-auto w-full p-4 bg-[#e5ddd5]">
          <div className="flex flex-col space-y-3">
            {/* {messages.map((msg, index) => (
              <div
                key={msg._id || index}
                className={`flex flex-row  ${
                  msg.sender === userData?._id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl shadow-md text-sm ${
                    msg.sender === userData?._id
                      ? "bg-[#dcf8c6] text-gray-800"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {msg.image && <img src={msg.image} alt="" />}
                  <p className="">{msg.text}</p>
                  <span className="text-[10px] text-gray-500 float-right mt-1">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))} */}
            {/* {messages.map((msg, index) => {
              // ✅ Works whether sender is an ID or an object
              const isSender =
                msg.sender === userData?._id ||
                msg.sender?._id === userData?._id;

              return (
                <div
                  key={msg._id || index}
                  className={`flex ${
                    isSender ? "justify-end" : "justify-start"
                  } mb-2`}
                >
                  <div
                    className={`max-w-[70%] px-3 py-2 rounded-2xl shadow-md text-sm ${
                      isSender
                        ? "bg-[#dcf8c6] text-gray-800"
                        : "bg-white text-gray-800"
                    }`}
                  >
                    {console.log(userData)}
                    <img
                      src={
                        msg.sender == userData.user._id
                          ? userData.user.image
                          : selectedUser.image
                      }
                      className="w-[50px] h-[50px] rounded-full "
                      alt="selected picture"
                    />
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="attachment"
                        className="w-40 h-auto rounded-lg mb-1"
                      />
                    )}
                    {msg.text && <p>{msg.text}</p>}
                    <span className="text-[10px] text-gray-500 float-right mt-1">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              );
            })} */}
            <div className="flex flex-col space-y-3">
              {messages.map((msg, index) => {
                const isSender =
                  msg.sender === userData?.user?._id ||
                  msg.sender?._id === userData?.user?._id;

                return (
                  <div
                    key={msg._id || index}
                    className={`flex items-end ${
                      isSender ? "justify-end" : "justify-start"
                    }`}
                  >
                    {/* ✅ Receiver Side Avatar */}
                    {!isSender && (
                      <img
                        src={
                          selectedUser?.image ||
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="receiver"
                        className="w-8 h-8 rounded-full mr-2"
                      />
                    )}

                    {/* ✅ Message Bubble */}
                    <div
                      className={`relative max-w-[65%] px-3 py-2 rounded-2xl shadow-md text-sm ${
                        isSender
                          ? "bg-[#dcf8c6] text-gray-800 rounded-br-none"
                          : "bg-white text-gray-800 rounded-bl-none"
                      }`}
                    >
                      {/* ✅ Image message */}
                      {msg.image && (
                        <img
                          src={msg.image}
                          alt="attachment"
                          className="w-100 h-auto rounded-lg mb-1"
                        />
                      )}

                      {/* ✅ Text message */}
                      {msg.text && <p className="break-words">{msg.text}</p>}

                      {/* ✅ Time */}
                      <span className="absolute bottom-1 right-2 text-[10px] text-gray-500">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {/* ✅ Sender Side Avatar */}
                    {isSender && (
                      <img
                        src={
                          userData?.user?.image ||
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="sender"
                        className="w-8 h-8 rounded-full ml-2"
                      />
                    )}
                  </div>
                );
              })}
              <div ref={scrollRef}></div>
            </div>

            <div ref={scrollRef}></div>
          </div>
        </div>
        {/* ✅ Image Preview (before sending) */}
        {preview && (
          <div className="flex items-center justify-between p-3 bg-gray-100 border-t border-gray-300">
            <div className="flex items-center gap-3">
              <img
                src={preview}
                alt="preview"
                className="w-20 h-20 object-cover rounded-lg border"
              />
              <button
                onClick={() => {
                  setImage(null);
                  setPreview(null);
                }}
                className="text-red-500 text-sm font-medium hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        )}
        {/* ✅ Message Input */}
        <div className="flex-shrink-0 w-full flex items-center p-3 bg-white border-t border-gray-300 sticky bottom-0 z-20">
          <input
            type="text"
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <label htmlFor="imageUpload" className="cursor-pointer mr-2">
            <FaImage className="text-green-500 text-xl" />
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
          <button
            onClick={handleSend}
            className="ml-3 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-all"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Message;

// import React, { useState, useRef, useEffect } from "react";
// import Layout from "./Layout";
// import { useSelector } from "react-redux";
// import { FaPaperPlane } from "react-icons/fa";
// import axios from "axios";
// import { serverURL } from "../App";

// function Message() {
//   const { selectedUser, userData } = useSelector((state) => state.user);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const scrollRef = useRef(null);

//   // ✅ Fetch messages when a user is selected
//   useEffect(() => {
//     if (!selectedUser?._id) return;

//     const fetchMessages = async () => {
//       try {
//         await axios.post(
//   `http://localhost:5000/api/message/send/${receiverId}`,
//   { text: messageText },
//   { withCredentials: true } // if you use cookies for auth
// );
//         setMessages(res.data.messages || []);
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//       }
//     };

//     fetchMessages();
//   }, [selectedUser]);

//   // ✅ Auto-scroll to bottom
//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // ✅ Send new message
//   const handleSend = async () => {
//     if (!newMessage.trim()) return;

//     try {
//       const res = await axios.post(
//         `${serverURL}/api/message/${selectedUser._id}`,
//         { text: newMessage },
//         { withCredentials: true }
//       );

//       setMessages([...messages, res.data.data]);
//       setNewMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   if (!selectedUser) {
//     return (
//       <Layout>
//         <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-600">
//           <p>Select a chat to start messaging</p>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <div className="relative flex flex-col w-full h-screen bg-[#f0f2f5]">
//         {/* ✅ Fixed Chat Header */}
//         <div className="flex-shrink-0 w-full flex items-center gap-3 p-4 bg-[#1f2c34] text-white shadow-md sticky top-0 z-20">
//           <img
//             src={
//               selectedUser.image ||
//               "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//             }
//             alt={selectedUser.name}
//             className="w-10 h-10 rounded-full object-cover"
//           />
//           <div>
//             <h2 className="font-semibold text-lg">{selectedUser.name}</h2>
//             <p className="text-sm text-gray-300">
//               {selectedUser.status || "Offline"}
//             </p>
//           </div>
//         </div>

//         {/* ✅ Scrollable Messages Area */}
//         <div className="flex-1 overflow-y-auto w-full p-4 bg-[#e5ddd5]">
//           <div className="flex flex-col space-y-3">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`flex ${
//                   msg.sender === userData?._id
//                     ? "justify-end"
//                     : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`max-w-xs px-4 py-2 rounded-2xl shadow-md text-sm ${
//                     msg.sender === userData?._id
//                       ? "bg-[#dcf8c6] text-gray-800"
//                       : "bg-white text-gray-800"
//                   }`}
//                 >
//                   <p>{msg.text}</p>
//                   <span className="text-[10px] text-gray-500 float-right mt-1">
//                     {new Date(msg.createdAt).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </span>
//                 </div>
//               </div>
//             ))}
//             <div ref={scrollRef}></div>
//           </div>
//         </div>

//         {/* ✅ Fixed Input Section */}
//         <div className="flex-shrink-0 w-full flex items-center p-3 bg-white border-t border-gray-300 sticky bottom-0 z-20">
//           <input
//             type="text"
//             placeholder="Type a message"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-green-500"
//           />
//           <button
//             onClick={handleSend}
//             className="ml-3 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-all"
//           >
//             <FaPaperPlane />
//           </button>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default Message;
