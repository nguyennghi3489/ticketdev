interface IErrorContent {
  message: string;
  field?: string;
}

export abstract class AbstractCustomError extends Error {
  abstract statusCode: number;
  constructor(message: string) {
    super(message);
  }

  abstract serializeErrors(): IErrorContent[];
}
