import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    _id: string;

    @Prop()
    email: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    hash: string;

    @Prop()
    CreatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);