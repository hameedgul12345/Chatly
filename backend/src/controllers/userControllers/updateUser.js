import uploadOnCloudinary from "../../config/cloudinary.js";
import User from "../../models/userModel.js";

const updateUser = async (req, res) => {
  try {
    const userId = req.userID; // from isAuthenticated middleware
    const { name, headline, userName, email } = req.body;
    const file = req.file;
    
    // ✅ Find existing user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    // ✅ If image is provided, upload to Cloudinary
    let profilePicUrl = user.profilePic;
    // if (file) {
    //   const uploadResult = await uploadOnCloudinary(file.path);
    //   profilePicUrl = uploadResult.secure_url;
    // }

    if (file) {
  const uploadResult = await uploadOnCloudinary(file.buffer); // send buffer instead of path
  profilePicUrl = uploadResult.secure_url;
}
 console.log(profilePicUrl)
    // ✅ Update user fields
    user.name = name || user.name;
    user.headline = headline || user.headline;
    user.userName = userName || user.userName;
    user.email = email || user.email;
    user.image = profilePicUrl || user.profilePicUrl;

    // ✅ Save updated user
    await user.save();

    // ✅ Send response
    res.status(200).json({
      message: "Profile updated successfully.",
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        headline: user.headline,
        image: user.profilePic,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      message: "Server error while updating profile.",
      error: error.message,
    });
  }
};

export default updateUser;
