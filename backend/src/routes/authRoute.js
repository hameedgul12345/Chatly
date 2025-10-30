import express from "express"
const router = express.Router();
import SignupController from "../controllers/authControllers/signupController.js";
import SigninController from "../controllers/authControllers/signinController.js";
import LogoutController from "../controllers/authControllers/logoutController.js";
router.post("/signup",SignupController)
router.post("/signin",SigninController)
router.get('/logout',LogoutController)
export default router;