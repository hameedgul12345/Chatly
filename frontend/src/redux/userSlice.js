// import { createSlice } from "@reduxjs/toolkit";

// const userSlice = createSlice({
//   name: "user",
//   initialState: { userData: null },

//   reducers: {
//     setUserData: (state, action) => {
//       state.userData = action.payload;
//       // console.log("User data set in Redux:", state.userData);
//        state.loading = false;
//     },
//     clearUserData: (state) => {
//       state.userData = null;
//       console.log("User data cleared");
//     },
//   },
// });

// // ✅ Correct exports
// export const { setUserData, clearUserData } = userSlice.actions;
// export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userData: null,
  loading: true,
  allUsers: [],
  selectedUser: null,
  socket:null,
  onlineUsers:null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
      // console.log("coming data to slice", state.userData);
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setSelectedUser:(state,action)=>{
      state.selectedUser=action.payload;
      console.log("user is selected",state.selectedUser)
    }
    ,
    setSocket:(state,action)=>{
      state.socket=action.payload;
      console.log("socket is selected",state.socket)
    }
    ,
    setOnlineUsers:(state,action)=>{
      state.onlineUsers=action.payload;
      console.log("online user is selected",state.onlineUsers)
    }
    ,
    clearUserData: (state) => {
      state.userData = null;
      state.loading = false;
    },
  },
});

export const { setUserData, clearUserData, setAllUsers,setSelectedUser,setOnlineUsers,setSocket } = userSlice.actions;
export default userSlice.reducer;
