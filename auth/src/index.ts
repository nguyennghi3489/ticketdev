import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./router/current-user";
import { signinRouter } from "./router/signin";
import { signupRouter } from "./router/signup";
import { signoutRouter } from "./router/signout";
import { errorHandler } from "./middleware/error-handler";

const app = express();
app.use(json());
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("App is running in port 3000 !");
});
