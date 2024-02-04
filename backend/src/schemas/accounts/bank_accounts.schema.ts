import { Document } from "mongoose";
import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
export type BankAccountDocument = BankAccount & Document;

@Schema()
export class BankAccount {
	@Prop()
	name: string;

	@Prop()
	code: number;

	@Prop()
	balance: number;
}

export const BankAccountSchema = SchemaFactory.createForClass(BankAccount);
