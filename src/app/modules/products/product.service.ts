/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (productData: TProduct) => {
  if (await Product.isNameExists(productData.name)) {
    throw new Error('Product already exists!');
  }
  const result = await Product.create(productData);
  return result;
};

const getAllProductsFromDB = async (search: Record<string, any>) => {
  const query: Record<string, any> = {};
  for (const key in search) {
    if (search[key]) {
      query[key] = { $regex: search[key], $options: 'i' };
    }
  }
  const result = await Product.find(query);
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  // const result = await Product.findOne({ _id: new Types.ObjectId(id) });
  const result = await Product.aggregate([
    { $match: { _id: new Types.ObjectId(id) } },
  ]);

  if (result.length <= 0) {
    throw new Error('Product not found');
  }
  return result;
};

const updateSingleProductDataFromDB = async (
  id: string,
  updates: Partial<TProduct>,
): Promise<TProduct | null> => {
  if (updates.quantity !== undefined && updates.quantity > 0) {
    updates.inStock = true;
  } else if (updates.quantity !== undefined && updates.quantity <= 0) {
    updates.inStock = false;
  }

  const result = await Product.findByIdAndUpdate(
    new Types.ObjectId(id),
    { $set: updates },
    { new: true, runValidators: true }, // for validation
  );
  if (!result) {
    throw new Error('Product not found');
  }
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Product.updateOne(
    { _id: new Types.ObjectId(id) },
    { $set: { isDeleted: true } },
  );

  if (result.modifiedCount === 0) {
    throw new Error('Product not found');
  }

  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductDataFromDB,
  deleteProductFromDB,
};
