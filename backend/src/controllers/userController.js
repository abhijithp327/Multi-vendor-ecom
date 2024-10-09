import { User } from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import { generateToken } from "../utils/utils.js";


// @desc Register new user
// @route /api/user/register
// @access Public


export const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "User already exists",
            });
        };

        const user = await User.create({
            name,
            email,
            password
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        } else {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Invalid user data",
            });
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to register user",
        });
    }

};

// @desc Login new user
// @route /api/user/login
// @access Public

export const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "User not found",
            });
        };

        if (user && (await user.comparePassword(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({
                status: 401,
                success: false,
                message: "Invalid credentials",
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to login user",
        });
    }
};