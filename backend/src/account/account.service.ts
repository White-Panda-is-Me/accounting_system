import { Body, HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Account, AccountDocument } from "src/schemas/accounts/account.schema";
import { UserDocument, User } from "src/schemas/users/users.schema";
import { AccountDto, AddUserDto } from "./dto/account.dto";
import { v4 as uuid } from "uuid";
import * as moment from "moment";

@Injectable()
export class AccountService {
  constructor (@InjectModel(Account.name) private accounts: Model<AccountDocument>,
               @InjectModel(User.name) private users: Model<UserDocument>) {}

  async CreateAccount (dto: AccountDto, user: User) {
    let account = await this.accounts.find({admin_id: user._id});
    for (let i = 0;i < account.length;i++) {
      if (account[i].name == dto.name) {
        throw new HttpException("Account exists!", 401);
      }
    }
    const newAccount = await this.accounts.create({_id: uuid(), admin_id: user._id, CreatedAt: moment().toDate(), name: dto.name, products: [], users: []});
    return {id: newAccount._id};
  }
  
  async AddUser (@Body() dto: AddUserDto, user: User) {
    const account = await this.accounts.findOne({_id: dto.AccountId});
    const NewUser = await this.users.findOne({email: dto.email});
    if (account.admin_id == user._id) {
      await this.accounts.updateOne({_id: account._id}, {$addToSet: {usersIds: NewUser._id}});
    } else {
      throw new HttpException("Account doesn't exist!", 402);
    }
  }
}