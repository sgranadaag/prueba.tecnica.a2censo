import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class UserValidator {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
