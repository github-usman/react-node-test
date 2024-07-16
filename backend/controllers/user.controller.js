import userModel from "../models/user.model.js";

// user Register
export const registerUser = async (req, res) => {
    const { name, date_of_birth, email, password } = req.body;

    try {
        const isEmailExist = await userModel.findOne({ email });
        if (isEmailExist === null) {
            const user = await userModel.create({
                name,
                date_of_birth,
                email,
                password,
            });
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: true,
                message: 'User Registered successfully',
                user,
            }));
        } else {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: false,
                message: 'User is Aleardy Exist',
            }));
        }
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: false,
            message: 'Internal server Error',
        }));
    }
};
