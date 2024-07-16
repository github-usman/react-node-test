import { serverBaseUrl, serverMode, serverPort } from "./config/env.config.js";
import http from "http";

// main server
const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World!');
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
    }
});

server.listen(serverPort, () => {
    console.log(`Server running at ${serverBaseUrl}:${serverPort} on ${serverMode} Mode`);
});
