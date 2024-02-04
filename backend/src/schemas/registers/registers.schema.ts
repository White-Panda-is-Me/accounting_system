import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type ReigstersDocument = Registers & Document;

@Schema()
export class Registers {
    @Prop()
    _id: string;

    @Prop()
    email: string;

    @Prop()
    hash: string;

    @Prop()
    date: Date;

    @Prop()
    expiration: Date;

    @Prop()
    verification_code: string;

    @Prop()
    verified: boolean;
}

export const RegistersSchema = SchemaFactory.createForClass(Registers);