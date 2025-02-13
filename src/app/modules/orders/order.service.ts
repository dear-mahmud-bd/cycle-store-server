import { TOrder } from './order.interface';
import { Product } from '../products/product.model';
import { OrderModel } from './order.model';
import { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createOrderIntoDB = async (orderData: TOrder) => {
  const product = await Product.findById({
    _id: new Types.ObjectId(orderData.product),
  });

  if (!product) {
    throw new Error('Product not found');
  }
  if (product.quantity < orderData.quantity) {
    throw new Error('Insufficient stock');
  }

  const totalProductValue = product.price * orderData.quantity;
  if (orderData.totalPrice < totalProductValue / 2) {
    throw new Error(
      "Total price must be at least half of the product's total value.",
    );
  }

  // Reduce product quantity and update `inStock` status
  product.quantity -= orderData.quantity;
  if (product.quantity === 0) {
    product.inStock = false;
  }
  await product.save();

  // Create the order
  const order = await OrderModel.create(orderData);
  return order;
};

const getAllOrdersFromDB = async () => {
  const orders = await OrderModel.find().populate('product');
  return orders;
};

const getUserOrdersFromDB = async (email: string) => {
  const orders = await OrderModel.find({ email }).populate('product');
  return orders;
};

const updateOrderStatusInDB = async (orderId: string, status: string) => {
  const order = await OrderModel.findByIdAndUpdate(
    orderId,
    { status },
    { new: true },
  );
  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
  }
  return order;
};

const calculateRevenueFromDB = async () => {
  const revenue = await OrderModel.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);
  return revenue.length > 0 ? revenue[0].totalRevenue : 0;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getUserOrdersFromDB,
  updateOrderStatusInDB,
  calculateRevenueFromDB,
};
