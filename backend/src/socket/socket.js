import express from "express";
import { Server } from "socket.io";
const app = express();

import http from "http";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

 const userSocketMap = {};
export const getRececiverID=(receiver)=>{
  return userSocketMap[receiver];
}
io.on("connection", (socket) => {
  const userID = socket.handshake.query.userID;
  if (userID != undefined)
    // console.log("User connected:", userID, "Socket ID:", socket.id);
  userSocketMap[userID] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  io.on("disconnect", () => {
    delete userSocketMap[userID]
     io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
