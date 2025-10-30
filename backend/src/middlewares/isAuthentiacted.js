import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const isAuthenticated = (req, res, next) => {
  try {
    // ✅ always read cookie safely
    const token = req.cookies?.token;

    // 🧩 check if token exists and is a string
    if (!token) {
      return res.status(401).json({ message: "Token not found or invalid" });
    }

    // ✅ verify the token correctly
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    // store the user ID for next middleware/controllers
    req.userID = verifyToken.userID;

    // ✅ continue
    next();
  } catch (error) {
    // Return a proper error message
    res.status(401).json({
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};

export default isAuthenticated;
