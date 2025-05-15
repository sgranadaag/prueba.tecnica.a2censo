import { getCustomRepository } from "typeorm";
import { UserRepository } from "~/repositories/user.repository";
import { UserValidator } from "~/validators/users/user.validator";
import sha256 from "sha256";
import jwt from "jsonwebtoken";
import { LoginValidator } from "~/validators/users/login.validator";
import { UnauthorizedError } from "routing-controllers";
import { UnprocessableEntity } from "~/errors/unprocessableEntity.error";
import { API_TOKEN } from "~/constants/environment.constan";

export class UserService {
  private userRepository: UserRepository = getCustomRepository(UserRepository);
  constructor() {}

  getUser(userId: number) {
    return this.userRepository.findOne(userId);
  }

  async createUser(user: UserValidator) {
    const userExist = await this.userRepository.findOne({
      email: user.email,
    });
    if (userExist)
      throw new UnprocessableEntity("This user is already registered");

    const newUser = this.userRepository.create({
      ...user,
      passwordHash: sha256(user.password),
    });
    return this.userRepository.save(newUser);
  }

  async authenticateUser(credentials: LoginValidator) {
    const user = await this.userRepository.findOne({
      email: credentials.email,
    });
    if (!user) throw new UnauthorizedError("User not exist");
    if (user.passwordHash != sha256(credentials.password))
      throw new UnauthorizedError("Wrong password");
    const token = jwt.sign({ user }, API_TOKEN, {
      expiresIn: "1d",
    });

    return token;
  }
}
