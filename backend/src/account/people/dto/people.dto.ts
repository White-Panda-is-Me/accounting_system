import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class AddPeopleCategDto {
  @IsNotEmpty()
  @IsString()
  accountId: string;
  
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsNumber()
  code: number;
}

export class AddPeopleDto {
  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @IsNotEmpty()
  @IsString()
  accountId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  code: string;

  @IsNotEmpty()
  @IsNumber()
  balance: number;
}