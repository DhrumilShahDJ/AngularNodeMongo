import mongoose from "mongoose";
import express from "express";
import bodyparser from "body-parser";
import authRoute from "./routes/authRoute";
import adminRoute from "./routes/adminRoute";
import roleRoute from "./routes/roleRoute";
import cors from "cors";
import { DB, DBHOST, DBPORT, PORT } from "./config/env-vars";

mongoose
  .connect(`mongodb://${DBHOST}:${DBPORT}`, { dbName: DB })
  .then(() => console.log("Connect to Database"))
  .catch((err) => console.log(err));

const app = express();
app.use(bodyparser.urlencoded());
app.use(bodyparser.json());
app.use(cors());

app.listen(PORT, () => console.log(`Server run on ${PORT}`));

app.use("/api", authRoute);
app.use("/api", adminRoute);
app.use("/api", roleRoute);
