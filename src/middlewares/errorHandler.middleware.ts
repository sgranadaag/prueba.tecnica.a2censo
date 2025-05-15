import { Request, Response } from "express";
import {
  ExpressErrorMiddlewareInterface,
  Middleware,
} from "routing-controllers";

@Middleware({ type: "after", priority: 1 })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  error(
    error: any,
    request: Request,
    response: Response,
    next: (err?: any) => any
  ) {
    const { message, name, errors = [], httpCode = 500 } = error;

    response.status(httpCode).json({
      httpCode,
      message,
      errors,
    });
    next();
  }
}
