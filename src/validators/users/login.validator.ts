import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class LoginValidator {
  @IsNotEmpty()
  @IsEmail()
  @Type(() => String)
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
