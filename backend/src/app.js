// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import authrouter from "./routes/authRoute.js";
// import userrouter from "./routes/userRoute.js";
// import messagerouter from "./routes/messageRoute.js";
// import connectDB from "./config/db.js";
// import { app, server } from "./socket/socket.js";

// // 🔧 Config
// dotenv.config();

// // 🧠 Middlewares
// app.use(express.json());
// app.use(cookieParser());


// app.use(
//   cors({
//     origin: "https://chattochatly.netlify.app", // your frontend
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     credentials: true,
//   })
// );


// connectDB();
// // 🏠 Test Route
// app.get("/auth/api", (req, res) => {
//   res.send("🚀 Server is running...");
// });

// app.get('/',(req,res)=>{
//   res.send("Active Status")
// })
// app.use("/api/auth", authrouter);
// app.use("/api/user", userrouter);
// app.use("/api/message", messagerouter);

// // 🎧 Start Server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () =>
//   console.log(`Server running on http://localhost:${PORT}`)
// );



import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authrouter from "./routes/authRoute.js";
import userrouter from "./routes/userRoute.js";
import messagerouter from "./routes/messageRoute.js";
import connectDB from "./config/db.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

// ✅ Configure CORS (VERY IMPORTANT)
app.use(
  cors({
    origin: [
      "https://chattochatly4.netlify.app", // Frontend
      // "http://localhost:5173", // For local dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// // ✅ Handle preflight requests
// app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

// ✅ Connect to DB
connectDB();

// ✅ Routes
app.get("/", (req, res) => res.send("✅ Server active on Vercel!"));
app.use("/api/auth", authrouter);
app.use("/api/user", userrouter);
app.use("/api/message", messagerouter);

// ✅ Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
