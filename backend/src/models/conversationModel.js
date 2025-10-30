import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId, // ✅ capital “T” in Types
        ref: "User",
        required: true,
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId, // ✅ reference to Message model
        ref: "Messages",
      },
    ],
  },
  { timestamps: true }
);

// ✅ Correct model creation syntax
const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
