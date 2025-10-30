import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const getToken = (userID) => {
  try {
    // ✅ jwt.sign does not need to be awaited (it’s synchronous)
    const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.error("Error creating token:", error.message);
    return null;
  }
};

export default getToken;
