import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

const register = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const result = await AuthServices.registerUser(userData);
  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: httpStatus.CREATED,
    data: { _id: result._id, name: result.name, email: result.email },
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const loginData = req.body;
  const result = await AuthServices.loginUser(loginData);

  sendResponse(res, {
    success: true,
    message: 'Login Successful',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await AuthServices.getAllUsers();
  sendResponse(res, {
    success: true,
    message: 'Users retrieved successfully',
    statusCode: httpStatus.OK,
    data: users,
  });
});

const getUserByEmail = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  const user = await AuthServices.getUserByEmail(email);
  sendResponse(res, {
    success: true,
    message: 'User retrieved successfully',
    statusCode: httpStatus.OK,
    data: user,
  });
});

const updateUserName = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  const { name: newName } = req.body;
  const updatedName = { name: newName };
  const updatedUser = await AuthServices.updateUserName(email, updatedName);
  sendResponse(res, {
    success: true,
    message: 'User name updated successfully',
    statusCode: httpStatus.OK,
    data: updatedUser,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { email, oldPassword, newPassword } = req.body;
  if (!email || !oldPassword || !newPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, 'All fields are required.');
  }
  const result = await AuthServices.changeUserPassword(
    email,
    oldPassword,
    newPassword,
  );
  sendResponse(res, {
    success: true,
    message: 'Password changed successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const updateUserBlockStatus = catchAsync(
  async (req: Request, res: Response) => {
    const { userId, isBlocked } = req.body;
    const updatedUser = await AuthServices.updateUserBlockStatus(
      userId,
      isBlocked,
    );
    sendResponse(res, {
      success: true,
      message: `User has been ${isBlocked ? 'blocked' : 'unblocked'} successfully`,
      statusCode: httpStatus.OK,
      data: updatedUser,
    });
  },
);

const updateUserRole = catchAsync(async (req: Request, res: Response) => {
  const { userId, role } = req.body;
  const updatedUser = await AuthServices.updateUserRole(userId, role);
  sendResponse(res, {
    success: true,
    message: 'User role updated successfully',
    statusCode: httpStatus.OK,
    data: updatedUser,
  });
});

export const AuthControllers = {
  register,
  login,
  getAllUsers,
  getUserByEmail,
  updateUserName,
  changePassword,
  updateUserRole,
  updateUserBlockStatus,
};
