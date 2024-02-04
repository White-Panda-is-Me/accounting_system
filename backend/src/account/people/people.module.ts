import { Module } from "@nestjs/common";
import { PeopleService } from "./people.service";
import { PeopleController } from "./people.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Account, AccountSchema } from "src/schemas/accounts/account.schema";
import { Person, PersonCategory, PersonCategorySchema, PersonSchema } from "src/schemas/accounts/person.schema";

@Module({
  providers: [PeopleService],
  controllers: [PeopleController],
  imports: [MongooseModule.forFeature([{name: Account.name, schema: AccountSchema},
                                       {name: Person.name, schema: PersonSchema},
                                       {name: PersonCategory.name, schema: PersonCategorySchema}])]
})
export class PeopleModule {}