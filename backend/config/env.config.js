import dotenv from "dotenv";
dotenv.config({ path: ".env" });

// server port and mode
const server = {
  serverPort: process.env.SERVER_PORT,
  serverMode: process.env.SERVER_MODE,
  serverBaseUrl: process.env.SERVER_BASE_URL,
};

export const { serverMode, serverPort,serverBaseUrl } = server;

