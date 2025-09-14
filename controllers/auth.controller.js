import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import User from "../model/user.model.js"
import jwt from "jsonwebtoken"
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js"

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { name, email, password } = req.body;
        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error;
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save({ session });

        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        await session.commitTransaction();
        session.endSession();
        res.status(201).json({ 
            success: true,
            message: "User created successfully",
            data:{
                user: { id: newUser._id, name: newUser.name, email: newUser.email },
                token
            }
        });
    } catch (error) {
        await session.abortTransaction();
        next(error);
    } finally {
        session.endSession();
    }
}

export const signIn = async (req, res, next) => {
    try {
        // Your sign-in logic here
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error = new Error("Invalid credentials");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data: {
                user: { id: user._id, name: user.name, email: user.email },
                token
            }
        });
    } catch (error) {
        next(error);
    } 
}

export const signOut = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        // Your sign-out logic here
    } catch (error) {
        await session.abortTransaction();
        next(error);
    } finally {
        session.endSession();
    }
}