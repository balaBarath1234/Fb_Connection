import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDb from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"

dotenv.config()

const app = express()
app.use(cors({origin:"http://localhost:5173"}))

app.use(express.json())
app.use("/users",userRoutes)

connectDb()

app.listen(process.env.PORT,() =>{
    console.log("server is running")
})