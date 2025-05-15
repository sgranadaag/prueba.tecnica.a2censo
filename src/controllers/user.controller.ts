import { Request } from "express";
import {
  Body,
  Get,
  JsonController,
  Post,
  Req,
  UseBefore,
} from "routing-controllers";
import { JwtMiddleware } from "~/middlewares/jwt.middleware";
import { UserService } from "~/services/user.service";
import { LoginValidator } from "~/validators/users/login.validator";
import { UserValidator } from "~/validators/users/user.validator";

@JsonController("/users")
export default class LogsController {
  private userService: UserService = new UserService();

  @Get("/")
  @UseBefore(JwtMiddleware)
  async getProfile(@Req() request: Request & { user: { id: number } }) {
    return this.userService.getUser(request.user.id);
  }

  @Post("/login")
  async loginUser(@Body() credentials: LoginValidator) {
    const token = await this.userService.authenticateUser(credentials);
    return { accessToken: token };
  }

  @Post("/signup")
  async signupUser(@Body() user: UserValidator) {
    return this.userService.createUser(user);
  }
}
