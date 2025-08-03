import dotenv from "dotenv";
dotenv.config();

export const env = {
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  DB_NAME: process.env.DB_NAME || "movie_review_db",
  DB_USER: process.env.DB_USER || "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD || "Muga#556",
};
