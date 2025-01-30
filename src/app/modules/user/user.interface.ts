import { Model, Types } from 'mongoose';
import { USER_ROLE } from './user.constant';

export enum UserType {
  admin = 'admin',
  customer = 'customer',
}

export interface TUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserType;
  isBlocked: boolean;
  passwordChangedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserModel extends Model<TUser> {
  isEmailExist(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
