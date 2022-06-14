import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthenticationRoute from "./routes/AuthenticationRoute.js";

//Initialise express server
const app = express();

// Setting up and using middlewares
app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
dotenv.config();

//Connect Db
mongoose
  .connect(process.env.MONGO_DB)
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error));

//Set up routes
app.use("/auth", AuthenticationRoute);
