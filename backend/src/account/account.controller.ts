import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { AccountService } from "./account.service";
import { JWTAuthGuard } from "src/auth/guard/auth.guard";
import { AccountDto, AddUserDto } from "./dto/account.dto";
import { User } from "src/schemas/users/users.schema";
import { AuthUser } from "src/users/users.decorator";

@Controller("account")
export class AccountController {
  constructor (private accountService: AccountService) {}

  @Post("create")
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  Create (@Body() dto: AccountDto, @AuthUser() user: User) {
    return this.accountService.CreateAccount(dto, user);
  }
  
  @Post("adduser")
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  AddUser (@Body() dto: AddUserDto, @AuthUser() user: User) {
    return this.accountService.AddUser(dto, user);
  }
}