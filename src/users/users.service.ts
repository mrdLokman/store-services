import {
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateUserDto, UserDto, UserResponseDto } from './dtos/users.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('Users.UserService');

  constructor(private readonly repository: UsersRepository) {}

  public async findUserByName(
    name: string,
  ): Promise<UserDto | undefined> {
    const userDocument = await this.repository.getUserByUsername(name);
    if(typeof userDocument !== 'undefined' && userDocument !== null)
    return userDocument;
  }

  public async createUser(user: CreateUserDto): Promise<UserResponseDto>{
    const createdUser: UserDto = await this.repository.createUser(user);
    return UserResponseDto.from(createdUser);
  }
}
