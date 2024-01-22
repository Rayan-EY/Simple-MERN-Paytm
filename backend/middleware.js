import { JWT_SECRET } from "./config";
const jwt=require('jsonwebtoken')

export const authMiddleware=(req,res,next)=>{
    const auth=req.headers.authorization;

    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({});
    }
};

