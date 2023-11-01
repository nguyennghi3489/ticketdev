import { AbstractCustomError } from "./interfaces/custom-error";

export class BadRequestError extends AbstractCustomError {
  statusCode = 400;
  constructor(public error: string) {
    super(error);
  }

  serializeErrors() {
    return [
      {
        message: this.error,
      },
    ];
  }
}
