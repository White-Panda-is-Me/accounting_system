import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { PeopleService } from "./people.service";
import { JWTAuthGuard } from "src/auth/guard/auth.guard";
import { User } from "src/schemas/users/users.schema";
import { AuthUser } from "src/users/users.decorator";
import { AddProductCategDto, AddProductDto } from "../product/dto/product.dto";
import { AddPeopleCategDto, AddPeopleDto } from "./dto/people.dto";

@Controller("account/people")
export class PeopleController {
  constructor (private peopleService: PeopleService) {}

  @Post("addpeoplecateg")
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  AddPeopleCategory (@Body() dto: AddPeopleCategDto, @AuthUser() user: User) {
    return this.peopleService.AddPeopleCategory(dto, user);
  }

  @Post("addperson")
  @HttpCode(200)
  @UseGuards(JWTAuthGuard)
  AddPerson (@Body() dto: AddPeopleDto, @AuthUser() user: User) {
    return this.peopleService.AddPerson(dto, user);
  }
}