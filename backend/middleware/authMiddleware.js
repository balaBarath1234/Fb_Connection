import jwt from "jsonwebtoken"

const authMiddleware = (req,res,next) => {
    try {
        
        const auth = req.headers.authorization

        if(!auth) {return res.json("Invalid or No Token")}

        const token = auth.split(" ")[1]

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.user = decoded

        next()

    } catch (error) {
        console.log(error);
    }
}

export default authMiddleware