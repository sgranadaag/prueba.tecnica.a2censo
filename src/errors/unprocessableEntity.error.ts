import { HttpError } from "routing-controllers";

export class UnprocessableEntity extends HttpError {
  constructor(message: string) {
    super(422, message);
  }
}
