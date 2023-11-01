import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { NonAuthorizedError } from "../errors/not-authorized-error";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    throw new NonAuthorizedError();
  }
  try {
    jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    next();
  } catch (e) {
    throw new NonAuthorizedError();
  }
};
