import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

//Set up routes
const app = express();

app
  .get("/", (req, res) => {
    res.send("Hello word");
  })
  .listen(5000, console.log("Server running on port 5000!"));
