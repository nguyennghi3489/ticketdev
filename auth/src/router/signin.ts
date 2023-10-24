import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../models/user";
import { Password } from "../services/password";
import { BadRequestError } from "../errors/bad-request-error";
import jwt from "jsonwebtoken";
import { requestValidationHandler } from "../middleware/request-validation-handler";

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

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const isCorrectPassword = await Password.comparePassword(
        existingUser.password as string,
        password
      );
      if (!isCorrectPassword) {
        throw new BadRequestError("Email or Password is not corrected");
      }
      const jwtoken = jwt.sign({ existingUser }, process.env.JWT_KEY!);
      req.session = { jwt: jwtoken };
      res.status(200).send(existingUser);
    } else {
      throw new BadRequestError("Email or Password is not corrected");
    }
  }
);

export { router as signinRouter };
