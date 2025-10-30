import express from "express"
import isAuthenticated from "../middlewares/isAuthentiacted.js";
import currentUser from "../controllers/userControllers/currentUser.js";
import updateUser from "../controllers/userControllers/updateUser.js";
import upload from "../middlewares/multer.js";
import getAllUsers from "../controllers/userControllers/getAllUsers.js";
const router = express.Router();



router.get("/currentUser",isAuthenticated,currentUser)
router.put("/update",isAuthenticated,upload.single("profilePic"),updateUser)
router.get('/getAllUsers',isAuthenticated,getAllUsers)

export default router;