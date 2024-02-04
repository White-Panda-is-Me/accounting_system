import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { jwtConstants } from "./jwt.secret";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/users/users.schema";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: {id: string}) {
        let user = await this.UserModel.findOne({_id: payload.id});
        user = user.toObject();
        delete user.hash;
        delete user.__v;
        return user;
    }
}