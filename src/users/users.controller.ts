import { Body, Controller, Post, Put } from '@nestjs/common';
import { IdGenerator } from 'libs/utils/src/id.generator';
import { CreateUserDto, UserResponseDto } from './dtos/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Put()
  public async createUser(
    @Body() user: CreateUserDto,
  ): Promise<UserResponseDto> {
    return await this.userService.createUser(user);
  }
}
