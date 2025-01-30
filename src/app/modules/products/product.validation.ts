import { z } from 'zod';
import { BicycleType } from './product.interface';

export const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required' }).trim(),
    image: z
      .string()
      .url({ message: 'Image must be a valid URL' })
      .regex(/\.(jpeg|jpg|png|gif|bmp|webp)$/i, {
        message: 'Image must have a valid file extension (e.g., .jpg, .png)',
      }),
    brand: z.string().min(1, { message: 'Brand is required' }).trim(),
    price: z
      .number()
      .min(10, { message: 'Price must be at least 10' })
      .refine((val) => val > 0, { message: 'Price must be a positive number' }),
    type: z.enum([
      BicycleType.Mountain,
      BicycleType.Road,
      BicycleType.Hybrid,
      BicycleType.BMX,
      BicycleType.Electric,
    ]),
    description: z
      .string()
      .min(1, { message: 'Description is required' })
      .trim(),
    quantity: z
      .number()
      .min(0, { message: 'Quantity must be a non-negative number' }),
    inStock: z.boolean(),
    isDeleted: z.boolean().optional().default(false),
  }),
});

export const ProductValidationSchema = {
  createProductValidationSchema,
};
