import { TOrder } from './order.interface';
import { Product } from '../products/product.model';
import { OrderModel } from './order.model';
import { Types } from 'mongoose';

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
  calculateRevenueFromDB,
};
