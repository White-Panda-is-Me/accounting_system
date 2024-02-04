import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { JWTAuthGuard } from "src/auth/guard/auth.guard";
import { AddProductDto, AddProductCategDto } from "./dto/product.dto";
import { User } from "src/schemas/users/users.schema";
import { AuthUser } from "src/users/users.decorator";

@Controller("account/product")
export class ProductController {
  constructor (private productService: ProductService) {}

  @Post("addproductcateg")
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  AddProductCategory (@Body() dto: AddProductCategDto, @AuthUser() user: User) {
    return this.productService.AddProductCategory(dto, user);
  }

  @Post("addproduct")
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  AddProduct (@Body() dto: AddProductDto, @AuthUser() user: User) {
    return this.productService.AddProduct(dto, user);
  }
}