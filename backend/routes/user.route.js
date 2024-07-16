import { registerUser } from "../controllers/user.controller.js";

const router = (req, res) => {
  if (req.method === "POST" && req.url === "/api/v1/register") {
    registerUser(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: false, message: "Route not found" }));
  }
};

export default router;
