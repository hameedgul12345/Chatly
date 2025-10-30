import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import messageReducer from "./messageSlice";
const store = configureStore({
  reducer: {
    user: userReducer, // ✅ Key must be inside "reducer"
     messages: messageReducer, // 👈 this key name must match useSelector
  },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 🚫 disables warning
    }),
});

export default store;
