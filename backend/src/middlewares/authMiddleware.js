import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';


export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                status: 401,
                auth: false,
                success: false,
                failed: true,
                message: "Authentication failed. Token not found"
            });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({
                    status: 401,
                    auth: false,
                    success: false,
                    failed: true,
                    message: "Authentication failed. User not found"
                });
            }

            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({
                status: 401,
                auth: false,
                success: false,
                failed: true,
                message: "Authentication failed. Invalid token"
            });
        }
    } else {
        return res.status(401).json({
            status: 401,
            auth: false,
            success: false,
            failed: true,
            message: "Authentication failed. Token not found"
        });
    }
};



export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ status: 403, success: false, failed: true, message: "You don't have permission to access this resource" });
        }
        next();
    };
};
