const roleMiddleware = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return res.json("Access denied")
        }
        next()
    }
}

export default roleMiddleware