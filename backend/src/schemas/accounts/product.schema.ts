import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ProductDocument = Product & Document;
export type ProductCategoryDocument = ProductCategory & Document;

@Schema()
export class ProductCategory {
  @Prop()
  accountId: string;
  
  @Prop()
  _id: string;
  
  @Prop()
  code: number;
  
  @Prop()
  name: string;
  
  @Prop()
  productsIds: string[];
}

@Schema()
export class Product {
  @Prop()
  categoryId: string;

  @Prop()
  _id: string;

  @Prop()
  code: number;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  amount: number;
}

export const ProductCategorySchema = SchemaFactory.createForClass(ProductCategory);
export const ProductSchema = SchemaFactory.createForClass(Product);