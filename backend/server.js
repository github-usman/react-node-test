import http from "http";
import bodyParser from "body-parser";
import { serverBaseUrl, serverMode, serverPort } from "./config/env.config.js";
import userRouter from "./routes/user.route.js";
import connectMongoDB from "./connect-DB/db.js";


// Data base connection #MOGNOD
connectMongoDB();

const jsonParser = bodyParser.json();
// main server
const server = http.createServer((req, res) => {
    jsonParser(req, res, async () => {
        if (req.method === 'GET' && req.url === '/') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Hello World!');
        } else if (req.url.startsWith('/api/v1')) {
            userRouter(req, res);
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Not Found');
        }
    })
});



server.listen(serverPort, () => {
    console.log(`Server running at ${serverBaseUrl}:${serverPort} on ${serverMode} Mode`);
});
