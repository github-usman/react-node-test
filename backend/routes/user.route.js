import { loginUser, registerUser } from "../controllers/user.controller.js";
import sendErrorResponse from "../utils/ErrorResponse.js";

const router = (req, res) => {
  if (req.method === "POST" && req.url === "/api/v1/register") {
    registerUser(req, res);
  } else if (req.method === "POST" && req.url === "/api/v1/login") {
    loginUser(req, res);
  } else {
    return sendErrorResponse(res, 404, "Route not found");
  }
};

export default router;
