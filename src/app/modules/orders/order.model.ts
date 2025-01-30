import { Schema, model } from 'mongoose';
import { OrderStatusType, TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
    },
    product: {
      type: String,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be atleast 1'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Quantity is required'],
    },
    status: {
      type: String,
      enum: Object.values(OrderStatusType),
      default: OrderStatusType.pending,
    },
  },
  {
    timestamps: true,
  },
);

export const OrderModel = model<TOrder>('Order', orderSchema);
