import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "@microlyon/common";
import { User } from "../models/user";
import { Password } from "../services/password";
import { BadRequestError } from "@microlyon/common";
import jwt from "jsonwebtoken";
import { requestValidationHandler } from "@microlyon/common";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Please input email"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  requestValidationHandler,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError("Email or Password is not corrected");
    }
    const isCorrectPassword = await Password.comparePassword(
      user.password as string,
      password
    );
    if (!isCorrectPassword) {
      throw new BadRequestError("Email or Password is not corrected");
    }
    const jwtoken = jwt.sign({ user }, process.env.JWT_KEY!);
    req.session = { jwt: jwtoken };
    res.status(200).send(user);
  }
);

export { router as signinRouter };
