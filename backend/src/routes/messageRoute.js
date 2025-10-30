import express from "express";
import isAuthenticated from "../middlewares/isAuthentiacted.js";
import upload from "../middlewares/multer.js";
import sendMessage from "../controllers/messageControllers/sendMessage.js";
import getMessages from "../controllers/messageControllers/getMessages.js";
const router = express.Router();

// POST → send message
// router.post("/send/:receiverID", isAuthenticated, sendMessage);
router.post(
  "/send/:receiverID",
  isAuthenticated,
  upload.single("image"), // ✅ Multer parses image + text
  sendMessage
);

// router.get("/getmessages",isAuthenticated,getMessages)

router.get("/getmessages/:receiverID", isAuthenticated, getMessages);

export default router;
