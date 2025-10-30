
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUserData, clearUserData } from "../redux/userSlice";
import { serverURL } from "../App";

const useCurrentUser = () => {
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

export default useCurrentUser;
