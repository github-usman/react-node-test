import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtExpire, jwtSecret } from "../config/env.config.js";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        minLength: [3, "Name should have more than 3 characters"],
    },
    date_of_birth: {
        type: Date,
        required: [true, "Please Enter Your Date of Birth"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,
    },
});


// Hashing Password

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN GENERATION
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, jwtSecret, {
        expiresIn: jwtExpire,
    });
};

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


export default mongoose.model('User', userSchema);
