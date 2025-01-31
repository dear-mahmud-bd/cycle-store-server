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

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };

  // Search functionality
  const productSearchableFields = ['name', 'brand', 'type', 'description'];
  let search = '';
  if (query?.search) {
    search = query.search as string;
  }
  const searchQuery = Product.find({
    $or: productSearchableFields.map((field) => ({
      [field]: { $regex: search, $options: 'i' },
    })),
  });

  // Filtering functionality
  const excludeFields = [
    'search',
    'sortBy',
    'sortOrder',
    'minPrice',
    'maxPrice',
    'brand',
    'type',
    'inStock',
  ];
  excludeFields.forEach((el) => delete queryObj[el]);

  // Construct filter object
  const filter: Record<string, unknown> = {};

  // Filtering by price range
  if (query?.minPrice || query?.maxPrice) {
    filter.price = {};
    if (query?.minPrice) {
      (filter.price as Record<string, number>)['$gte'] = Number(query.minPrice);
    }
    if (query?.maxPrice) {
      (filter.price as Record<string, number>)['$lte'] = Number(query.maxPrice);
    }
  }

  // Filtering by brand
  if (query?.brand) {
    filter.brand = query.brand as string;
  }

  // Filtering by type
  if (query?.type) {
    filter.type = query.type as string;
  }

  // Filtering by availability (inStock)
  if (query?.inStock) {
    filter.inStock = query.inStock === 'true'; // Convert string to boolean
  }

  const filterQuery = searchQuery.find(filter);

  // Sorting functionality
  let sortBy = 'price';
  if (query?.sortBy) {
    sortBy = query.sortBy as string;
  }

  // Ascending or descending order
  if (query?.sortOrder) {
    const validSortOrders = ['asc', 'desc'];
    if (!validSortOrders.includes(query.sortOrder as string)) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Invalid sortOrder value. It must be 'asc' or 'desc'.",
      );
    }
    const sortOrder = query.sortOrder === 'desc' ? '-' : '';
    sortBy = `${sortOrder}${sortBy}`;
  }

  // Pagination
  const page = Number(query.page) || 1; // Default page 1
  const limit = Number(query.limit) || 9; // Default limit 9
  const skip = (page - 1) * limit;

  // Get total count of matching documents
  const totalItems = await Product.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / limit);

  const result = await filterQuery.sort(sortBy).skip(skip).limit(limit);

  return {
    products: result,
    pagination: {
      totalItems,
      totalPages,
      currentPage: page,
      perPage: limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
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
