import { AbstractCustomError } from "./interfaces/custom-error";

const NOT_AUTHORIZED_ERROR_MESSAGE = "Not Authorized";
export class NonAuthorizedError extends AbstractCustomError {
  statusCode = 401;
  reason = NOT_AUTHORIZED_ERROR_MESSAGE;

  constructor() {
    super(NOT_AUTHORIZED_ERROR_MESSAGE);
  }

  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
