import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class AccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class AddUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  AccountId: string;
}
