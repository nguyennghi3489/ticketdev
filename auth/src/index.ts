import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    console.log("Missing JWT_KEY enviroment!");
  }
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
