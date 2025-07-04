import { config } from "dotenv";
config();

export const ENVIRONMENT = {
  DB_URL: process.env.DB_URL,
  DB_NAME: process.env.DB_NAME,
  PORT: process.env.PORT,
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
  GMAIL_USERNAME: process.env.GMAIL_USERNAME,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  DB_MONGO_PASSWORD:process.env.DB_MONGO_PASSWORD,
  CLIENT_URL: process.env.CLIENT_URL
};
