import { Injectable } from '@nestjs/common';
import { UserDto, ExposedUserResponseDto, RegisterUserDto, CreateUserDto, UserResponseDto } from 'src/users/dtos/users.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserSource } from 'src/users/users.schema';
import { UserRole } from './Authorization/role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService){}


    async validateUser(username: string, password: string): Promise<any>{
        const user: UserDto = await this.usersService.findUserByName(username);
        const isMatch = await bcrypt.compare(password, user.password);
        if (user && isMatch) {
            return ExposedUserResponseDto.from(user);
        }
        return null;
    }

    async login(user: ExposedUserResponseDto){
        const payload = { sub: user.id, username: user.username, role: user.role };
        return {
            accessToken: this.jwtService.sign(payload),
            user: user
        }
    }

    async register(user: RegisterUserDto){
        const fetchedUser= await this.usersService.findUserByName(user.username);
        if (fetchedUser) {
            return {status: 'ERROR', msg: "User Exists"};
        }
        if (user.password !== user.confirmPassword) {
            return {status: 'ERROR', msg: "Password Don't match"};
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(user.password, salt);

        const newUser: CreateUserDto= {
            username: user.username,
            lastName: user.lastName,
            firstName: user.firstName,
            source: UserSource.EMAIL,
            password: hashedPassword,
            email: user.email,
            role: UserRole.USER,
        }

        try{
            const createdUser: UserResponseDto = await this.usersService.createUser(newUser);
            const payload = { sub: createdUser.id, username: createdUser.username };
            return {
                accessToken: this.jwtService.sign(payload),
                user: {id: createdUser.id, username: createdUser.username, email: createdUser.email, phone: createdUser.phone}
            }
        }catch(error){
            console.log(error);
            return {status: 'Error', msg:'Unable to Create User'}
        }
    }
}
