import { z } from 'zod';

export const createOrderValidationSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email({ message: 'Invalid email address' })
      .nonempty({ message: 'Email is required' }),
    product: z
      .string()
      .nonempty({ message: 'Product ID is required' })
      .regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid Product ID format' }),
    quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
    totalPrice: z
      .number()
      .positive({ message: 'Total price must be greater than zero' }),
  }),
});

export const OrderValidationSchema = {
  createOrderValidationSchema,
};
