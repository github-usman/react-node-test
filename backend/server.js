import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import { serverBaseUrl, serverMode, serverPort } from "./config/env.config.js";
import userRouter from "./routes/user.route.js";
import connectMongoDB from "./connect-DB/db.js";
import sendErrorResponse from "./utils/ErrorResponse.js";


// Data base connection #MOGNOD
connectMongoDB();

// middlewares
const jsonParser = bodyParser.json();
const corsMiddleware = cors();
// main server
const server = http.createServer((req, res) => {
    corsMiddleware(req, res, () => {
        jsonParser(req, res, async () => {
            if (req.method === 'GET' && req.url === '/') {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Hello World!');
            } else if (req.url.startsWith('/api/v1')) {
                userRouter(req, res);
            } else {
                return sendErrorResponse(res, 404, "Route not found");
            }
        });
    });
});


server.listen(serverPort, () => {
    console.log(`Server running at ${serverBaseUrl}:${serverPort} on ${serverMode} Mode`);
});
