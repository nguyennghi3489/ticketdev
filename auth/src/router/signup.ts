import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { BadRequestError } from "@microlyon/common";
import { DatabaseError } from "@microlyon/common";
import jwt from "jsonwebtoken";
import { requestValidationHandler } from "@microlyon/common";

const router = express.Router();

router.post(
  "/api/users/signup",
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
      throw new BadRequestError("Email in use");
    }

    try {
      const user = User.build({ email, password });
      await user.save();
      const jwtoken = jwt.sign({ user }, process.env.JWT_KEY!);
      req.session = { jwt: jwtoken };
      res.status(201).send(user);
    } catch (error) {
      throw new DatabaseError();
    }
  }
);

export { router as signupRouter };
