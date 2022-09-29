import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './users.controller';
import { UsersRepository } from './users.repository';
import { User, UserSchema, USERS_COLLECTION_NAME } from './users.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        collection: USERS_COLLECTION_NAME,
        schema: UserSchema
      }
    ])
  ],
  providers: [UsersService, UsersRepository],
  controllers: [UserController],
  exports: [UsersService],
})
export class UsersModule {}
