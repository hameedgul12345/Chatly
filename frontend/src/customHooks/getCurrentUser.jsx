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



import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUserData, clearUserData } from "../redux/userSlice";
import { serverURL } from "../App";

const getCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${serverURL}/api/user/currentUser`, {
          withCredentials: true,
        });
        dispatch(setUserData(res.data || null));
      } catch (error) {
        console.error("Error fetching current user:", error);
        dispatch(clearUserData());
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default getCurrentUser;
