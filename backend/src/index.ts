import mongoose from "mongoose";
import express from "express";
import bodyparser from "body-parser";
import authRoute from "./routes/authRoute";
import adminRoute from "./routes/adminRoute";
import cors from "cors";

mongoose.connect('mongodb://localhost:27017', {dbName: 'organization'})
    .then(() => console.log("Connect to Database"))
    .catch((err) => console.log(err))

const app = express();
app.use(bodyparser.urlencoded());
app.use(bodyparser.json());
app.use(cors());

app.listen(8080, () => console.log("Server run on 8080"));

app.use('/api', authRoute);
app.use('/api', adminRoute);