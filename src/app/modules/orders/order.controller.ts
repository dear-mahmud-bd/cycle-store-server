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

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const orders = await OrderServices.getAllOrdersFromDB();
  sendResponse(res, {
    success: true,
    message: 'Orders fetched successfully',
    statusCode: httpStatus.OK,
    data: orders,
  });
});

const getUserOrders = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  const orders = await OrderServices.getUserOrdersFromDB(email);
  sendResponse(res, {
    success: true,
    message: 'Orders fetched successfully',
    statusCode: httpStatus.OK,
    data: orders,
  });
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const updatedOrder = await OrderServices.updateOrderStatusInDB(
    orderId,
    status,
  );
  sendResponse(res, {
    success: true,
    message: 'Order status updated successfully',
    statusCode: httpStatus.OK,
    data: updatedOrder,
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
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  calculateRevenue,
};
