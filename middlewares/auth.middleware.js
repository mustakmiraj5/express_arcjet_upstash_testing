import { JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const authorize = async (req, res, next) => {
    try{
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            const error = new Error("Unauthorized");
            error.statusCode = 401;
            throw error;
        }
        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        req.user = user;
        next();
    }catch(err){
        next(err);
    }
}

export default authorize;