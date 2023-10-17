import { NextFunction, Request, Response } from "express";
import { AbstractCustomError } from "../errors/interfaces/custom-error";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AbstractCustomError) {
    res.status(error.statusCode).send(error.serializeErrors());
  }
  res.status(400).send([{ message: "Something went wrong" }]);
};
