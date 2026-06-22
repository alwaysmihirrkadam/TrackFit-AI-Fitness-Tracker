import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(404).json({message: "Invalid token"})
    }
    
    const token = authHeader.split(" ")[1];
    try {
        const decoder = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoder
        next() 
    } catch (error) {
        next(error)
    }
}

export default authMiddleware