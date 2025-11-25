// import uploadOnCloudinary from "../../config/cloudinary.js";
// import Conversation from "../../models/conversationModel.js";
// import Message from "../../models/messageModel.js";
// import User from "../../models/userModel.js";

// const getMessages = async (req, res) => {
//   try {
//     const sender = req.userID;
//     const { receiver } = req.params;

//     const conversation = Conversation.findOne({
//       participants: { $all: [sender, receiver] },
//     }).populate("messages");

//     if (!conversation) {
//       return res.status(500).json({ message: "conversation is not found" });
//     }
//     console.log(conversation.messages)
//     // res.status(200).json(conversation.messages);
//     res.status(200).json({ messages: conversation.messages });

//   } catch (error) {
//     console.error("Error geting messsage:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// export default getMessages;






import Conversation from "../../models/conversationModel.js";
 import Message from "../../models/messageModel.js";
import User from "../../models/userModel.js";
const getMessages = async (req, res) => {
  console.log("hello")
  try {
    const sender = req.userID;
    const { receiverID } = req.params; // ✅ Make sure the param matches your route (like /api/message/getmessages/:receiverID)

    // ✅ Ensure both users exist (optional but good check)
    const senderExists = await User.findById(sender);
    const receiverExists = await User.findById(receiverID);
    if (!senderExists || !receiverExists) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    // ✅ Await the query and populate the messages
    const conversation = await Conversation.findOne({
      participants: { $all: [sender, receiverID] },
    }).populate("messages");
    if (!conversation) {
      return res.status(404).json({ success: false, message: "Conversation not found" });
    }
    // ✅ Send all messages
    res.status(200).json({
      success: true,
      messages: conversation.messages,
    });
  } catch (error) {
    // console.error("Error getting messages:", error);
    res.status(500).json({message:"No Conversation yet!"});
  }
};

export default getMessages;



// import Message from "../../models/messageModel.js";

//  const getMessages = async (req, res) => {
//   try {
//     const userID =  req.userID;// assuming you're using authentication middleware
//     const { receiverID } = req.params;
//         console.log(userID,receiverID)
//     if (!receiverID || !userID) {
//       return res.status(400).json({ message: "User IDs are missing" });
//     }

//     const messages = await Message.find({
//       $or: [
//         { senderID: userID, receiverID },
//         { senderID: receiverID, receiverID: userID },
//       ],
//     })
//       .populate("senderID", "userName email")
//       .populate("receiverID", "userName email")
//       .sort({ createdAt: 1 }); // oldest to newest
//     console.log(messages)
//     res.status(200).json({ messages });
//   } catch (error) {
//     console.error("Error fetching messages:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };


// export default getMessages;