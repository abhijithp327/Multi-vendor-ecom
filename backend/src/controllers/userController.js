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

// @desc Login user
// @route /api/user/login
// @access Public

export const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

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


// @desc Get user profile 
// @route /api/user/get-user-profile
// @access Private

export const getUserprofile = async (req, res) => {
    try {

        const { _id } = req.body;

        const user = await User.findById(_id);


        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                isActive: user.isActive
            });
        } else {
            res.status(401).json({
                status: 401,
                success: false,
                message: "User not found",
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to fetch user",
        });
    }
};


// @desc Update user profile 
// @route /api/user/update-user-profile
// @access Private

export const updateUserprofile = async (req, res) => {
    try {

        const { _id } = req.body;

        const user = await User.findById(_id);

        if (user) {

            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.phone = req.body.phone || user.phone;
            user.isActive = req.body.isActive || user.isActive;
            if (req.body.password) {
                user.password = req.body.password;
            }
            user.address = req.body.address || user.address;

            await user.save();

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                isActive: user.isActive,
                address: user.address,
            });
        } else {
            res.status(401).json({
                status: 401,
                success: false,
                message: "User not found",
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to update user",
        });
    }
};



// @desc Get ALL user profile 
// @route /api/user//get-all-user-profile
// @access Private

export const getAllUserprofile = async (req, res) => {
    try {

        const users = await User.find();

        if (users) {
            res.json({ users });
        };

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to fetch user",
        });
    }
};


// @desc delete user profile 
// @route /api/user/delete-user-profile
// @access Private

export const deleteUserprofile = async (req, res) => {
    try {

        const userId = req.params.userId;

        await User.findByIdAndDelete(userId);

        res.status(200).json({
            status: 200,
            success: true,
            message: "User deleted successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to delete user",
        });
    }
};