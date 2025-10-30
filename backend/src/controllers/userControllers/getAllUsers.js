import User from "../../models/userModel.js";

const getAllUsers = async (req, res) => {
  try {
    const id = req.userID;

    if (!id) {
      return res.status(400).json({ message: "User ID missing" });
    }

    // ✅ Find all users except the logged-in one
    const users = await User.find({ _id: { $ne: id } }).select("-password");

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default getAllUsers;
