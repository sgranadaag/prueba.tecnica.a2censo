import { HttpError } from "routing-controllers";

export class BadRequest extends HttpError {
  constructor(message: string) {
    super(401, message);
  }
}
