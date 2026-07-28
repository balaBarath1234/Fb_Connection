    import express from "express"
    import authMiddleware from "../middleware/authMiddleware.js"
    import roleMiddleware from "../middleware/roleMiddleware.js"
    import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/productController.js"

    const router = express.Router()

    router.post("/addProduct",authMiddleware,roleMiddleware("admin","staff"),addProduct)
    router.get("/getProducts",authMiddleware,getProducts)
    router.get("/getProductById/:id",authMiddleware,getProductById)
    router.put("/updateProduct/:id",authMiddleware,roleMiddleware("admin","staff"),updateProduct)
    router.delete("/deleteProduct/:id",authMiddleware,roleMiddleware("admin","staff"),deleteProduct)

    export default router