import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../users/users.schema";
import { ProductCategory } from "./product.schema";

export type AccountDocument = Account & Document;

@Schema()
export class Account {
    @Prop()
    _id: string;

    @Prop()
    name: string;

    @Prop()
    admin_id: string;

    @Prop()
    peopleIds: string[];

    @Prop()
    CreatedAt: Date;

    @Prop()
    productsIds: string[];
}

export const AccountSchema = SchemaFactory.createForClass(Account);