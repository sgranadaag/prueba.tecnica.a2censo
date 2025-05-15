import { NextFunction, Request, Response } from "express";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import jwt from "jsonwebtoken";
import { API_TOKEN } from "~/constants/environment.constan";

@Middleware({ type: "before" })
export class JwtMiddleware implements ExpressMiddlewareInterface {
  async use(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return response.status(401).json({ message: "Missing auth header" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const payload = jwt.verify(token, API_TOKEN);
      (request as any).user = (payload as any).user;
      next();
    } catch (err) {
      return response.status(401).json({ message: "Expired token" });
    }
  }
}
