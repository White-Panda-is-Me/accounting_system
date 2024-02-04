import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { User, UserSchema } from "src/schemas/users/users.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { Registers, RegistersSchema } from "src/schemas/registers/registers.schema";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { jwtConstants } from "./strategy/jwt.secret";
import { JWTStrategy } from "./strategy/auth.strategy";

@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema},
                                         {name: Registers.name, schema: RegistersSchema}]),
              PassportModule, JwtModule.register({secret: jwtConstants.secret, signOptions: {expiresIn: "1d"}})],
    providers: [AuthService, JwtService, JWTStrategy],
    controllers: [AuthController]
})
export class AuthModule {}
