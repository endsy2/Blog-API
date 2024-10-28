import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const generateToken = (username) => {
    return jwt.sign(
        { 
            username
        }, // Payload should typically be an object, not just a string
        process.env.JWT_SECRET_KEY, // Use uppercase for the environment variable
        {
            expiresIn: process.env.JWT_EXPIRED // You might want to double-check the name in your .env file
        }
    );
};

export default generateToken;
