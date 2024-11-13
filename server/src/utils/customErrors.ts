export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string = "Resource not found") {
    super(404, message);
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string = "Bad request") {
    super(400, message);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string = "Forbidden") {
    super(403, message);
  }
}

export class ValidationError extends BadRequestError {
  constructor(public errors: string[]) {
    super("Validation failed");
    this.errors = errors;
  }
}
