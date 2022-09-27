import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('Users.UserService');

  constructor() {}
}
