import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Account, AccountDocument } from "src/schemas/accounts/account.schema";
import { User } from "src/schemas/users/users.schema";
import { AddProductCategDto, AddProductDto } from "./dto/product.dto";
import { v4 as uuid } from "uuid";
import { Product, ProductCategory, ProductCategoryDocument, ProductDocument } from "src/schemas/accounts/product.schema";

@Injectable()
export class ProductService {
  constructor (@InjectModel(Account.name) private accounts: Model<AccountDocument>,
               @InjectModel(ProductCategory.name) private product_categories: Model<ProductCategoryDocument>,
               @InjectModel(Product.name) private products: Model<ProductDocument>) {}

  async AddProductCategory (dto: AddProductCategDto, user: User) {
    const account = await this.accounts.findOne({_id: dto.accountId});
    if (account.admin_id == user._id) {
      const id = uuid();
      await this.product_categories.create({_id: id, accountId: account._id, code: dto.code, name: dto.name});
      await this.accounts.updateOne({_id: account._id}, {$addToSet: {productsIds: id}});
      return {id: id};
    } else {
      throw new HttpException("Account doesn't exist!", 402);
    }
  }
  
  async AddProduct (dto: AddProductDto, user: User) {
    const account = await this.accounts.findOne({_id: dto.accountId});
    const productCateg = await this.product_categories.findOne({_id: dto.categoryId});
    const product = await this.products.findOne({categoryId: productCateg._id, name: dto.name});
    if (account.admin_id == user._id && productCateg.accountId == account._id && !product) {
      const id = uuid();
      await this.products.create({_id: id, categoryId: productCateg._id, code: dto.code, name: dto.name, amount: dto.amount, price: dto.price});
      await this.product_categories.updateOne({_id: dto.categoryId}, {$addToSet: {productsIds: id}});
      return {id: id};
    } else {
      throw new HttpException("Account doesn't exist!", 402);
    }
  }
}