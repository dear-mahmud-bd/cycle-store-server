import { Types } from 'mongoose';
import { TProduct } from './product.interface';
import { Product } from './product.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createProductIntoDB = async (productData: TProduct) => {
  if (await Product.isNameExists(productData.name)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Product already exists!');
  }
  const result = await Product.create(productData);
  return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  // to check is deleted property false or true
  const deletedData = await Product.findOne({ _id: new Types.ObjectId(id) });
  if (deletedData == null) {
    throw new Error('Product not found');
  }

  if (updates.quantity !== undefined && updates.quantity > 0) {
    updates.inStock = true;
  } else if (updates.quantity !== undefined && updates.quantity <= 0) {
    updates.inStock = false;
  }

  const result = await Product.findByIdAndUpdate(
    new Types.ObjectId(id),
    { $set: updates },
    { new: true, runValidators: true }, // for validation
  ).select('-isDeleted');
  if (!result) {
    throw new Error('Product not found');
  }
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const deletedData = await Product.findOne({ _id: new Types.ObjectId(id) });
  if (deletedData == null) {
    throw new Error('Product not found');
  }
  const result = await Product.updateOne(
    { _id: new Types.ObjectId(id) },
    { $set: { isDeleted: true } },
  );

  if (result.modifiedCount === 0) {
    throw new Error('Product not deleted');
  }

  return {};
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductDataFromDB,
  deleteProductFromDB,
};
