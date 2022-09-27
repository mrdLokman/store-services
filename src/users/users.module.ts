import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [],
  providers: [UsersService],
  controllers: [UserController],
  exports: [UsersService],
})
export class UsersModule {}
