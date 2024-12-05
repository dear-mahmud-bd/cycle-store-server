import { Types } from 'mongoose';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.aggregate([
    { $match: { _id: new Types.ObjectId(id) } },
  ]);
  return result;
};

const updateSingleProductDataFromDB = async (
  id: string,
  updates: Partial<TProduct>,
): Promise<TProduct | null> => {
  const result = await Product.findByIdAndUpdate(
    new Types.ObjectId(id),
    { $set: updates },
    { new: true, runValidators: true }, // for validation
  );
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Product.updateOne(
    { _id: new Types.ObjectId(id) },
    { $set: { isDeleted: true } },
  );
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductDataFromDB,
  deleteProductFromDB,
};
