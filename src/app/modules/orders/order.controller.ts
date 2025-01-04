/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import createOrderValidationSchema from './order.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const zodParsedData = createOrderValidationSchema.parse(orderData);

    const result = await OrderServices.createOrderIntoDB(zodParsedData);

    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: err.message || 'Failed to create order',
    });
  }
};

const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const revenue = await OrderServices.calculateRevenueFromDB();

    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: { totalRevenue: revenue },
    });
  } catch (err: any) {
    res.status(500).json({
      message: 'Failed to calculate revenue',
      status: false,
      err: err.message,
    });
  }
};

export const OrderController = {
  createOrder,
  calculateRevenue,
};
