import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDb from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({origin:"http://localhost:5173",credentials:true}))

app.use("/users",userRoutes)
app.use("/products",productRoutes)

connectDb()

app.listen(process.env.PORT,() =>{
    console.log("server is running")
})