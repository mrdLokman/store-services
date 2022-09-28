import { PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { UserSource } from "../users.schema";


export class CreateUserDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    firstName: string;

    @IsOptional()
    photo?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsOptional()
    emailVerified?: boolean;

    @IsOptional()
    phone?: string;

    @IsOptional()
    phoneVerified?: boolean;

    @IsNotEmpty()
    source: UserSource;
}

export class UserDto {
    _id?: string;
    username: string;
    lastName: string;
    firstName: string;
    photo?: string;
    email?: string;
    emailVerified?: boolean;
    phone?: string;
    phoneVerified?: boolean;
    source: UserSource;
    isActive?: string;
    isArchived?: string;
}

export class UserResponseDto implements Readonly<UserResponseDto>{
    id?: string;
    username: string;
    lastName: string;
    firstName: string;
    photo?: string;
    email?: string;
    emailVerified?: boolean;
    phone?: string;
    phoneVerified?: boolean;
    source: UserSource;
    isActive?: string;
    isArchived?: string;

    public static from(data: UserDto): UserResponseDto{
        return {
            id: data._id,
            username: data.username,
            lastName: data.lastName,
            firstName: data.firstName,
            photo: data.photo,
            email: data.email,
            emailVerified: data.emailVerified,
            phone: data.phone,
            phoneVerified: data.phoneVerified,
            source: data.source,
            isActive: data.isActive,
            isArchived: data.isArchived
        }
    }
}

export class UpdateUserDto extends PartialType(CreateUserDto){}