import jwt from "jsonwebtoken"

const authMiddleware = (req,res,next) => {
    try {
        
        const token = req.cookies.token

        console.log(token);
        

        if(!token) {return res.json("No Token Please Login")}

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.user = decoded

        next()

    } catch (error) {
        console.log(error);
        res.json("Invalid Token")
    }
}

export default authMiddleware