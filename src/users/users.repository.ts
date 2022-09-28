import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto, UpdateUserDto } from "./dtos/users.dto";
import { User, UserDocument } from "./users.schema";


@Injectable()
export class UsersRepository{
    constructor(
        @InjectModel(User.name)
        private readonly model: Model<UserDocument>,
    ){}

    public async createUser(user: CreateUserDto): Promise<UserDocument>{
        const data = new this.model(user);
        return await data.save();
    }

    public async getUserById(id: string): Promise<UserDocument>{
        return await this.model.findById(id).exec();
    }

    public async activateUser(id: string): Promise<UserDocument>{
        return await this.model.findByIdAndUpdate(id, {active: true}, {new: true}).exec();
    }

    public async desActivateUser(id: string): Promise<UserDocument>{
        return await this.model.findByIdAndUpdate(id, {active: false}, {new: true}).exec();
    }

    public async archiveUser(id: string): Promise<UserDocument>{
        return await this.model.findByIdAndUpdate(id, {isArchived: true}, {new: true}).exec();
    }

    public async updateUser(id: string, payload: UpdateUserDto): Promise<UserDocument>{
        return await this.model.findByIdAndUpdate(id, payload, {new: true}).exec();
    }
}