import dotenv from "dotenv";

dotenv.config();

export const DBHOST = process.env.MONGOHOST;
export const DBPORT = process.env.MONGOPORT;
export const DB = process.env.DBNAME;
export const PORT = process.env.PORT || 3000;
