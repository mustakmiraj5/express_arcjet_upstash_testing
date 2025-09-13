import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [2, "Name must be at least 2 characters long"],
        maxlength: [100, "Name must be at most 100 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        minlength: [5, "Email must be at least 5 characters long"],
        maxlength: [100, "Email must be at most 100 characters long"],
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: "Email must be a valid email address"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;