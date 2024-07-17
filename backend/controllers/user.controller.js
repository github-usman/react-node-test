import userModel from "../models/user.model.js";
import sendErrorResponse from "../utils/ErrorResponse.js";

// user Register
export const registerUser = async (req, res) => {
    const { name, date_of_birth, email, password } = req.body;

    try {
        const isEmailExist = await userModel.findOne({ email });
        if (!isEmailExist) {
            const user = await userModel.create({
                name,
                date_of_birth,
                email,
                password,
            });
            const JWTtoken = user.getJWTToken(); 
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: true,
                user,
                JWTtoken
            }));
        } else {
            return sendErrorResponse(res, 409, "User already exists");
        }
    } catch (error) {
        return sendErrorResponse(res, 500, `${error}`);
    }
};

// user Login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return sendErrorResponse(res, 400, "Please Enter Email & Password");
        }
        const user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            return sendErrorResponse(res, 401, "Invalid email or password");
        }
        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            return sendErrorResponse(res, 401, "Invalid email or password");
        }

        const JWTtoken = user.getJWTToken();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: true,
            user,
            JWTtoken
        }));
    } catch (error) {
        return sendErrorResponse(res, 500, `${error}`);
    }
};
