import config from "../config/config";
import app from "./express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Config file
dotenv.config();

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

app.listen(config.port, (err) => {
  if (err) {
    console.log("error ==> ", err);
  }
  console.info("Server started on port. %s.", config.port);
});
