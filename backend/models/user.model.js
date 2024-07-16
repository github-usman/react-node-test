import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        minLength: [3, "Name should have more than 3 characters"],
    },
    date_of_birth: {
        type: Date,
        required: true,
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

export default mongoose.model('User', userSchema);
