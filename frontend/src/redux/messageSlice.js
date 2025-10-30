// redux/messageSlice.js
import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
      console.log("added to the state",state.messages)
    
    },
  addMessage: (state, action) => {
  state.messages.push(action.payload);
  console.log("added", [...state.messages,state.messages]); // 👈 view actual array
},

  },
});

export const { setMessages, addMessage } = messageSlice.actions;
export default messageSlice.reducer;
