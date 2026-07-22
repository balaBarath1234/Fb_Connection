import express from "express"
import { getUser, getUsers, loginUser, regiterUser } from "../controllers/userController.js"
import authMiddleware from "../middleware/authMiddleware.js"
import roleMiddleware from "../middleware/roleMiddleware.js"

const router = express.Router()

router.post("/register",regiterUser)
router.post("/login",loginUser)
router.get("/",authMiddleware,roleMiddleware("users"),getUsers)

export default router