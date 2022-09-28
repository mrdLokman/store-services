import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdGenerator } from 'libs/utils/src/id.generator';
import { Document } from 'mongoose';

export type UserDocument = Document & User;
export const USERS_COLLECTION_NAME = 'Users';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

const roles = ['user', 'admin'];

export enum UserSource {
    EMAIL = 'email',
    FACEBOOK = 'facebook',
    GOOGLE = 'google',
  }

@Schema({ collection: USERS_COLLECTION_NAME, timestamps: true })
export class User {
    @Prop({
      required: false,
      default: () => IdGenerator.generateId('user'),
    })
    _id?: string;

    @Prop({required: true, unique: true, index: true, trim: true})
    username: string;

    @Prop({required: false })
    password?: string;

    @Prop({required: true, trim: true})
    firstName: string;

    @Prop({required: true, trim: true})
    lastName: string;

    @Prop({required: false})
    photo?: string;


    @Prop({required: false, unique: true})
    email?: string;

    @Prop({required: false, default: false})
    emailVerified?: boolean;

    @Prop({required: false, unique: true})
    phone?: string;

    @Prop({required: false, default: false})
    phoneVerified?: boolean;

    @Prop({required: true, type: String, enum: roles})
    source: UserSource;

    @Prop({required:false, default: false})
    isActive?: boolean;

    @Prop({ default: false })
    isArchived?: boolean;
}


export const UserSchema = SchemaFactory.createForClass(User);
