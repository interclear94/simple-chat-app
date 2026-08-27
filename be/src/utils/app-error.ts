export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
  ) {
    super(message);

    this.name = "AppError";
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    /**
     * TypeScript에서 Error
     * prototype을 명시하면 instanceof 검사가 안정적으로 동작
     */
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
