// import uploadOnCloudinary from "../../config/cloudinary.js";
// import Conversation from "../../models/conversationModel.js";
// import Message from "../../models/messageModel.js";
// import User from "../../models/userModel.js";

// const sendMessage = async (req, res) => {
//   // console.log("hello")
//   try {
//     const sender = req.userID;
//     const { receiver } = req.params;
//     const { text } = req.body || {}; // ✅ Safe destructuring
//     // console.log(text)
//     let imageURL = null;

//     // ✅ Upload file if provided
//     if (req.file) {
//       const image = await uploadOnCloudinary(req.file.path);
//       imageURL = image.secure_url;
//     }

//     // ✅ Ensure both sender and receiver exist
//     const senderExists = await User.findById(sender);
//     const receiverExists = await User.findById(receiver);
//     if (!senderExists || !receiverExists) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     // ✅ Find or create conversation
//     let conversation = await Conversation.findOne({
//       participants: { $all: [sender, receiver] },
//     });

//     if (!conversation) {
//       conversation = await Conversation.create({
//         participants: [sender, receiver],
//       });
//     }

//     // ✅ Create and save message
//     const newMessage = await Message.create({
//       sender,
//       receiver,
//       text: text || "",
//       image: imageURL,
//     });
// console.log(newMessage)
//     conversation.messages.push(newMessage._id);
//     await conversation.save();

//     res.status(201).json({
//       success: true,
//       message: "Message sent successfully",
//       data: newMessage,
//     });
//   } catch (error) {
//     console.error("Error sending message:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// export default sendMessage;

import uploadOnCloudinary from "../../config/cloudinary.js";
import Conversation from "../../models/conversationModel.js";
import Message from "../../models/messageModel.js";
import User from "../../models/userModel.js";
import { getRececiverID, io } from "../../socket/socket.js";

const sendMessage = async (req, res) => {
  // console.log("hello");
  try {
    const sender = req.userID;
    const { receiverID } = req.params;
    const { text } = req.body || {};
    // console.log("Message text:", text);
    let imageURL = null;
    if (req.file) {
      const image = await uploadOnCloudinary(req.file.path);
      imageURL = image.secure_url;
    }
    const senderExists = await User.findById(sender);
    const receiverExists = await User.findById(receiverID);
    if (!senderExists || !receiverExists) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiverID] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, receiverID],
      });
    }
    const newMessage = await Message.create({
      sender,
      receiver: receiverID,
      text: text || "",
      image: imageURL || "",
    });
    conversation.messages.push(newMessage._id);
    await conversation.save();
    const receiverSocketID = getRececiverID(receiverID);
    if (receiverSocketID) {
      // ✅ emit only the message data, not the entire response
      io.to(receiverSocketID).emit("newMessage", newMessage);
    }

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export default sendMessage;
