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

// ✅ Middleware: CORS configuration
app.use(
  cors({
    origin: [
      "https://chattochatly.netlify.app", // ✅ your Netlify frontend
      "http://localhost:5173", // ✅ keep this for local dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Handle preflight requests (important for Vercel)
// app.options("*", cors({
//   origin: [
//     "https://chattochatly4.netlify.app",
//     "http://localhost:5173",
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   credentials: true,
// }));

// ✅ Express setup
app.use(express.json());
app.use(cookieParser());

// ✅ Connect to MongoDB
connectDB();

// ✅ Basic check route
app.get("/", (req, res) => {
  res.status(200).send("✅ Server active and CORS enabled on Vercel!");
});

// ✅ API routes
app.use("/api/auth", authrouter);
app.use("/api/user", userrouter);
app.use("/api/message", messagerouter);

// ✅ Start server (this works both locally and on Vercel)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
