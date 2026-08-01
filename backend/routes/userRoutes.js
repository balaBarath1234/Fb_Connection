import express from "express"
import { deleteUser, getStaff, getUser, getuserById, loginUser, logoutUser, regiterUser, updateUser } from "../controllers/userController.js"
import authMiddleware from "../middleware/authMiddleware.js"
import roleMiddleware from "../middleware/roleMiddleware.js"

const router = express.Router()

router.post("/register",regiterUser)
router.post("/login",loginUser)
router.get("/userData",authMiddleware,getUser)
router.post("/logout",logoutUser)
router.get("/getStaff",authMiddleware,roleMiddleware("admin"),getStaff)
router.put("/updateUser/:id",authMiddleware,roleMiddleware("admin"),updateUser)
router.get("/userData/:id",authMiddleware,getuserById)
router.delete("/deleteUser/:id",authMiddleware,roleMiddleware("admin"),deleteUser)

export default router