import config from '../../config';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import jwt from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const registerUser = async (payload: TUser) => {
  if (await User.isEmailExist(payload.email)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'There is already a user registered with this email.',
    );
  }
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TUser) => {
  const user = await User.isEmailExist(payload.email);
  if (!user) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Enter your email and password correctly.',
    );
  }
  if (user.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are blocked!');
  }

  const isMatched = await User.isPasswordMatched(
    payload.password,
    user.password,
  );
  if (!isMatched) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Enter your email and password correctly.', // 'Invalid Credentials',
    );
  }

  const JwtPayload = {
    email: payload.email,
    role: user.role,
  };
  const token = jwt.sign(JwtPayload, config.jwt_access_token as string, {
    expiresIn: config.jwt_access_token_expires,
  });

  return { token };
};

const getAllUsers = async () => {
  const users = await User.find({}, { password: 0 });
  return users;
};

export const AuthServices = {
  registerUser,
  loginUser,
  getAllUsers,
};
