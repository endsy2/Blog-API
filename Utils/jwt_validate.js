import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
export const validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];


    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token is null" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
        if (error) {
            return res.status(403).json({ message: "Token invalid" });
        }
        req.user = user.username.username;
         // Adjust according to your token structure
        
        next();
    });
};