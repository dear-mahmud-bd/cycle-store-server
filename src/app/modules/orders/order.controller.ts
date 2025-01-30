import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const orderData = req.body;
  const result = await OrderServices.createOrderIntoDB(orderData);
  sendResponse(res, {
    success: true,
    message: 'Order created successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const calculateRevenue = catchAsync(async (req: Request, res: Response) => {
  const revenue = await OrderServices.calculateRevenueFromDB();
  sendResponse(res, {
    success: true,
    message: 'Revenue calculated successfully',
    statusCode: httpStatus.OK,
    data: { totalRevenue: revenue },
  });
});

export const OrderController = {
  createOrder,
  calculateRevenue,
};
