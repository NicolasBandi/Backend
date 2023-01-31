export class CustomError {
  constructor(status, description, details = {}) {
    this.status = status;
    this.description = description;
    this.details = details;
  }
}

export class NotFoundError extends CustomError {
  constructor(description, details = {}) {
    super(404, description, details);
  }
}
