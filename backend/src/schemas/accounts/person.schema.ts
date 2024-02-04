import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PersonDocument = Person & Document;
export type PersonCategoryDocument = PersonCategory & Document;

@Schema()
export class PersonCategory {
  @Prop()
  _id: string;

  @Prop()
  accountId: string;

  @Prop()
  code: number;

  @Prop()
  name: string;

  @Prop()
  peopleIds: string[];
}

@Schema()
export class Person {
  @Prop()
  categoryId: string;

  @Prop()
  _id: string;

  @Prop()
  code: number;

  @Prop()
  name: string;

  @Prop()
  balance: number;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
export const PersonCategorySchema = SchemaFactory.createForClass(PersonCategory);