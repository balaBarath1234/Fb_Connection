import express from "express"
import { getUser, loginUser, logoutUser, regiterUser } from "../controllers/userController.js"
import authMiddleware from "../middleware/authMiddleware.js"
import roleMiddleware from "../middleware/roleMiddleware.js"

const router = express.Router()

router.post("/register",regiterUser)
router.post("/login",loginUser)
router.get("/userData",authMiddleware,getUser)
router.post("/logout",logoutUser)

export default router