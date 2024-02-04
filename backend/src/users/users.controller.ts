import { Controller, Get, HttpCode, HttpException, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JWTAuthGuard } from "src/auth/guard/auth.guard";
import { AuthUser } from "./users.decorator";
import { User } from "src/schemas/users/users.schema";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('me')
    @UseGuards(JWTAuthGuard)
    @HttpCode(200)
    Create(@AuthUser() user: User) {
        if (!user) {
            throw new HttpException("User not found!", 401);
        }
        return user;
    }
}