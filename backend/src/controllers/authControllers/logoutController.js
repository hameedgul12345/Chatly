const LogoutController = (req, res) => {
    try {
      // Clear the authentication token cookie
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // ensures HTTPS in production
        sameSite: "strict",
      });
  
      // Send success response
      res.status(200).json({
        success: true,
        message: "Logged out successfully!",
      });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({
        success: false,
        message: "Server error during logout",
      });
    }
  };
  
  export default LogoutController;
  