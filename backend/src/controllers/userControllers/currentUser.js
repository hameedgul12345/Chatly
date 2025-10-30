import User from "../../models/userModel.js";

const currentUser = async (req, res) => {
  try {
    const userID = req.userID; // ✅ Comes from isAuthenticated middleware

    // ✅ Wait for DB query
    const user = await User.findById(userID).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ✅ Send user data
    res.status(200).json({
      success: true,
      message: "Current user fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Error in currentUser:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default currentUser;
