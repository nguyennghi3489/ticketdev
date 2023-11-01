import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { currentUserRouter } from "./router/current-user";
import { signinRouter } from "./router/signin";
import { signupRouter } from "./router/signup";
import { signoutRouter } from "./router/signout";
import { errorHandler } from "@microlyon/common";
import cookieSession from "cookie-session";

const app = express();
app.set("trust proxy", true);

app.use(
  cookieSession({
    keys: ["session"],
    name: "session",
    maxAge: 3 * 60 * 1000,
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(json());
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use(errorHandler);

export { app };
