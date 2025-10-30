import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to the user who sends the message
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to the user who receives the message
      required: true,
    },
    text: {
      type: String,
      trim: true,
    },
    image: {
      type: String, // optional, if user sends an image (Cloudinary URL)
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Messages = mongoose.model("Messages", messagesSchema);

export default Messages;
