import User from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import getToken from "../../config/jwtToken.js";
const SignupController = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    // 1️⃣ Check for missing fields
    if (!userName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }
    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists." });
    }
    // 3️⃣ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // 4️⃣ Create new user
    const newUser = new User({
    
      userName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    // 5️⃣ Generate JWT token
    const token = getToken(newUser._id);
    // 6️⃣ Set cookie with token
    res.cookie("token", token, {
      httpOnly: true,     // ✅ prevent JS access (security)
      secure: true,
      sameSite: "none", // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // expires in 7 days
    });
    // 7️⃣ Return success response
    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      token, // optional: also return token in body
      user: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        image: newUser.image,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default SignupController;
