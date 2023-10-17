import { ValidationError } from "express-validator";
import { AbstractCustomError } from "./custom-error";

const DATABASE_ERROR_MESSAGE = "Error connnecting to database";
export class RequestValidationError extends AbstractCustomError {
  statusCode = 500;
  reason = DATABASE_ERROR_MESSAGE;

  constructor() {
    super(DATABASE_ERROR_MESSAGE);
  }

  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
