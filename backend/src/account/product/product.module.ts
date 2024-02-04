import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductCategory, ProductCategorySchema, ProductSchema } from "src/schemas/accounts/product.schema";
import { Account, AccountSchema } from "src/schemas/accounts/account.schema";

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  imports: [MongooseModule.forFeature([{name: Product.name, schema: ProductSchema},
                                       {name: ProductCategory.name, schema: ProductCategorySchema},
                                       {name: Account.name, schema: AccountSchema}])],
})
export class ProductModule {}