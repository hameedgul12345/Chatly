import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAllUsers, clearUserData } from "../redux/userSlice";
import { serverURL } from "../App";

const getAllUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get(`${serverURL}/api/user/getAllUsers`, {
          withCredentials: true,
        });
          
        // ✅ store all users in Redux
        dispatch(setAllUsers(res.data || []));
      } catch (error) {
        console.error("❌ Error fetching all users:", error);
        dispatch(clearUserData());
      }
    };

    fetchAllUsers();
  }, [dispatch]);
};

export default getAllUsers;
