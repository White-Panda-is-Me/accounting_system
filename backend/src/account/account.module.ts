import { Module } from "@nestjs/common";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Account, AccountSchema } from "src/schemas/accounts/account.schema";
import { User, UserSchema } from "src/schemas/users/users.schema";
import { ProductModule } from "./product/product.module";
import { PeopleModule } from "./people/people.module";

@Module({
  providers: [AccountService],
  controllers: [AccountController],
  imports: [MongooseModule.forFeature([{name: Account.name, schema: AccountSchema},
                                       {name: User.name, schema: UserSchema}]), ProductModule, PeopleModule]
})
export class AccountModule {}