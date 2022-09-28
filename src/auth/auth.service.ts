import { Injectable } from '@nestjs/common';
import { UserDto, ExposedUserResponseDto } from 'src/users/dtos/users.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService){}


    async validateUser(username: string, password: string): Promise<any>{
        const user: UserDto = await this.usersService.findUserByName(username);
        if (user && user.password === password) {
            return ExposedUserResponseDto.from(user);
        }
        return null;
    }
}
