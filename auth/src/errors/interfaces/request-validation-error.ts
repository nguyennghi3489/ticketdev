import { ValidationError } from "express-validator";
import { AbstractCustomError } from "./custom-error";

export class RequestValidationError extends AbstractCustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super("Request Data Errors");
  }

  serializeErrors() {
    return this.errors.map((error: ValidationError) => ({
      message: error.msg,
      field: error.type === "field" ? error.path : undefined,
    }));
  }
}
