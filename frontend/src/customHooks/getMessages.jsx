// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { setUserData } from "../redux/userSlice"; // adjust path if needed
// import { serverURL } from "../App";

// const useCurrentUser = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user.userData);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get(`${serverURL}/api/user/currentUser`, {
//           withCredentials: true, // include cookies if using auth tokens
//         });

//         dispatch(setUserData(res.data)); // ✅ store data in Redux
//       } catch (error) {
//         console.error("Error fetching current user:", error);
//       }
//     };

//     fetchUser();
//   }, [dispatch]);

//   return user; // ✅ return user if you need it
// };

// export default useCurrentUser;

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { clearUserData } from "../redux/userSlice";
// import { setMessages } from "../redux/messageSlice";
// import { serverURL } from "../App";

// const getMessages = () => {
//     console.log("working with messages")
//   const dispatch = useDispatch();
//   const { userData, selectedUser } = useSelector((state) => state.user);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       // ✅ Don’t call API if no user is selected or not logged in
//       if (!selectedUser?._id || !userData?._id) return;

//       try {
//         const res = await axios.get(
//           `${serverURL}/api/message/getmessages?receiverID=${selectedUser._id}`,
//           { withCredentials: true }
//         );

//        dispatch(setMessages(res.data.messages || []));
// console.log("Fetched messages:", res.data.messages);

//       } catch (error) {
//         console.error("Error fetching messages:", error);
//         dispatch(clearUserData());
//       }
//     };

//     fetchMessages();
//   }, [selectedUser._id, userData._id, dispatch]);
// };

// export default getMessages;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearUserData } from "../redux/userSlice";
import { setMessages } from "../redux/messageSlice";
import { serverURL } from "../App";

const getMessages = () => {
  const dispatch = useDispatch();
  const { userData, selectedUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchMessages = async () => {
      //   ✅ Don't fetch if no users selected or logged in
      console.log("get messages", selectedUser);
      if (!selectedUser?._id || !userData?._id) {
        console.log("⏳ Waiting for selectedUser or userData...");
        return;
      }

      try {
        const res = await axios.get(
          `${serverURL}/api/message/getmessages/${selectedUser._id}`,
          { withCredentials: true }
        );
          console.log("get messagesin front end",res.data)
        dispatch(setMessages(res.data.messages));

        // dispatch(setMessages(res.data.messages || []));
        // console.log("✅ Fetched messages:", res.data.messages);
        // dispatch(setMessages(res.data || []));
        // console.log("✅ Fetched messages:", res.data.messages);
        dispatch(setMessages(res.data));
      } catch (error) {
        console.error("Error fetching messages:", error);
        dispatch(clearUserData());
      }
    };

    fetchMessages();
  }, [selectedUser,userData]);
};

export default getMessages;
