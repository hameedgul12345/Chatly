import User from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import getToken from "../../config/jwtToken.js";

const SigninController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check for missing fields
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    // 2️⃣ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // 3️⃣ Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid credentials." });
    }

    // 4️⃣ Generate JWT token
    const token = getToken(user._id);

    // 5️⃣ Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
     secure: true
      sameSite: "none", // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 6️⃣ Send success response
    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        name: user.name,
        userName: user.userName,
        email: user.email,
        image: user.image,
      },
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default SigninController;
