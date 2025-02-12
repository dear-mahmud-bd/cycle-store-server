import config from '../../config';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import jwt from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';

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

const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email }, { password: 0 });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found.');
  }
  return user;
};

const updateUserName = async (
  email: string,
  updates: Partial<TUser>,
): Promise<TUser | null> => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = await User.findOneAndUpdate(
    { email },
    { $set: updates },
    { new: true, runValidators: true },
  ).select('-password');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return result;
};

const changeUserPassword = async (
  email: string,
  oldPassword: string,
  newPassword: string,
) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found.');
  }
  const isMatched = await User.isPasswordMatched(oldPassword, user.password);
  if (!isMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Old password is incorrect.');
  }

  const saltRounds = Number(config.bcrypt_salt_rounds);
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  const updatedUser = await User.findOneAndUpdate(
    { email },
    {
      $set: {
        password: hashedPassword,
        passwordChangedAt: new Date(),
      },
    },
    { new: true, runValidators: true },
  );

  if (!updatedUser) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Password update failed.',
    );
  }

  return { message: 'Password changed successfully.' };
};

export const AuthServices = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserByEmail,
  updateUserName,
  changeUserPassword,
};
