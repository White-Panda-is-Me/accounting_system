import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { AccountModule } from './account/account.module';
import { ProductModule } from './account/product/product.module';

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost:27017/accounting"),
            AuthModule, UsersModule, PassportModule, AccountModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
