import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Account, AccountDocument } from "src/schemas/accounts/account.schema";
import { Person, PersonCategory, PersonCategoryDocument, PersonDocument } from "src/schemas/accounts/person.schema";
import { User } from "src/schemas/users/users.schema";
import { v4 as uuid } from "uuid";
import { AddPeopleCategDto, AddPeopleDto } from "./dto/people.dto";

@Injectable()
export class PeopleService {
  constructor (@InjectModel(Person.name) private people: Model<PersonDocument>,
               @InjectModel(PersonCategory.name) private people_categories: Model<PersonCategoryDocument>,
               @InjectModel(Account.name) private accounts: Model<AccountDocument>) {}

  async AddPeopleCategory (dto: AddPeopleCategDto, user: User) {
    const account = await this.accounts.findOne({_id: dto.accountId});
    const PersonCategory = await this.people_categories.findOne({name: dto.name});
    if (account.admin_id == user._id) {
      if (!PersonCategory) {
        const id = uuid();
        await this.people_categories.create({_id: id, accountId: account._id, code: dto.code, name: dto.name});
        await this.accounts.updateOne({_id: account._id}, {$addToSet: {peopleIds: id}});
        return {id: id};
      } else 
        throw new HttpException("Category exists!", 403);
    } else {
      throw new HttpException("Account doesn't exist!", 402);
    }
  }
  
  async AddPerson(dto: AddPeopleDto, user: User) {
    const account = await this.accounts.findOne({_id: dto.accountId});
    const peopleCateg = await this.people_categories.findOne({_id: dto.categoryId});
    const person = await this.people.findOne({categoryId: peopleCateg._id, name: dto.name});
    if (account.admin_id == user._id && peopleCateg.accountId == account._id) {
      if (!person) {
        const id = uuid();
        await this.people.create({_id: id, categoryId: peopleCateg._id, code: dto.code, name: dto.name, balance: dto.balance});
        await this.people_categories.updateOne({_id: dto.categoryId}, {$addToSet: {peopleIds: id}});
        return {id: id};
      } else
        throw new HttpException("Person Exists!", 403);
    } else {
      throw new HttpException("Account doesn't exist!", 402);
    }
  }
}