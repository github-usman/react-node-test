import dotenv from "dotenv";
dotenv.config({ path: ".env" });

// server port and mode
const server = {
  serverPort: process.env.SERVER_PORT,
  serverMode: process.env.SERVER_MODE,
  serverBaseUrl: process.env.SERVER_BASE_URL,
};

// database connectivity
const database = {
  dbUri: process.env.DB_URI,
  dbName: process.env.DB_NAME,
};

// JWT
const jwtInformation = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE
};


export const { serverMode, serverPort,serverBaseUrl } = server;
export const { dbUri, dbName } = database;
export const { jwtSecret, jwtExpire } = jwtInformation;
