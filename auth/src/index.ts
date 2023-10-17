import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./router/current-user";
import { signinRouter } from "./router/signin";
import { signupRouter } from "./router/signup";
import { signoutRouter } from "./router/signout";
import { errorHandler } from "./middleware/error-handler";
import mongoose from "mongoose";

const app = express();
app.use(json());
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb://auth-mongo-srv:27017/auth?directConnection=true"
    );
    console.log("Connected to Mongo Database");
  } catch (error) {
    console.error(error);
  }
  app.listen(3000, () => {
    console.log("App is running in port 3000 !");
  });
};

start();
