import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import roleMiddleware from "../middleware/roleMiddleware.js"
import { addProduct, getProducts } from "../controllers/productController.js"

const router = express.Router()

router.post("/addProduct",authMiddleware,roleMiddleware("admin","staff"),addProduct)
router.get("/getProducts",authMiddleware,getProducts)

export default router